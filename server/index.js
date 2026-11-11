import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readAlbumDirectory, resolveAlbumFsPath, normalizeAlbumPath } from './albumService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const albumRoot = process.env.ALBUMS_ROOT
  ? path.resolve(process.env.ALBUMS_ROOT)
  : path.resolve(projectRoot, 'albums');
const port = Number(process.env.PORT || 4177);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, albumRoot });
});

app.get('/api/albums/page', async (req, res) => {
  try {
    const albumPath = normalizeAlbumPath(req.query.path || '/');
    const page = await readAlbumDirectory(albumRoot, albumPath);
    res.json(page);
  } catch (error) {
    const status = String(error.message || '').includes('outside album root') ? 400 : 404;
    res.status(status).json({ error: error.message || 'Failed to read album directory' });
  }
});

app.get('/api/albums/media', async (req, res) => {
  try {
    const requestedPath = normalizeAlbumPath(req.query.path || '/');
    const { absolute } = resolveAlbumFsPath(albumRoot, requestedPath);
    const stat = await fs.stat(absolute);

    if (!stat.isFile()) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.sendFile(absolute);
  } catch (error) {
    return res.status(404).json({ error: error.message || 'Media not found' });
  }
});

app.listen(port, () => {
  console.log(`Album API running on http://localhost:${port}`);
  console.log(`Albums root: ${albumRoot}`);
});
