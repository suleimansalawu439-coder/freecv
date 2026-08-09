import React from 'react';
import { render } from '@testing-library/react';
import { ConsentManager } from '@/components/ConsentManager';

jest.mock('@/store/useResumeStore', () => ({
  useResumeStore: () => ({
    consentEmailJobs: false,
    setConsentEmailJobs: jest.fn(),
    personalInfo: { email: 'test@example.com' },
  }),
}));

describe('ConsentManager Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = render(<ConsentManager />);
    expect(container).toMatchSnapshot();
  });
});
