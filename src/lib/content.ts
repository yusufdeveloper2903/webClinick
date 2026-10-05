import { getCollection, type CollectionEntry } from 'astro:content';

export type Service = CollectionEntry<'services'>;
export type Article = CollectionEntry<'articles'>;
export type FaqItem = CollectionEntry<'faq'>;

export async function getServices(): Promise<Service[]> {
  const services = await getCollection('services');
  return services.sort((a, b) => a.data.order - b.data.order);
}

export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.data.featured);
}

export async function getFaq(): Promise<FaqItem[]> {
  const items = await getCollection('faq');
  return items.sort((a, b) => a.data.order - b.data.order);
}
