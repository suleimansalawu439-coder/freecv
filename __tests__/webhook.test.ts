import { POST } from '../app/api/paystack/webhook/route';
import crypto from 'crypto';

// Mock dependencies
jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ data: null, error: null }),
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          limit: jest.fn().mockResolvedValue({ data: [], error: null })
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: null })
      })),
      upsert: jest.fn().mockResolvedValue({ data: null, error: null })
    }))
  }
}));

jest.mock('@/lib/invoice-generator', () => ({
  generateInvoicePdfBuffer: jest.fn().mockResolvedValue(Buffer.from('pdf'))
}));

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockResolvedValue(null),
  RATE_LIMITS: { WEBHOOK: {} }
}));

describe('Paystack Webhook', () => {
  const secret = 'test_secret';
  
  beforeAll(() => {
    process.env.PAYSTACK_SECRET_KEY = secret;
  });

  afterAll(() => {
    delete process.env.PAYSTACK_SECRET_KEY;
  });

  function createMockRequest(body: any, signatureStr?: string) {
    const jsonStr = JSON.stringify(body);
    const sig = signatureStr ?? crypto.createHmac('sha512', secret).update(jsonStr).digest('hex');
    
    return new Request('https://cvyon.com/api/paystack/webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': sig,
        'content-type': 'application/json'
      },
      body: jsonStr
    });
  }

  it('rejects missing signature', async () => {
    const req = new Request('https://cvyon.com/api/paystack/webhook', {
      method: 'POST',
      body: JSON.stringify({ event: 'charge.success' })
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects invalid signature', async () => {
    const req = createMockRequest({ event: 'charge.success' }, 'invalid_sig');
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('processes charge.success successfully', async () => {
    const req = createMockRequest({
      event: 'charge.success',
      data: {
        id: '12345',
        reference: 'tx_123',
        amount: 5000,
        currency: 'NGN',
        customer: { customer_code: 'CUS_xyz' },
        metadata: { recruiter_id: 'rec_1' }
      }
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
