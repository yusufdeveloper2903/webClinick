/**
 * Единый источник данных о клинике: контакты, режим работы, карта.
 * Используется в шапке, подвале, на странице контактов и в SEO-разметке.
 */

export interface Phone {
  /** Как номер отображается на сайте. */
  label: string;
  /** Номер в формате E.164 для ссылки `tel:`. */
  value: string;
}

export interface ScheduleEntry {
  days: string;
  hours: string;
}

const phones = [
  { label: '(067) 634-75-74', value: '+380676347574' },
  { label: '(063) 757-01-31', value: '+380637570131' },
  { label: '(098) 266-43-89', value: '+380982664389' },
] as const satisfies readonly Phone[];

const schedule = [
  { days: 'Пн - Пт', hours: '8:00 - 18:00' },
  { days: 'Сб - Вс', hours: '8:00 - 14:00' },
] as const satisfies readonly ScheduleEntry[];

export const site = {
  name: 'Орджоникидзевская ветеринарная клиника',
  shortName: 'Animals',
  description:
    'Ветеринарная клиника в Мариуполе: диагностика, профилактика, лечение и уход за вашими питомцами.',
  locale: 'ru-RU',
  lang: 'ru',
  foundedYear: 2020,

  address: {
    city: 'г. Мариуполь',
    street: 'проспект Победы, 48а',
  },

  phones,

  schedule,

  map: {
    title: 'Ветеринарная клиника на карте',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4895.095997462387!2d69.21911955133665!3d40.697958664238776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae1ec100000659%3A0x2a0a63cba78dea63!2sArien%20Plaza!5e0!3m2!1suz!2s!4v1630061734060!5m2!1suz!2s',
  },
} as const;

export const fullAddress = `${site.address.city}, ${site.address.street}`;

/** Основной номер — для кнопок «Позвонить» / «Узнать цену». */
export const primaryPhone: Phone = phones[0];
