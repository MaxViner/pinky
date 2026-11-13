import { useMemo } from 'react';
import { useAlbumPage } from '../../hooks/useAlbumPage';
import { useLightbox } from '../../hooks/useLightbox';
import { buildBreadcrumbs, normalizeRoutePath } from '../../utils/albumPath';
import AlbumBreadcrumbs from '../albumBreadcrumbs/AlbumBreadcrumbs';
import AlbumHero from '../albumHero/AlbumHero';
import DirectoryGrid from '../directoryGrid/DirectoryGrid';
import Lightbox from '../lightbox/Lightbox';
import MediaGrid from '../mediaGrid/MediaGrid';
import '../../styles/album.scss';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function AlbumExplorer({ splat, locationKey }) {
  const routePath = useMemo(() => normalizeRoutePath(splat), [splat]);
  const breadcrumbs = useMemo(() => buildBreadcrumbs(routePath), [routePath]);

  const { album, loading, error } = useAlbumPage(routePath, locationKey);

  const images = useMemo(() => {
    return album?.files?.filter((file) => file.type === 'image') ?? [];
  }, [album]);

  const lightbox = useLightbox(images);

  return (
    <div className="album-explorer-page">
      <header className="album-topbar">
        <AlbumBreadcrumbs items={breadcrumbs} />

        <div className="album-topbar__actions">
          <span>Файловая директория = страница альбома</span>
        </div>
      </header>

      <AlbumHero
        title={album?.title}
        description={album?.description}
        directoryCount={album?.stats?.directoryCount}
        mediaCount={album?.stats?.mediaCount}
        routePath={routePath}
      />

      {loading && (
        <div className="album-state album-state--loading">
          Загружаем структуру альбома…
        </div>
      )}

      {!loading && error && (
        <div className="album-state album-state--error">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && album && (
        <>
          <DirectoryGrid directories={album.directories} />

          <MediaGrid
            files={album.files}
            onImageOpen={lightbox.open}
          />
        </>
      )}

      {lightbox.isOpen && (
        <Lightbox
          image={lightbox.activeImage}
          hasMultipleImages={images.length > 1}
          onClose={lightbox.close}
          onPrevious={lightbox.showPrevious}
          onNext={lightbox.showNext}
        />
      )}
    </div>
  );
}