/**
 * @jest-environment node
 */
import { POST } from '@/app/api/paystack/webhook/route';
import { NextResponse } from 'next/server';

jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({ error: null }),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  }
}));

describe('Paystack Webhook API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, PAYSTACK_SECRET_KEY: 'test_secret' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('rejects requests with missing signature', async () => {
    const req = new Request('http://localhost:3000/api/paystack/webhook', {
      method: 'POST',
      body: JSON.stringify({ event: 'charge.success' })
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    
    const data = await res.json();
    expect(data.error).toBe('Missing signature');
  });
});
