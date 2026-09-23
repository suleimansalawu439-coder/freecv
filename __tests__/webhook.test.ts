import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
// NOTE: runs against the built-in mock Supabase client (no DB env vars in CI)
// and the in-memory rate limiter. No jest dependency.
import { POST } from '../app/api/paystack/webhook/route';

const secret = 'test_secret';

function createMockRequest(body: any, signatureStr?: string) {
  const jsonStr = JSON.stringify(body);
  const sig = signatureStr ?? crypto.createHmac('sha512', secret).update(jsonStr).digest('hex');

  return new Request('https://cvyon.com/api/paystack/webhook', {
    method: 'POST',
    headers: {
      'x-paystack-signature': sig,
      'content-type': 'application/json',
    },
    body: jsonStr,
  });
}

test('Paystack webhook rejects missing signature', async () => {
  process.env.PAYSTACK_SECRET_KEY = secret;
  try {
    const req = new Request('https://cvyon.com/api/paystack/webhook', {
      method: 'POST',
      body: JSON.stringify({ event: 'charge.success' }),
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
  } finally {
    delete process.env.PAYSTACK_SECRET_KEY;
  }
});

test('Paystack webhook rejects invalid signature', async () => {
  process.env.PAYSTACK_SECRET_KEY = secret;
  try {
    const req = createMockRequest({ event: 'charge.success' }, 'invalid_sig');
    const res = await POST(req);
    assert.equal(res.status, 400);
  } finally {
    delete process.env.PAYSTACK_SECRET_KEY;
  }
});

test('Paystack webhook processes charge.success successfully', async () => {
  process.env.PAYSTACK_SECRET_KEY = secret;
  try {
    const req = createMockRequest({
      event: 'charge.success',
      data: {
        id: '12345',
        reference: 'tx_123',
        amount: 5000,
        currency: 'NGN',
        customer: { customer_code: 'CUS_xyz' },
        metadata: { recruiter_id: 'rec_1' },
      },
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
  } finally {
    delete process.env.PAYSTACK_SECRET_KEY;
  }
});
