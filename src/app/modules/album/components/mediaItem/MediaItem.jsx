import { Clapperboard, Image as ImageIcon } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function MediaItem({ item, onOpen }) {
  const isImage = item.type === 'image';

  return (
    <article className="album-media-card">
      {isImage ? (
        <button
          type="button"
          className="album-media-card__preview album-media-card__preview--button"
          onClick={() => onOpen(item)}
          aria-label={`Открыть фото: ${item.name}`}
        >
          <img
            className="album-media-card__image"
            src={`${API_BASE}${item.url}`}
            alt={item.name}
            loading="lazy"
          />

          <span className="album-media-card__badge">
            <ImageIcon size={12} />
            Фото
          </span>
        </button>
      ) : (
        <div className="album-media-card__preview">
          <video
            className="album-media-card__video"
            src={`${API_BASE}${item.url}`}
            controls
            preload="metadata"
          />

          <span className="album-media-card__badge">
            <Clapperboard size={12} />
            Видео
          </span>
        </div>
      )}

      <div className="album-media-card__info">
        <strong>{item.name}</strong>
        <span>{item.path}</span>
      </div>
    </article>
  );
}