import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { getOrderedSectionIds, isSectionVisible } from '@/lib/template-sections';
import type { ResumeSectionId } from '@/store/types';

const BLUE = '#1d4ed8';
const MONO = 'Courier';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    padding: 44,
  },
  name: {
    fontFamily: MONO,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#111827',
  },
  rule: {
    height: 1,
    backgroundColor: BLUE,
    marginTop: 14,
    marginBottom: 12,
  },
  jobTitle: {
    fontFamily: MONO,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: BLUE,
    marginBottom: 8,
  },
  contactRow: {
    fontFamily: MONO,
    fontSize: 8.5,
    color: '#4B5563',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: MONO,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: BLUE,
    marginBottom: 12,
  },
  summaryText: {
    fontFamily: MONO,
    fontSize: 9,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 14,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontFamily: MONO,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: BLUE,
  },
  companyName: {
    fontFamily: MONO,
    fontSize: 8.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6B7280',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletMark: {
    width: 10,
    fontFamily: MONO,
    fontSize: 8.5,
    color: BLUE,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontFamily: MONO,
    fontSize: 8.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6B7280',
    marginTop: 2,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontFamily: MONO,
    fontSize: 8.5,
    color: '#1E3A8A',
  },
  certItem: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  certName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  certIssuer: {
    fontFamily: MONO,
    fontSize: 8.5,
    color: '#6B7280',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontFamily: MONO,
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },
  refContact: {
    fontFamily: MONO,
    fontSize: 8,
    color: BLUE,
    marginTop: 2,
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontFamily: MONO,
    fontSize: 8.5,
    color: '#6B7280',
  },
  customDescription: {
    fontSize: 9,
    color: '#374151',
    marginTop: 3,
    lineHeight: 1.5,
  },
  projectDesc: {
    fontFamily: MONO,
    fontSize: 8.5,
    color: '#374151',
    marginTop: 4,
    lineHeight: 1.5,
  },
});

function dateRange(startDate?: string, endDate?: string): string | null {
  const parts = [startDate, endDate].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(' \u2192 ') : null;
}

export default function Draft({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  const defs: Partial<Record<ResumeSectionId, { title: string; body: React.ReactNode }>> = {};

  if (data.summary) {
    defs.personal = {
      title: 'Summary',
      body: <Text style={styles.summaryText}>{data.summary}</Text>,
    };
  }

  if (data.experience && data.experience.length > 0) {
    defs.experience = {
      title: 'Experience',
      body: (
        <View>
          {data.experience.map(exp => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                {dateRange(exp.startDate, exp.endDate) ? (
                  <Text style={styles.dateText}>{dateRange(exp.startDate, exp.endDate)}</Text>
                ) : null}
              </View>
              {exp.company ? <Text style={styles.companyName}>{exp.company}</Text> : null}
              {exp.description ? (
                <View>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter(Boolean)
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>{'\u2013'}</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      ),
    };
  }

  if (data.education && data.education.length > 0) {
    defs.education = {
      title: 'Education',
      body: (
        <View>
          {data.education.map(edu => (
            <View key={edu.id} style={styles.educationItem}>
              <View>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
              </View>
              {edu.graduationYear ? (
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ),
    };
  }

  if (data.skills && data.skills.length > 0) {
    defs.skills = {
      title: 'Skills',
      body: (
        <View style={styles.chipsWrap}>
          {data.skills.map(skill => (
            <View key={skill.id} style={styles.chip}>
              <Text style={styles.chipText}>{skill.name}</Text>
            </View>
          ))}
        </View>
      ),
    };
  }

  if (data.showProjects && data.projects && data.projects.length > 0) {
    defs.projects = {
      title: 'Projects',
      body: (
        <View>
          {data.projects.map(project => (
            <View key={project.id} style={styles.experienceItem}>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.roleTitle}>{project.name}</Text>
                {project.link ? <Text style={styles.dateText}>{project.link}</Text> : null}
              </View>
              {project.description ? (
                <Text style={styles.projectDesc}>{project.description}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ),
    };
  }

  if (data.showCertifications && data.certifications && data.certifications.length > 0) {
    defs.certifications = {
      title: 'Certifications',
      body: (
        <View>
          {data.certifications.map(cert => (
            <View key={cert.id} style={styles.certItem}>
              <View>
                <Text style={styles.certName}>{cert.name}</Text>
                {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
              </View>
              {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
            </View>
          ))}
        </View>
      ),
    };
  }

  if (data.showReferences && data.references && data.references.length > 0) {
    defs.references = {
      title: 'References',
      body: (
        <View style={styles.refGrid}>
          {data.references.map(ref => (
            <View key={ref.id} style={styles.refCard}>
              <Text style={styles.refName}>{ref.name}</Text>
              <Text style={styles.refDetail}>
                {[ref.title, ref.company].filter(Boolean).join(' @ ')}
              </Text>
              {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
            </View>
          ))}
        </View>
      ),
    };
  }

  // Assemble sections in the user's order; hidden sections are dropped by
  // getOrderedSectionIds and the numbers below follow the rendered order.
  const sections: { title: string; body: React.ReactNode }[] = getOrderedSectionIds(data)
    .map((id) => defs[id])
    .filter((s): s is { title: string; body: React.ReactNode } => !!s);

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach(section => {
      if (section.items && section.items.length > 0) {
        sections.push({
          title: section.title,
          body: (
            <View>
              {section.items.map(item => (
                <View key={item.id} style={styles.customItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                  </View>
                  {item.subtitle ? (
                    <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                  ) : null}
                  {item.description ? (
                    <Text style={styles.customDescription}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),
        });
      }
    });
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Blueprint header */}
        {isSectionVisible(data, 'personal') && (
        <>
        {data.personalInfo.fullName ? (
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        ) : null}
        <View style={styles.rule} />
        {data.personalInfo.jobTitle ? (
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
        ) : null}
        {contact.length > 0 ? (
          <Text style={styles.contactRow}>{contact.join('   |   ')}</Text>
        ) : null}
        </>
        )}

        {/* Numbered spec-sheet sections */}
        {sections.map((s, i) => (
          <View key={s.title} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {String(i + 1).padStart(2, '0')} / {s.title}
            </Text>
            {s.body}
          </View>
        ))}
      </Page>
    </Document>
  );
}
