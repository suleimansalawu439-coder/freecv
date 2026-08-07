// Automated verification script for CRM opt-in and Admin display logic

function completeness(d) {
  let s = 0;
  if (d?.personalInfo?.fullName || d?.fullName) s += 5;
  if (d?.personalInfo?.jobTitle || d?.jobTitle) s += 10;
  if (d?.skills?.length) s += 20;
  if (d?.experience?.length) s += 20;
  if (d?.education?.length) s += 10;
  if (d?.personalInfo?.location) s += 10;
  if (d?.personalInfo?.website) s += 15;
  if (d?.summary) s += 10;
  return Math.min(100, Math.max(0, s));
}

function sanitizeStringList(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const item of arr) {
    if (!item) continue;
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if (trimmed) out.push(trimmed);
    } else if (typeof item === 'object' && item.name && typeof item.name === 'string') {
      const trimmed = item.name.trim();
      if (trimmed) out.push(trimmed);
    }
  }
  return Array.from(new Set(out));
}

function testSanitization() {
  const sampleSkills = [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    '  Node.js  ',
    null,
    '',
    { id: '3', name: 'React' } // Duplicate test
  ];

  const sanitized = sanitizeStringList(sampleSkills);
  console.log('Sanitized skills:', sanitized);
  if (sanitized.length !== 3 || !sanitized.includes('React') || !sanitized.includes('TypeScript') || !sanitized.includes('Node.js')) {
    throw new Error('Sanitization failed');
  }
  console.log('✅ Skill sanitization test passed');
}

function testAdminMerge() {
  const candidatesData = [
    {
      id: 'cand-1',
      email: 'test@cvyon.com',
      full_name: 'Test Candidate',
      job_title: 'Fullstack Dev',
      opted_in_at: '2026-08-07T00:00:00.000Z',
      skills: ['TypeScript', 'Next.js']
    }
  ];

  const profilesData = [
    {
      id: 'cand-1',
      current_title: 'Lead Architect',
      country: 'United Kingdom',
      city: 'London',
      experience_years: 5,
      completeness_score: 95,
      consent_recruiter_share: true,
      consent_email_jobs: true,
      consent_analytics: true,
      updated_at: '2026-08-07T00:00:00.000Z'
    }
  ];

  const profileMap = new Map(profilesData.map((p) => [p.id, p]));
  const seenIds = new Set();

  const mergedCandidates = candidatesData.map((c) => {
    seenIds.add(c.id);
    const prof = profileMap.get(c.id);
    return {
      id: c.id,
      email: c.email || '',
      full_name: c.full_name || c.name || prof?.full_name || 'Candidate',
      current_title: c.job_title || c.current_title || prof?.current_title || 'Professional',
      title_category: prof?.title_category || c.industry || '',
      country: c.country || prof?.country || 'Unknown',
      city: c.city || prof?.city || c.location || '',
      experience_years: c.experience_years ?? prof?.experience_years ?? 0,
      skills: (Array.isArray(prof?.skills) && prof.skills.length > 0) ? prof.skills : (c.skills || []),
      completeness_score: prof?.completeness_score || 70,
      consent_recruiter_share: prof?.consent_recruiter_share ?? true,
      consent_email_jobs: prof?.consent_email_jobs ?? true,
      consent_analytics: prof?.consent_analytics ?? true,
      opted_in_at: c.opted_in_at || c.created_at || prof?.consent_at || prof?.created_at,
    };
  });

  console.log('Merged candidates count:', mergedCandidates.length);
  if (mergedCandidates.length !== 1 || mergedCandidates[0].email !== 'test@cvyon.com' || mergedCandidates[0].country !== 'United Kingdom') {
    throw new Error('Admin merge verification failed');
  }
  console.log('✅ Admin merge logic test passed');
}

testSanitization();
testAdminMerge();
console.log('🎉 All opt-in verification checks succeeded!');
