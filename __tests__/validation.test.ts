import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeText, sanitizeHtml, validatePayload, JobClickTrackSchema, AdminConfigSchema } from '../lib/validation';

test('sanitizeText strips HTML tags safely', () => {
  const dirty = '<script>alert("xss")</script><b>John Doe</b>';
  const clean = sanitizeText(dirty);
  assert.equal(clean, 'John Doe');
});

test('sanitizeHtml removes malicious script tags but preserves safe markup', () => {
  const dirty = '<p>Experience at <script>stealCookies()</script>Acme Corp</p>';
  const clean = sanitizeHtml(dirty);
  assert.equal(clean, '<p>Experience at Acme Corp</p>');
});

test('validatePayload accepts valid JobClickTrack payload', () => {
  const valid = {
    job_url: 'https://example.com/job/123',
    job_title: 'Software Engineer',
    country: 'US',
    cpc_value: 0.65,
  };
  const result = validatePayload(JobClickTrackSchema, valid);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.job_url, 'https://example.com/job/123');
  }
});

test('validatePayload rejects invalid AdminConfig payload with bad target', () => {
  const invalid = {
    target: 'malicious_table',
    key: 'some_key',
  };
  const result = validatePayload(AdminConfigSchema, invalid);
  assert.equal(result.success, false);
});
