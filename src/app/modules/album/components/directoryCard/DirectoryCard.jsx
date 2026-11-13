import { Link } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function DirectoryCard({ item }) {
  const description = item.description?.trim();
  const href = `/album${item.path === '/' ? '' : item.path}`;

  return (
    <Link
      to={href}
      className="album-directory-card"
      aria-label={`Открыть альбом: ${item.title}`}
    >
      <div className="album-directory-card__visual">
        {item.coverUrl ? (
          <img
            className="album-directory-card__image"
            src={`${API_BASE}${item.coverUrl}`}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <div className="album-directory-card__placeholder">
            <FolderOpen size={30} />
          </div>
        )}

        <div className="album-directory-card__overlay" aria-hidden="true" />

        <div className="album-directory-card__hover">
          <p className="album-directory-card__description">
            {description || 'Открыть альбом и посмотреть материалы.'}
          </p>

          <div className="album-directory-card__hover-stats">
            <span>{item.stats.directoryCount} папок</span>
            <span>{item.stats.mediaCount} медиа</span>
          </div>
        </div>
      </div>

      <div className="album-directory-card__body">
        <span className="album-directory-card__meta">
          Папка · {item.path}
        </span>

        <h3 className="album-directory-card__title">{item.title}</h3>

        <p className="album-directory-card__text">
          {description || 'Без описания'}
        </p>
      </div>
    </Link>
  );
}