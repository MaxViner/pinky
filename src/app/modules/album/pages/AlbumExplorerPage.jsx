import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight, Clapperboard, FolderOpen, Image as ImageIcon, RefreshCw } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4177';

function normalizeRoutePath(splat) {
  if (!splat) return '/';
  return `/${String(splat).split('/').filter(Boolean).join('/')}`;
}

function formatSegmentLabel(segment) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildBreadcrumbs(routePath) {
  const segments = routePath.split('/').filter(Boolean);
  const crumbs = [{ label: 'Альбом', href: '/album' }];
  let current = '';

  for (const segment of segments) {
    current += `/${segment}`;
    crumbs.push({
      label: formatSegmentLabel(segment),
      href: `/album${current}`,
    });
  }

  return crumbs;
}

function DirectoryCard({ item }) {
  return (
    <Link to={`/album${item.path === '/' ? '' : item.path}`} className="album-directory-card">
      <div className="album-directory-visual">
        {item.coverUrl ? (
          <img src={`${API_BASE}${item.coverUrl}`} alt={item.title} className="album-directory-image" />
        ) : (
          <div className="album-directory-placeholder">
            <FolderOpen size={28} />
          </div>
        )}
        <div className="album-directory-overlay" />
        <div className="album-directory-hover">
          <span>{item.stats.directoryCount} папок</span>
          <span>{item.stats.mediaCount} медиа</span>
        </div>
      </div>

      <div className="album-directory-body">
        <div className="album-directory-meta">Папка · {item.path}</div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </Link>
  );
}

function MediaItem({ item }) {
  return (
    <article className="album-media-card">
      <div className="album-media-preview">
        {item.type === 'image' ? (
          <img src={`${API_BASE}${item.url}`} alt={item.name} loading="lazy" />
        ) : (
          <video src={`${API_BASE}${item.url}`} controls preload="metadata" />
        )}
        <span className="album-media-badge">
          {item.type === 'video' ? <Clapperboard size={12} /> : <ImageIcon size={12} />}
          {item.type === 'video' ? 'Видео' : 'Фото'}
        </span>
      </div>
      <div className="album-media-info">
        <strong>{item.name}</strong>
        <span>{item.path}</span>
      </div>
    </article>
  );
}

export default function AlbumExplorerPage() {
  const { '*': splat } = useParams();
  const location = useLocation();
  const routePath = useMemo(() => normalizeRoutePath(splat), [splat]);
  const breadcrumbs = useMemo(() => buildBreadcrumbs(routePath), [routePath]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadPage() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${API_BASE}/api/albums/page?path=${encodeURIComponent(routePath)}`);
        if (!response.ok) {
          throw new Error('Не удалось прочитать директорию альбома');
        }

        const payload = await response.json();
        if (!cancelled) {
          setData(payload);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message || 'Ошибка загрузки альбома');
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [routePath, location.key]);

  return (
    <div className="album-explorer-page">
      <header className="topbar">
        <div className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <span>/</span>}
              {index === breadcrumbs.length - 1 ? <b>{crumb.label}</b> : <Link to={crumb.href}>{crumb.label}</Link>}
            </React.Fragment>
          ))}
        </div>
        <div className="top-actions">
          <span className="updated">Файловая директория = страница альбома</span>
        </div>
      </header>

      <section className="album-explorer-hero">
        <div>
          <span className="eyebrow">FILE SYSTEM ALBUM MVP</span>
          <h1>{data?.title || 'Загрузка альбома'}</h1>
          <p>
            {data?.description || 'Чтение файловой системы, отображение подпапок карточками и показ фото/видео текущей директории.'}
          </p>
        </div>
        <div className="album-hero-stats">
          <div>
            <strong>{data?.stats.directoryCount ?? '—'}</strong>
            <span>поддиректорий</span>
          </div>
          <div>
            <strong>{data?.stats.mediaCount ?? '—'}</strong>
            <span>медиафайлов</span>
          </div>
          <div>
            <strong>{routePath}</strong>
            <span>текущий путь</span>
          </div>
        </div>
      </section>

      {loading && <div className="album-state-box">Загружаем структуру альбома…</div>}

      {!loading && error && (
        <div className="album-state-box error">
          <RefreshCw size={16} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <section className="album-section-block">
            <div className="album-section-heading">
              <div>
                <span className="eyebrow">ПОДПАПКИ</span>
                <h2>Карточки вложенных альбомов</h2>
              </div>
              <p>
                Каждая подпапка становится отдельной страницей. Hover поднимает описание, клик переводит в новую директорию.
              </p>
            </div>

            {data.directories.length ? (
              <div className="album-directories-grid">
                {data.directories.map((item) => (
                  <DirectoryCard key={item.path} item={item} />
                ))}
              </div>
            ) : (
              <div className="album-empty-state">В этой директории нет подпапок.</div>
            )}
          </section>

          <section className="album-section-block">
            <div className="album-section-heading">
              <div>
                <span className="eyebrow">СОДЕРЖИМОЕ ПАПКИ</span>
                <h2>Фото и видео текущей страницы</h2>
              </div>
              <p>
                Если директория содержит изображения и видео, они отображаются сразу на странице как галерея файловой папки.
              </p>
            </div>

            {data.files.length ? (
              <div className="album-media-grid">
                {data.files.map((item) => (
                  <MediaItem key={item.path} item={item} />
                ))}
              </div>
            ) : (
              <div className="album-empty-state">В этой директории пока нет фото или видео.</div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
