import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  Baby,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleAlert,
  Compass,
  ExternalLink,
  House,
  Languages,
  MapPin,
  Wallet,
} from 'lucide-react';

// Внутренний реестр стран для раздела релокации
const COUNTRIES_DATA = {
  'south-korea': {
    name: 'Южная Корея',
    nativeName: '대한민국',
    region: 'Восточная Азия',
    heroImage:
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1800&q=85',
    tagline: 'Большой горизонт. Много вопросов.\nСобираем ответы вместе.',
    metrics: [
      {
        icon: Wallet,
        label: 'Бюджет семьи',
        value: '$1 200',
        note: 'общий доход сейчас',
        tone: 'coral',
      },
      {
        icon: CalendarDays,
        label: 'Горизонт переезда',
        value: '~10 лет',
        note: 'из-за допуска к сведениям',
        tone: 'blue',
      },
      {
        icon: Baby,
        label: 'Дети',
        value: '2 ребёнка',
        note: 'школьный возраст к моменту переезда',
        tone: 'green',
      },
      {
        icon: Compass,
        label: 'Главный фокус',
        value: 'Реалистичность',
        note: 'виза, допуск, школа и язык',
        tone: 'yellow',
      },
    ],
    costs: [
      {
        item: 'Аренда жилья (1–2 спальни)',
        cost: '$450–1 000',
        note: 'Система залога (Wolse): депозит от $5 000 до $20 000+',
      },
      {
        item: 'Питание и продукты',
        cost: '$450–750',
        note: 'Локальная корзина умеренная; европейские продукты и мясо дороже',
      },
      {
        item: 'Транспорт и связь',
        cost: '$100–200',
        note: 'Превосходное метро и автобусы (T-money), скоростной интернет',
      },
      {
        item: 'Медицинская страховка (NHIS)',
        cost: '$150–300',
        note: 'Обязательна для резидентов, покрывает большую часть базовых услуг',
      },
      {
        item: 'Школа и развитие детей',
        cost: '$0–1 500+',
        note: 'Госшколы бесплатны (на корейском); хагвоны/курсы — от $300 на ребёнка',
      },
      {
        item: 'Итого ориентир (семья с детьми)',
        cost: '$2 500–4 000+',
        note: 'Минимальный комфортный порог на 4 человека без частных школ',
        isTotal: true,
      },
    ],
    criteria: [
      {
        title: 'Визовая реализуемость и допуск',
        score: 2,
        desc: 'Ключевой фактор — закрытый допуск мужа. Требуется официальный срок погашения обязательств после окончания службы. Для визы нужен рабочий контракт (E-7) в аккредитованной технологической компании либо исследовательская виза.',
      },
      {
        title: 'Финансовый порог входа',
        score: 1,
        desc: 'Текущий доход в $1 200 достаточен для жизни в РФ во время декрета и накоплений, но для Кореи критически мал. Стратегия: формирование стартового капитала (от $30 000 на залог и первый год) и выход на международный доход.',
      },
      {
        title: 'Перспективы мужа (ИИ и робототехника)',
        score: 4,
        desc: 'Корея — один из мировых эпицентров робототехники (Hyundai Robotics, Doosan, Samsung, лаборатории KAIST). В сфере ИИ востребованы англоязычные исследователи и разработчики, особенно с сильной математической базой.',
      },
      {
        title: 'Перспективы жены (финансы / свой бизнес)',
        score: 3,
        desc: 'Финансовый сектор консервативен и требует знания корейского. Однако удалённый консалтинг, международная бухгалтерия или e-commerce дают гибкость совмещения с воспитанием детей.',
      },
      {
        title: 'Дети школьного возраста и адаптация',
        score: 2,
        desc: 'Государственная школа доступна, но полностью на корейском (сильный стресс для школьника без языка). Колоссальная академическая конкуренция и система репетиторов (хагвонов). Международные школы стоят от $15 000 в год.',
      },
      {
        title: 'Язык, менталитет и безопасность',
        score: 4,
        desc: 'Абсолютная безопасность для детей: можно гулять вечером без опаски. Чистота и порядок. Языковой барьер высок: хангыль прост для чтения, но свободная речь требует 2–3 лет системного изучения.',
      },
    ],
    timeline: [
      {
        phase: 'Годы 1–2 (Старт)',
        title: 'Юридическая ясность и база',
        desc: 'Анализ ограничений по допуску. Начало изучения корейского алфавита и базовой лексики мужем и женой. Рождение первого ребёнка.',
      },
      {
        phase: 'Годы 3–7 (Накопление)',
        title: 'Компетенции и семья',
        desc: 'Воспитание двух детей. Муж углубляется в Python/C++, алгоритмы ИИ и ROS (Robot Operating System), собирает портфолио на GitHub. Жена получает финансовую квалификацию.',
      },
      {
        phase: 'Годы 8–10 (Подготовка к броску)',
        title: 'Язык для детей и оффер',
        desc: 'Детям — курсы корейского в игровой форме. Поиск вакансий в R&D-центрах Кореи. Снятие формальных запретов на выезд и подача документов.',
      },
    ],
  },
};

function ScoreStars({ value }) {
  return (
    <span className="score" aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < value ? 'on' : ''} />
      ))}
    </span>
  );
}

