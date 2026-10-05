/**
 * Карусели на Swiper. Разметка:
 *   <div data-carousel="<preset>">
 *     <div class="swiper"><div class="swiper-wrapper">…slides…</div></div>
 *     <button data-carousel-prev /> <button data-carousel-next />
 *     <span data-carousel-counter />   (необязательно)
 *   </div>
 */
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';

const presets = {
  services: {
    modules: [Navigation, Autoplay, A11y, Keyboard],
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    autoplay: { delay: 2000, pauseOnMouseEnter: true, disableOnInteraction: false },
    breakpoints: {
      600: { slidesPerView: 2 },
      1000: { slidesPerView: 3 },
      1200: { slidesPerView: 6 },
    },
  },
  gallery: {
    modules: [Navigation, A11y, Keyboard],
    spaceBetween: 20,
    slidesPerView: 1.2,
    breakpoints: {
      768: { slidesPerView: 2 },
    },
  },
} satisfies Record<string, SwiperOptions>;

export type CarouselPreset = keyof typeof presets;

function isPreset(name: string | undefined): name is CarouselPreset {
  return name !== undefined && name in presets;
}

function mount(root: HTMLElement): void {
  const preset = root.dataset.carousel;
  const container = root.querySelector<HTMLElement>('.swiper');
  if (!isPreset(preset) || !container || root.dataset.carouselMounted) return;
  root.dataset.carouselMounted = 'true';

  const counter = root.querySelector<HTMLElement>('[data-carousel-counter]');
  const updateCounter = (swiper: Swiper) => {
    if (counter) counter.textContent = `${swiper.realIndex + 1} / ${swiper.slides.length}`;
  };

  new Swiper(container, {
    ...presets[preset],
    navigation: {
      prevEl: root.querySelector<HTMLElement>('[data-carousel-prev]'),
      nextEl: root.querySelector<HTMLElement>('[data-carousel-next]'),
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { prevSlideMessage: 'Предыдущий слайд', nextSlideMessage: 'Следующий слайд' },
    on: { init: updateCounter, slideChange: updateCounter },
  });
}

export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(mount);
}
