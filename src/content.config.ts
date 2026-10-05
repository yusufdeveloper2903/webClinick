import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      icon: image(),
      order: z.number().int(),
      /** Услуга, которая показывается в блоке-превью на главной. */
      featured: z.boolean().default(false),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      cover: image(),
      /** Вертикальное изображение для широкой карточки на главной. */
      banner: image().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const faq = defineCollection({
  loader: file('./src/content/faq.json'),
  schema: z.object({
    question: z.string(),
    /** Пока ответа нет, вопрос показывается неактивным. */
    answer: z.string().optional(),
    author: z.string(),
    date: z.coerce.date(),
    accent: z.enum(['orange', 'blue']).default('orange'),
    order: z.number().int(),
  }),
});

export const collections = { services, articles, faq };
