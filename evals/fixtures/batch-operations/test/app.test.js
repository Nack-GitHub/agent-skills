import { test } from 'node:test';
import assert from 'node:assert/strict';
import { describe } from '../src/app.js';

test('describe builds slug and path', () => {
  assert.deepEqual(describe(' Hello World! '), { slug: 'hello-world', path: '/posts/hello-world' });
});
