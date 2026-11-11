import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, ArrowRight } from 'lucide-react';

const COUNTRIES = [
  {
    id: 'south-korea',
    name: 'Южная Корея',
    flag: '🇰🇷',
    role: 'Кандидат №1 · Через 10 лет',
    techFocus: 'ИИ, Автоматика, Робототехника',
    cover:
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80',
    summary:
      'Высокие технологии, развитая среда для карьеры мужа, абсолютная безопасность, но сложная система адаптации детей в школах.',
  },
];

export default function RelocationPage() {
  return (
    <div className="relocation-page">
      <header className="topbar">
        <div className="breadcrumb">
          <b>Места для жизни и путешествий</b>
        </div>
      </header>

      <section className="snapshot">
        <div className="snapshot-heading">
          <div>
            <span className="eyebrow">ГЕОГРАФИЯ БУДУЩЕГО</span>
            <h2>Страны на рассмотрении</h2>
          </div>
          <p>
            Здесь собираем аналитику по странам, которые нам интересны для туризма
            или потенциального переезда после завершения контракта мужа.
          </p>
        </div>

        <div className="country-cards-grid" style={{ marginTop: 24 }}>
          {COUNTRIES.map((c) => (
            <Link to={`/relocation/${c.id}`} key={c.id} className="country-card">
              <div
                className="country-card-cover"
                style={{ backgroundImage: `url(${c.cover})` }}
              >
                <span className="country-card-flag">{c.flag}</span>
              </div>
              <div className="country-card-body">
                <span className="eyebrow">{c.role}</span>
                <h3>{c.name}</h3>
                <p>{c.summary}</p>
                <div className="country-card-footer">
                  <span className="tech-badge">{c.techFocus}</span>
                  <span className="card-link">
                    Изучить анализ <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}