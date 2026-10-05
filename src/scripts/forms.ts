/**
 * Обработка всех форм сайта с атрибутом data-form="<name>".
 *
 * Поля отправляются JSON-ом на PUBLIC_FORM_ENDPOINT. Если адрес не задан,
 * форма работает в демо-режиме: данные выводятся в консоль, пользователь видит успех.
 * data-success-dialog="<id>" — какое окно открыть после успешной отправки.
 */
import { PUBLIC_FORM_ENDPOINT } from 'astro:env/client';
import { closeDialog, openDialog } from './dialogs';

const MESSAGES = {
  success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
  error: 'Не удалось отправить форму. Попробуйте ещё раз или позвоните нам.',
} as const;

type FormStatus = keyof typeof MESSAGES;

export async function submitForm(form: HTMLFormElement): Promise<void> {
  const payload = {
    form: form.dataset.form,
    page: window.location.pathname,
    ...Object.fromEntries(new FormData(form)),
  };

  if (!PUBLIC_FORM_ENDPOINT) {
    console.info('[forms] PUBLIC_FORM_ENDPOINT не задан, демо-режим:', payload);
    return;
  }

  const response = await fetch(PUBLIC_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Form "${payload.form}" failed with status ${response.status}`);
  }
}

function setStatus(form: HTMLFormElement, status: FormStatus | null): void {
  const output = form.querySelector<HTMLElement>('[data-form-status]');
  if (!output) return;

  output.textContent = status ? MESSAGES[status] : '';
  if (status) output.dataset.status = status;
  else delete output.dataset.status;
}

async function handleSubmit(event: SubmitEvent): Promise<void> {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches('[data-form]')) return;

  event.preventDefault();

  const submitButtons = form.querySelectorAll<HTMLButtonElement>('button[type="submit"]');
  submitButtons.forEach((button) => (button.disabled = true));
  form.setAttribute('aria-busy', 'true');
  setStatus(form, null);

  try {
    await submitForm(form);
    form.reset();

    const nextDialog = form.dataset.successDialog;
    const parentDialog = form.closest('dialog');
    if (nextDialog) {
      if (parentDialog) closeDialog(parentDialog);
      openDialog(nextDialog);
    } else {
      setStatus(form, 'success');
    }
  } catch (error) {
    console.error(error);
    setStatus(form, 'error');
  } finally {
    submitButtons.forEach((button) => (button.disabled = false));
    form.removeAttribute('aria-busy');
  }
}

let initialized = false;

export function initForms(): void {
  if (initialized) return;
  initialized = true;
  document.addEventListener('submit', (event) => void handleSubmit(event));
}
