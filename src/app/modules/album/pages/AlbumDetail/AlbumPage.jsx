import React from 'react';
import { FolderHeart, Image as ImageIcon, Sparkles } from 'lucide-react';

// Имитация ваших локальных папок на компьютере
const MOCK_ALBUMS = [
  {
    id: 'our-wedding',
    title: 'День нашей свадьбы',
    date: '2023',
    photoCount: 142,
    coverUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Начало семейной истории, ЗАГС и вечер с близкими.',
  },
  {
    id: 'first-trips',
    title: 'Наши совместные поездки',
    date: '2023–2024',
    photoCount: 88,
    coverUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    description: 'Горы, выходные за городом и первые маленькие путешествия.',
  },
  {
    id: 'family-nest',
    title: 'Наш уютный дом',
    date: '2024–2025',
    photoCount: 56,
    coverUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    description: 'Обустройство квартиры, тёплые вечера и памятные мелочи.',
  },
  {
    id: 'future-kids',
    title: 'В ожидании малышей',
    date: 'Планы через 2 года',
    photoCount: 0,
    coverUrl:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    description: 'Папка для первых снимков УЗИ, детской комнаты и воспоминаний.',
    isPending: true,
  },
];

export default function AlbumPage() {
  return (
    <div className="album-page">
      <header className="topbar">
        <div className="breadcrumb">
          <b>Личный альбом</b> <span>/</span> Папки с компьютера
        </div>
        <div className="top-actions">
          <span className="updated">Локальная медиатека семьи</span>
        </div>
      </header>

      <section className="snapshot" style={{ borderBottom: 'none', paddingBottom: 15 }}>
        <div className="snapshot-heading">
          <div>
            <span className="eyebrow">АРХИВ ВОСПОМИНАНИЙ</span>
            <h2>Наши фотоальбомы по темам</h2>
          </div>
          <p>
            Каждая карточка отражает папку с семейными фото. В будущем сюда можно
            подключить локальный файловый доступ или облачный архив.
          </p>
        </div>
      </section>

      {/* Сетка карточек альбомного вида */}
      <div className="album-grid">
        {MOCK_ALBUMS.map((album) => (
          <article className="album-card" key={album.id}>
            <div className="album-cover-wrapper">
              <img
                src={album.coverUrl}
                alt={album.title}
                className="album-cover-img"
                loading="lazy"
              />
              <span className="album-badge">
                <ImageIcon size={12} /> {album.photoCount} фото
              </span>
            </div>

            <div className="album-info">
              <div className="album-meta">
                <span className="album-date">{album.date}</span>
                {album.isPending && (
                  <span className="pending-pill">
                    <Sparkles size={11} /> Скоро
                  </span>
                )}
              </div>
              <h3 className="album-title">{album.title}</h3>
              <p className="album-desc">{album.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}