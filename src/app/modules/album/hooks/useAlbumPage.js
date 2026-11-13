import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export function useAlbumPage(routePath, locationKey) {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadAlbum() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_BASE}/api/albums/page?path=${encodeURIComponent(routePath)}`
        );

        if (!response.ok) {
          throw new Error('Не удалось прочитать директорию альбома');
        }

        const payload = await response.json();

        if (!cancelled) {
          setAlbum(payload);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError.message || 'Ошибка загрузки альбома'
          );
          setAlbum(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAlbum();

    return () => {
      cancelled = true;
    };
  }, [routePath, locationKey]);

  return {
    album,
    loading,
    error,
  };
}