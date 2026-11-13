export default function AlbumHero({
  title,
  description,
  directoryCount,
  mediaCount,
  routePath,
}) {
  return (
    <section className="album-hero">
      <div className="album-hero__content">
        <span className="album-hero__eyebrow">
          FILE SYSTEM ALBUM MVP
        </span>

        <h1 className="album-hero__title">
          {title || 'Загрузка альбома'}
        </h1>

        <p className="album-hero__description">
          {description ||
            'Чтение файловой системы, отображение подпапок карточками и показ фото/видео текущей директории.'}
        </p>
      </div>

      <div className="album-hero__stats">
        <div className="album-hero__stat">
          <strong>{directoryCount ?? '—'}</strong>
          <span>поддиректорий</span>
        </div>

        <div className="album-hero__stat">
          <strong>{mediaCount ?? '—'}</strong>
          <span>медиафайлов</span>
        </div>

        <div className="album-hero__stat">
          <strong>{routePath}</strong>
          <span>текущий путь</span>
        </div>
      </div>
    </section>
  );
}