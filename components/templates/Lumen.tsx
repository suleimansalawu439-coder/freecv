import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

// Glow is simulated in react-pdf with very light tinted chips (boxShadow is not supported).
const CHIP_BG = '#F8FAFC';
const CHIP_BORDER = '#E9EEF5';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 56,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.6,
  },
  contactRow: {
    fontSize: 8.5,
    color: '#94A3B8',
  },
  contactLink: {
    fontSize: 8.5,
    textDecoration: 'none',
  },
  section: {
    marginBottom: 24,
  },
  sectionChip: {
    alignSelf: 'flex-start',
    backgroundColor: CHIP_BG,
    borderWidth: 1,
    borderColor: CHIP_BORDER,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionChipText: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
  },
  summaryText: {
    fontSize: 10.5,
    lineHeight: 1.7,
    color: '#64748B',
  },
  experienceItem: {
    marginBottom: 16,
    paddingBottom: 16,
  },
  experienceItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
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
    color: '#0F172A',
  },
  dateText: {
    fontSize: 8,
    color: '#94A3B8',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#CBD5E1',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#475569',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CHIP_BORDER,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 9,
    color: '#64748B',
  },
  gradYearText: {
    fontSize: 8,
    color: '#94A3B8',
    marginTop: 1,
  },
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  certMeta: {
    fontSize: 8.5,
    color: '#64748B',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  projectLink: {
    fontSize: 8.5,
    textDecoration: 'none',
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#475569',
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 10,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  refTitle: {
    fontSize: 8.5,
    color: '#64748B',
    marginBottom: 1,
  },
  refContact: {
    fontSize: 8,
    color: '#94A3B8',
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#64748B',
  },
  customDescription: {
    fontSize: 9,
    color: '#475569',
    marginTop: 2,
    lineHeight: 1.45,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
});

export default function Lumen({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contactItems = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {(contactItems.length > 0 || data.personalInfo.website) && (
            <Text style={styles.contactRow}>
              {contactItems.join('   ')}
              {data.personalInfo.website ? (
                <Link style={[styles.contactLink, { color: themeColor }]} src={data.personalInfo.website}>
                  {contactItems.length > 0 ? '   ' : ''}{data.personalInfo.website}
                </Link>
              ) : null}
            </Text>
          )}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>Summary</Text>
            </View>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>Experience</Text>
            </View>
            {data.experience.map((exp, idx) => (
              <View
                key={exp.id}
                style={
                  idx === data.experience.length - 1
                    ? [styles.experienceItem, styles.experienceItemLast]
                    : styles.experienceItem
                }
              >
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
                {idx < data.experience.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>Education</Text>
            </View>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>{edu.school}</Text>
                {edu.graduationYear ? (
                  <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>Skills</Text>
            </View>
            <View style={styles.skillsRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillChip}>
                  <Text style={[styles.skillText, { color: themeColor }]}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>Certifications</Text>
            </View>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                {(cert.issuer || cert.date) && (
                  <Text style={styles.certMeta}>
                    {[cert.issuer, cert.date].filter(Boolean).join('  •  ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>Projects</Text>
            </View>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.link ? (
                  <Link style={[styles.projectLink, { color: themeColor }]} src={proj.link}>
                    {proj.link}
                  </Link>
                ) : null}
                {proj.description ? (
                  <Text style={styles.projectDescription}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionChip}>
              <Text style={[styles.sectionChipText, { color: themeColor }]}>References</Text>
            </View>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>{ref.title}{ref.company ? `, ${ref.company}` : ''}</Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom sections */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <View style={styles.sectionChip}>
                  <Text style={[styles.sectionChipText, { color: themeColor }]}>{section.title}</Text>
                </View>
                {section.items.map((item) => (
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
            ) : null
          )}
      </Page>
    </Document>
  );
}
