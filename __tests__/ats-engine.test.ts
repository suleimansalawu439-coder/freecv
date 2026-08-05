import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAtsScore } from '../lib/ats-engine';

test('calculateAtsScore awards high score for comprehensive resume', () => {
  const resume = {
    personalInfo: {
      fullName: 'Jane Doe',
      jobTitle: 'Senior Full Stack Engineer',
      email: 'jane.doe@example.com',
      phone: '+1 555-0199',
      location: 'San Francisco, CA',
      website: 'https://janedoe.dev',
    },
    summary: 'Results-driven software architect with 8+ years experience scaling high-throughput distributed systems and leading cross-functional engineering teams to achieve 40% performance gains.',
    experience: [
      {
        id: '1',
        company: 'Tech Innovations Inc',
        role: 'Lead Architect',
        startDate: '2021',
        endDate: 'Present',
        description: 'Spearheaded migration to microservices architecture, reducing cloud infrastructure spend by $120k annually and scaling system throughput to 50k+ requests per second.',
      },
    ],
    skills: [
      { id: '1', name: 'TypeScript' },
      { id: '2', name: 'Next.js' },
      { id: '3', name: 'Node.js' },
      { id: '4', name: 'PostgreSQL' },
      { id: '5', name: 'Docker' },
      { id: '6', name: 'Kubernetes' },
    ],
    education: [
      {
        id: '1',
        school: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        graduationYear: '2018',
      },
    ],
  };

  const result = calculateAtsScore(resume as any);
  assert.ok(result.score >= 85, `Expected score >= 85, got ${result.score}`);
  assert.ok(result.grade === 'A+' || result.grade === 'A', `Expected grade A+ or A, got ${result.grade}`);
  assert.equal(result.breakdown.contactInfo.score, 20);
  assert.equal(result.breakdown.education.score, 10);
  assert.equal(result.breakdown.skills.score, 20);
});

test('calculateAtsScore handles empty resume gracefully and provides actionable suggestions', () => {
  const emptyResume = {};
  const result = calculateAtsScore(emptyResume);

  assert.equal(result.score, 0);
  assert.equal(result.grade, 'D');
  assert.ok(result.suggestions.length > 0);
});
