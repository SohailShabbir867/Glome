import { test } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

test('Express app exports correctly', () => {
  assert.ok(app);
});
