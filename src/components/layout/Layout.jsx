import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Globe2, Heart } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">
            <Heart size={17} fill="currentColor" />
          </span>
          <span>
            наша история
            <small>семейный проект</small>
          </span>
        </NavLink>

        <div className="side-label">РАЗДЕЛЫ</div>
        <nav className="side-nav">
          <NavLink
            to="/album"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={17} />
            <span>Личный альбом</span>
          </NavLink>

          <NavLink
            to="/relocation"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Globe2 size={17} />
            <span>Места для жизни</span>
          </NavLink>
        </nav>

        {/* Быстрый индикатор активной страны при переходе */}
        {location.pathname.includes('/relocation') && (
          <div className="side-country">
            <span className="country-flag">🇰🇷</span>
            <div>
              <b>Южная Корея</b>
              <small>Кандидат №1 (10 лет)</small>
            </div>
            <span className="active-dot" />
          </div>
        )}

        <div className="sidebar-bottom">
          <p>Будущее складывается из маленьких решений.</p>
          <span>СЕМЕЙНЫЙ АРХИВ & ПЛАНЫ</span>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}