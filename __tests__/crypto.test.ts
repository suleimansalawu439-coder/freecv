import test from 'node:test';
import assert from 'node:assert/strict';
import { timingSafeCompare, verifyPaystackSignature, verifyHmacSha256, generateSecureToken } from '../lib/crypto';
import crypto from 'crypto';

test('timingSafeCompare returns true for identical strings', () => {
  assert.equal(timingSafeCompare('secret_key_123', 'secret_key_123'), true);
});

test('timingSafeCompare returns false for different strings', () => {
  assert.equal(timingSafeCompare('secret_key_123', 'secret_key_456'), false);
  assert.equal(timingSafeCompare('short', 'longer_string'), false);
});

test('verifyPaystackSignature validates valid sha512 signature', () => {
  const secret = 'sk_test_paystack_secret';
  const body = JSON.stringify({ event: 'charge.success', data: { amount: 5000 } });
  const validSignature = crypto.createHmac('sha512', secret).update(body).digest('hex');

  assert.equal(verifyPaystackSignature(body, validSignature, secret), true);
  assert.equal(verifyPaystackSignature(body, 'invalid_signature', secret), false);
});

test('generateSecureToken generates correct token length', () => {
  const token32 = generateSecureToken(32);
  assert.equal(token32.length, 64); // 32 bytes = 64 hex characters
  assert.match(token32, /^[0-9a-f]+$/);
});
