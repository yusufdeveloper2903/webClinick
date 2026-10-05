/** Идентификаторы модальных окон, общие для разметки и клиентских скриптов. */
export const DIALOG = {
  askQuestion: 'ask-question-dialog',
  followUp: 'follow-up-dialog',
} as const;

export type DialogId = (typeof DIALOG)[keyof typeof DIALOG];
