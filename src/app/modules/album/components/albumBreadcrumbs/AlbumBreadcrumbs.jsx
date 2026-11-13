import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AlbumBreadcrumbs({ items }) {
  return (
    <nav className="album-breadcrumb" aria-label="Навигация по альбому">
      {items.map((item, index) => (
        <span key={item.href} className="album-breadcrumb__item">
          {index > 0 && <ChevronRight size={14} />}

          {index === items.length - 1 ? (
            <b>{item.label}</b>
          ) : (
            <Link to={item.href}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}