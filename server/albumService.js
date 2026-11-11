import fs from 'node:fs/promises';
import path from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v', '.avi']);
const COVER_FILE_NAMES = ['cover', '_cover', 'poster', 'thumb', 'thumbnail'];

export function normalizeAlbumPath(inputPath = '/') {
  const decoded = decodeURIComponent(String(inputPath || '/'));
  const safe = decoded.replace(/\\/g, '/');
  const parts = safe.split('/').filter(Boolean).filter((part) => part !== '.' && part !== '..');
  return `/${parts.join('/')}`.replace(/\/+/g, '/');
}

export function resolveAlbumFsPath(rootDir, inputPath = '/') {
  const normalized = normalizeAlbumPath(inputPath);
  const absolute = path.resolve(rootDir, `.${normalized}`);
  const rootResolved = path.resolve(rootDir);

  if (!absolute.startsWith(rootResolved)) {
    throw new Error('Path is outside album root');
  }

  return { normalized, absolute };
}

function prettifyName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isImage(name) {
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function isVideo(name) {
  return VIDEO_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function toMediaType(name) {
  if (isImage(name)) return 'image';
  if (isVideo(name)) return 'video';
  return 'file';
}

async function readMeta(directoryPath) {
  const metaPath = path.join(directoryPath, 'meta.json');
  try {
    const raw = await fs.readFile(metaPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function joinAlbumPath(base, entry) {
  return normalizeAlbumPath(`${base}/${entry}`);
}

function buildMediaUrl(albumPath, fileName) {
  const normalized = normalizeAlbumPath(`${albumPath}/${fileName}`);
  return `/api/albums/media?path=${encodeURIComponent(normalized)}`;
}

function pickCoverFile(fileNames, meta = {}) {
  if (meta.cover && fileNames.includes(meta.cover)) {
    return meta.cover;
  }

  const lowerMap = new Map(fileNames.map((name) => [name.toLowerCase(), name]));

  for (const baseName of COVER_FILE_NAMES) {
    for (const ext of IMAGE_EXTENSIONS) {
      const match = lowerMap.get(`${baseName}${ext}`);
      if (match) return match;
    }
  }

  return fileNames.find(isImage) || fileNames.find(isVideo) || null;
}

async function describeDirectory(rootDir, parentAlbumPath, dirent) {
  const albumPath = joinAlbumPath(parentAlbumPath, dirent.name);
  const { absolute } = resolveAlbumFsPath(rootDir, albumPath);
  const nestedEntries = await fs.readdir(absolute, { withFileTypes: true });
  const files = nestedEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  const meta = await readMeta(absolute);
  const coverName = pickCoverFile(files, meta);
  const mediaFiles = files.filter((name) => isImage(name) || isVideo(name));

  return {
    name: dirent.name,
    path: albumPath,
    title: meta.title || prettifyName(dirent.name),
    description: meta.description || `${mediaFiles.length} медиа · ${nestedEntries.filter((entry) => entry.isDirectory()).length} разделов`,
    coverUrl: coverName ? buildMediaUrl(albumPath, coverName) : null,
    stats: {
      mediaCount: mediaFiles.length,
      directoryCount: nestedEntries.filter((entry) => entry.isDirectory()).length,
    },
  };
}

export async function readAlbumDirectory(rootDir, albumPath = '/') {
  const { normalized, absolute } = resolveAlbumFsPath(rootDir, albumPath);
  const stat = await fs.stat(absolute);

  if (!stat.isDirectory()) {
    throw new Error('Album path is not a directory');
  }

  const meta = await readMeta(absolute);
  const entries = await fs.readdir(absolute, { withFileTypes: true });
  const directories = [];
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    if (entry.isDirectory()) {
      directories.push(await describeDirectory(rootDir, normalized, entry));
      continue;
    }

    if (entry.isFile()) {
      const mediaType = toMediaType(entry.name);
      if (mediaType === 'file' && entry.name !== 'meta.json') continue;

      if (entry.name === 'meta.json') continue;

      files.push({
        name: entry.name,
        path: joinAlbumPath(normalized, entry.name),
        type: mediaType,
        url: buildMediaUrl(normalized, entry.name),
      });
    }
  }

  files.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  directories.sort((a, b) => a.title.localeCompare(b.title, 'ru'));

  const coverName = pickCoverFile(files.map((file) => file.name), meta);

  return {
    path: normalized,
    title: meta.title || (normalized === '/' ? 'Корневой альбом' : prettifyName(path.basename(absolute))),
    description:
      meta.description ||
      (normalized === '/'
        ? 'Выберите раздел альбома и откройте вложенные директории как отдельные страницы.'
        : `Папка ${prettifyName(path.basename(absolute))}`),
    coverUrl: coverName ? buildMediaUrl(normalized, coverName) : null,
    directories,
    files,
    stats: {
      mediaCount: files.length,
      directoryCount: directories.length,
    },
  };
}
