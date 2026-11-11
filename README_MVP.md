# Pinky MVP — файловый альбом поверх директории

## Что реализовано

MVP превращает файловую структуру в сайт-альбом:

- **директория = страница**
- **поддиректории = карточки альбомов**
- **фото/видео в директории = содержимое страницы**
- путь в URL соответствует пути в файловой системе

Пример:

- `/album` → корень альбома
- `/album/travel-2024` → папка `albums/travel-2024`
- `/album/travel-2024/italy` → папка `albums/travel-2024/italy`

---

## Структура проекта

### Frontend
- React + Vite
- основная страница просмотра: `src/app/modules/album/pages/AlbumExplorerPage.jsx`
- роут: `album/*`

### Backend
- Node.js + Express
- сервер: `server/index.js`
- сервис чтения файловой структуры: `server/albumService.js`

### Папка альбомов
По умолчанию backend читает директорию:

`/home/user/pinky/albums`

Её можно заменить переменной окружения:

```bash
ALBUMS_ROOT=/absolute/path/to/your/albums node server/index.js
```

---

## Как соотносятся проект и папка с альбомом

Есть **сам проект** `pinky/`, а внутри него для MVP лежит демонстрационная файловая папка:

```bash
pinky/
  src/
  server/
  albums/
```

### Важно
Проект и альбом — это **разные сущности**:

- `pinky/` — код приложения
- `albums/` — данные альбома, которые приложение читает

В реальном использовании вы можете:

1. оставить `albums/` внутри проекта для локальной разработки
2. или хранить альбомы **вне проекта**, например:

```bash
D:/media/family-albums
```
или
```bash
/Volumes/Archive/Albums
```

И просто передать путь через `ALBUMS_ROOT`.

То есть приложение — это **надстройка**, а папка с альбомом — **источник данных**.

---

## Правила чтения папок

Для каждой папки backend:

1. читает `meta.json`, если он существует
2. ищет cover-файл в приоритете:
   - `cover.*`
   - `_cover.*`
   - `poster.*`
   - `thumb.*`
   - `thumbnail.*`
   - иначе первое изображение/видео
3. собирает:
   - поддиректории
   - изображения
   - видео
4. возвращает JSON для фронтенда

---

## Пример структуры альбомов

```bash
albums/
  meta.json
  travel-2024/
    meta.json
    cover.jpg
    italy/
      meta.json
      cover.jpg
      rome-street.jpg
      venice-morning.jpg
  family-days/
    meta.json
    cover.jpg
    picnic/
      cover.jpg
      lake-view.jpg
```

---

## API MVP

### Получить страницу директории
```http
GET /api/albums/page?path=/travel-2024/italy
```

### Получить медиа-файл
```http
GET /api/albums/media?path=/travel-2024/italy/cover.jpg
```

### Проверка сервера
```http
GET /api/health
```

---

## Как запускать

### 1. Установка
```bash
npm install
```

### 2. Запуск backend
```bash
npm run dev:server
```

### 3. Запуск frontend
```bash
npm run dev
```

Frontend по умолчанию ожидает backend на:

```txt
http://localhost:4177
```

Если нужно, можно задать:

```bash
VITE_API_URL=http://localhost:4177
```

---

## Что протестировано

### Backend
- чтение корневой директории `/`
- чтение вложенной директории `/travel-2024/italy`
- выдача изображения через `/api/albums/media`

### Frontend
- production build через `vite build`
- маршрут `/album/*`
- отображение карточек папок
- отображение медиа текущей директории
- breadcrumb-навигация

---

## Ограничения MVP

Пока не реализованы:

- автоматические thumbnails
- генерация постеров видео
- пагинация больших директорий
- lightbox / полноэкранный просмотр
- поиск
- редактирование метаданных из UI

Это нормально для первого этапа. MVP уже демонстрирует главную идею: **файловая система становится сайтом-альбомом**.
