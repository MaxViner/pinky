export function normalizeRoutePath(splat) {
  if (!splat) return '/';

  return `/${String(splat)
    .split('/')
    .filter(Boolean)
    .join('/')}`;
}

export function formatSegmentLabel(segment) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function buildBreadcrumbs(routePath) {
  const segments = routePath.split('/').filter(Boolean);
  const crumbs = [{ label: 'Альбом', href: '/album' }];
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    crumbs.push({
      label: formatSegmentLabel(segment),
      href: `/album${currentPath}`,
    });
  });

  return crumbs;
}