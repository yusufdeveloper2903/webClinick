export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  blog: '/blog',
  faq: '/faq',
  contact: '/contact',
  service: (slug: string) => `/services/${slug}`,
  article: (slug: string) => `/blog/${slug}`,
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'Главная', href: routes.home },
  { label: 'О клинике', href: routes.about },
  { label: 'Наши услуги', href: routes.services },
  { label: 'Полезные статьи', href: routes.blog },
  { label: 'FAQ', href: routes.faq },
  { label: 'Контакты', href: routes.contact },
];

/** Пункт меню активен на своей странице и на всех вложенных (например, /services/surgery). */
export function isActive(href: string, pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  if (href === routes.home) return path === routes.home;
  return path === href || path.startsWith(`${href}/`);
}