export default function RelocationDetail() {
  const { countryId } = useParams();
  const country = COUNTRIES_DATA[countryId] || COUNTRIES_DATA['south-korea'];

  return (
    <div className="relocation-detail">
      {/* Верхняя навигационная цепочка */}
      <header className="topbar">
        <div className="breadcrumb">
          <Link to="/relocation">Места для жизни</Link> <span>/</span> <b>{country.name}</b>
        </div>
        <div className="top-actions">
          <span className="updated">Стратегический план · Горизонт 10 лет</span>
          <a
            href="https://www.visa.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            title="Официальный визовый портал Кореи"
          >
            <ArrowUpRight size={17} />
          </a>
        </div>
      </header>

      {/* Главный блок с титульной фотографией */}
      <section className="hero">
        <div
          className="hero-photo"
          style={{ backgroundImage: `url(${country.heroImage})` }}
          role="img"
          aria-label={country.name}
        />
        <div className="hero-content">
          <div className="location-label">
            <MapPin size={14} /> {country.region.toUpperCase()} <span>·</span> КАНДИДАТ №1
          </div>
          <h1>{country.name}</h1>
          <p style={{ whiteSpace: 'pre-line' }}>{country.tagline}</p>
          <a href="#costs" className="hero-link">
            Перейти к расходам и рискам <ArrowDown size={15} />
          </a>
        </div>
        <div className="hero-caption">
          <span>{country.nativeName}</span>
          <span>ГОРИЗОНТ: 10 ЛЕТ</span>
        </div>
      </section>

      {/* Ключевые показатели семьи */}
      <section className="snapshot">
        <div className="snapshot-heading">
          <div>
            <span className="eyebrow">ОТПРАВНАЯ ТОЧКА НАШЕЙ СЕМЬИ</span>
            <h2>
              Переезд не сейчас,
              <br />
              но подготовка идёт уже сегодня.
            </h2>
          </div>
          <p>
            Оцениваем страну строго через семейные рамки: допуск к гостайне, будущее
            двоих детей школьного возраста и переквалификацию обоих супругов.
          </p>
        </div>
        <div className="metric-grid">
          {country.metrics.map(({ icon: Icon, label, value, note, tone }) => (
            <article className="metric" key={label}>
              <span className={`metric-icon ${tone}`}>
                <Icon size={17} />
              </span>
              <span className="metric-label">{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </div>
      </section>

      {/* Финансовый блок */}
      <section className="content-section" id="costs">
        <div className="section-title">
          <div>
            <span className="eyebrow">БЫТ И ДЕНЬГИ</span>
            <h2>Ориентир стоимости жизни</h2>
          </div>
          <span className="section-note">Оценка в месяц · USD</span>
        </div>

        <div className="cost-layout">
          <div className="cost-table">
            <div className="table-head">
              <span>СТАТЬЯ РАСХОДОВ</span>
              <span>ОЦЕНКА</span>
              <span>ДЕТАЛИ И ОСОБЕННОСТИ</span>
            </div>
            {country.costs.map((row) => (
              <div className={`cost-row ${row.isTotal ? 'total' : ''}`} key={row.item}>
                <b>{row.item}</b>
                <strong>{row.cost}</strong>
                <span>{row.note}</span>
              </div>
            ))}
          </div>

          <aside className="budget-note">
            <span className="note-icon">
              <CircleAlert size={18} />
            </span>
            <span className="eyebrow">АНАЛИЗ БЮДЖЕТА</span>
            <strong>Текущих $1 200 недостаточно для переезда.</strong>
            <p>
              Но горизонт в 10 лет даёт время: к моменту выезда мужа в ИИ и робототехнике
              доход специалиста в Корее составляет от $4 000 до $8 000/мес.
            </p>
            <div className="gap-line">
              <span>Текущий доход семьи</span>
              <b>$1 200</b>
            </div>
            <div className="gap-track">
              <i style={{ width: '30%' }} />
            </div>
            <small>
              Целевой ориентир на семью из 4 человек: <b>от $3 500 / мес.</b>
            </small>
          </aside>
        </div>
      </section>

      {/* Анализ критериев */}
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">ОЦЕНКА ПО НАШИМ КРИТЕРИЯМ</span>
            <h2>Сложности и преимущества для семьи</h2>
          </div>
          <span className="fit-legend">
            1 — сложно / барьер · 5 — благоприятно
          </span>
        </div>

        <div className="criteria-list">
          {country.criteria.map((item, idx) => (
            <article className="criterion" key={item.title}>
              <span className="criterion-number">0{idx + 1}</span>
              <div className="criterion-main">
                <div className="criterion-heading">
                  <h3>{item.title}</h3>
                  <ScoreStars value={item.score} />
                </div>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 10-летний таймлайн */}
      <section className="content-section family-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">СТРАТЕГИЯ ПО ШАГАМ</span>
            <h2>10 лет — это не ожидание, а подготовка</h2>
          </div>
        </div>

        <div className="timeline">
          {country.timeline.map((step) => (
            <article key={step.phase}>
              <span className="timeline-date">{step.phase}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>

        <div className="family-callout">
          <span>
            <Check size={18} />
          </span>
          <p>
            <b>Семейный ориентир:</b> цель переезда — не бегство, а качественный скачок в
            образовании детей и технологической карьере мужа при финансовой стабильности.
          </p>
        </div>
      </section>
    </div>
  );
}