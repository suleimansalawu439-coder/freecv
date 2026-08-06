import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAtsScore } from '../lib/ats-engine';

test('calculateAtsScore awards high score for comprehensive, quantified resume with action verbs', () => {
  const resume = {
    personalInfo: {
      fullName: 'Jane Doe',
      jobTitle: 'Senior Full Stack Engineer',
      email: 'jane.doe@example.org',
      phone: '+1 555-0199',
      location: 'San Francisco, CA',
      website: 'https://github.com/janedoe',
    },
    summary: 'Accomplished software architect with 8+ years experience scaling high-throughput distributed systems. Spearheaded architectural transformation across engineering teams to accelerate system delivery and optimize infrastructure efficiency.',
    experience: [
      {
        id: '1',
        company: 'Tech Innovations Inc',
        role: 'Lead Architect',
        startDate: '2021',
        endDate: 'Present',
        description: 'Spearheaded migration to microservices architecture, reducing cloud infrastructure spend by $120k annually.\nArchitected real-time event pipeline scaling system throughput to 50k+ requests per second.\nEngineered automated CI/CD workflows, cutting deployment cycle times by 40%.',
      },
      {
        id: '2',
        company: 'Apex Systems',
        role: 'Senior Software Engineer',
        startDate: '2018',
        endDate: '2021',
        description: 'Delivered distributed caching layer boosting database response times by 35% across 2M active users.\nAutomated integration test suites, reducing regression bugs by 25%.',
      }
    ],
    skills: [
      { id: '1', name: 'TypeScript' },
      { id: '2', name: 'Next.js' },
      { id: '3', name: 'Node.js' },
      { id: '4', name: 'PostgreSQL' },
      { id: '5', name: 'Docker' },
      { id: '6', name: 'Kubernetes' },
      { id: '7', name: 'Redis' },
      { id: '8', name: 'AWS' },
      { id: '9', name: 'GraphQL' },
    ],
    education: [
      {
        id: '1',
        school: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        graduationYear: '2018',
      },
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2022',
      }
    ]
  };

  const result = calculateAtsScore(resume as any);
  assert.ok(result.score >= 85, `Expected score >= 85, got ${result.score}`);
  assert.ok(result.grade === 'A+' || result.grade === 'A', `Expected grade A+ or A, got ${result.grade}`);
  assert.ok(result.metrics.actionVerbCount >= 3, `Expected actionVerbCount >= 3, got ${result.metrics.actionVerbCount}`);
  assert.ok(result.metrics.quantifiableMetricCount >= 3, `Expected quantifiableMetricCount >= 3, got ${result.metrics.quantifiableMetricCount}`);
  assert.equal(result.breakdown.contactInfo.status, 'good');
  assert.equal(result.breakdown.experience.status, 'good');
  assert.equal(result.breakdown.skills.status, 'good');
});

test('calculateAtsScore penalizes generic, unquantified resume with passive voice and clichés', () => {
  const genericResume = {
    personalInfo: {
      fullName: 'John',
      jobTitle: 'Developer',
      email: 'john@gmail.com',
      phone: '1234567',
      location: 'NY',
    },
    summary: 'I am a hard worker and team player looking for a job to utilize my skills.',
    experience: [
      {
        id: '1',
        company: 'Company',
        role: 'Worker',
        startDate: '2020',
        endDate: '2022',
        description: 'Responsible for writing code and assisted with daily bugs. Worked on various tasks.',
      },
    ],
    skills: [
      { id: '1', name: 'Coding' },
      { id: '2', name: 'Computers' },
    ],
    education: [
      {
        id: '1',
        school: 'State College',
        degree: 'Degree',
      },
    ],
  };

  const result = calculateAtsScore(genericResume as any);
  assert.ok(result.score <= 55, `Expected score <= 55 for generic resume, got ${result.score}`);
  assert.ok(result.grade === 'D' || result.grade === 'C', `Expected grade D or C, got ${result.grade}`);
  assert.ok(result.metrics.weakPhrasesFound.length > 0, 'Expected weak phrases to be detected');
  assert.ok(result.penalties.length > 0, 'Expected penalties for passive voice or clichés');
});

test('calculateAtsScore handles empty resume gracefully and provides actionable suggestions', () => {
  const emptyResume = {};
  const result = calculateAtsScore(emptyResume);

  assert.equal(result.score, 0);
  assert.equal(result.grade, 'D');
  assert.ok(result.suggestions.length > 0);
});
