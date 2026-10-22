import { pad } from './strings.js';
import { DAY_MS } from './constants.js';

export function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

export function isoDay(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}
