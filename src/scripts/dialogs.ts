/**
 * Модальные окна на нативном <dialog>.
 *
 * Разметка управляет поведением декларативно:
 *   data-dialog-open="<id>" — открыть окно с этим id;
 *   data-dialog-close      — закрыть окно, внутри которого находится элемент.
 * Клик по подложке и Esc тоже закрывают окно.
 */

function findDialog(id: string): HTMLDialogElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLDialogElement ? element : null;
}

export function openDialog(id: string): void {
  const dialog = findDialog(id);
  if (dialog && !dialog.open) dialog.showModal();
}

export function closeDialog(dialog: HTMLDialogElement): void {
  if (dialog.open) dialog.close();
}

function handleClick(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return;

  const opener = event.target.closest<HTMLElement>('[data-dialog-open]');
  if (opener?.dataset.dialogOpen) {
    event.preventDefault();
    openDialog(opener.dataset.dialogOpen);
    return;
  }

  const closer = event.target.closest('[data-dialog-close]');
  const parentDialog = closer?.closest('dialog');
  if (parentDialog) {
    closeDialog(parentDialog);
    return;
  }

  // У <dialog> нет внутренних отступов, поэтому клик по самому элементу — это клик по подложке.
  if (event.target instanceof HTMLDialogElement) {
    closeDialog(event.target);
  }
}

let initialized = false;

export function initDialogs(): void {
  if (initialized) return;
  initialized = true;
  document.addEventListener('click', handleClick);
}
