import MediaItem from '../mediaItem/MediaItem';

export default function MediaGrid({ files, onImageOpen }) {
  if (!files?.length) {
    return (
      <section className="album-section">
        <div className="album-empty">
          В этой директории пока нет фото или видео.
        </div>
      </section>
    );
  }

  return (
    <section className="album-section">
      <div className="album-section__heading">
        <div>
          <span className="album-section__eyebrow">
            СОДЕРЖИМОЕ ПАПКИ
          </span>

          <h2>Фото и видео текущей страницы</h2>
        </div>
      </div>

      <div className="album-media-grid">
        {files.map((file) => (
          <MediaItem
            key={file.path}
            item={file}
            onOpen={onImageOpen}
          />
        ))}
      </div>
    </section>
  );
}