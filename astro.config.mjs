// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig, envField } from 'astro/config';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://web-clinic.example.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // Старые адреса страниц продолжают работать после переезда на Astro.
  // (/blog.html, /faq.html, /contact.html совпадают с новыми файлами и редиректа не требуют.)
  redirects: {
    '/about-campany': '/about',
    '/servies': '/services',
    '/servicas_open': '/services/initial-exam',
  },
  env: {
    schema: {
      // Куда отправлять заявки из форм. Без значения формы работают в демо-режиме.
      PUBLIC_FORM_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        url: true,
      }),
    },
  },
  vite: {
    // Тот же алиас, что и в tsconfig.json: нужен Sass (@use) и url() в стилях.
    resolve: {
      alias: { '@': srcDir },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Токены и миксины доступны в каждом <style lang="scss"> без ручного импорта.
          additionalData: `@use "@/styles/abstracts" as *;\n`,
        },
      },
    },
  },
});
