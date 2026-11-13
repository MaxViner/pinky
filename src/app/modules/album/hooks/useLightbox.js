import { useCallback, useEffect, useState } from 'react';

export function useLightbox(images) {
  const [activeIndex, setActiveIndex] = useState(null);

  const open = useCallback(
    (item) => {
      const index = images.findIndex((image) => image.path === item.path);

      if (index !== -1) {
        setActiveIndex(index);
      }
    },
    [images]
  );

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return (currentIndex - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return (currentIndex + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    }

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, close, showNext, showPrevious]);

  return {
    activeIndex,
    activeImage: activeIndex === null ? null : images[activeIndex],
    isOpen: activeIndex !== null,
    open,
    close,
    showPrevious,
    showNext,
  };
}