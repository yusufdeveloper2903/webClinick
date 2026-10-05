import { site } from '@/config/site';

const dateFormatter = new Intl.DateTimeFormat(site.locale, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** 2020-08-28 → «28.08.2020» */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

/** Значение для атрибута `datetime` у <time>. */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
