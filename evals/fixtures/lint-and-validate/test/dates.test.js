import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addDays, isoDay } from '../src/utils/dates.js';

test('addDays + isoDay', () => {
  assert.equal(isoDay(addDays(new Date(Date.UTC(2026, 0, 31)), 1)), '2026-02-01');
});
