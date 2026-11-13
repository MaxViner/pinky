import { X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function Lightbox({
  image,
  hasMultipleImages,
  onClose,
  onPrevious,
  onNext,
}) {
  if (!image) return null;

  return (
    <div
      className="album-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="album-lightbox__close"
        onClick={onClose}
        aria-label="Закрыть просмотр"
      >
        <X size={22} />
      </button>

      <button
        type="button"
        className="album-lightbox__nav album-lightbox__nav--prev"
        onClick={onPrevious}
        disabled={!hasMultipleImages}
        aria-label="Предыдущее фото"
      >
        ‹
      </button>

      <img
        className="album-lightbox__image"
        src={`${API_BASE}${image.url}`}
        alt={image.name}
      />

      <button
        type="button"
        className="album-lightbox__nav album-lightbox__nav--next"
        onClick={onNext}
        disabled={!hasMultipleImages}
        aria-label="Следующее фото"
      >
        ›
      </button>

      <div className="album-lightbox__caption">
        {image.name}
      </div>
    </div>
  );
}