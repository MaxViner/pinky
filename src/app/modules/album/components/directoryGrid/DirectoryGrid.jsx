import DirectoryCard from '../directoryCard/DirectoryCard';

export default function DirectoryGrid({ directories }) {
  if (!directories?.length) {
    return (
      <section className="album-section">
        <div className="album-empty">
          В этой директории нет подпапок.
        </div>
      </section>
    );
  }

  return (
    <section className="album-section">
      <div className="album-section__heading">
        <div>
          <span className="album-section__eyebrow">ПОДПАПКИ</span>
          <h2>Карточки вложенных альбомов</h2>
        </div>
      </div>

      <div className="album-directories-grid">
        {directories.map((directory) => (
          <DirectoryCard key={directory.path} item={directory} />
        ))}
      </div>
    </section>
  );
}