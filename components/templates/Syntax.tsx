import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  namePeriod: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    marginBottom: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
    marginBottom: 10,
  },
  sectionHeaderPeriod: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 10,
  },
  bulletDot: {
    fontSize: 9.5,
    color: '#9CA3AF',
    width: 10,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
    flex: 1,
  },
  experienceItem: {
    marginBottom: 14,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    fontFamily: 'Courier',
    fontSize: 8.5,
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
  },
  educationItem: {
    marginBottom: 10,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  certMeta: {
    fontSize: 9.5,
    color: '#6B7280',
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
});

export default function Syntax({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const header = (title: string) => (
    <Text style={styles.sectionHeader}>
      {title}
      <Text style={[styles.sectionHeaderPeriod, { color: themeColor }]}>.</Text>
    </Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <Text style={styles.name}>
                {info.fullName}
                <Text style={[styles.namePeriod, { color: themeColor }]}>.</Text>
              </Text>
              {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
              {contactItems.length > 0 ? (
                <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
              ) : null}

              {data.summary ? (
                <View style={styles.section}>
                  {header('Profile')}
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              {header('Experience')}
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} — {exp.endDate}
                    </Text>
                  </View>
                  <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                  {exp.description
                    ? exp.description
                        .split(/\n|\r?\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>{line}</Text>
                          </View>
                        ))
                    : null}
                </View>
              ))}
            </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              {header('Skills')}
              <View style={styles.skillsWrap}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillChip}>
                    `{skill.name}`
                  </Text>
                ))}
              </View>
            </View>
          ) : null,

          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              {header('Education')}
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.eduRow}>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  </View>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
              ))}
            </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              {header('Projects')}
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>
                    {proj.name}
                    {proj.link ? <Text style={styles.certMeta}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={styles.bodyText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              {header('Certifications')}
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name}
                    {cert.issuer ? <Text style={styles.certMeta}> — {cert.issuer}</Text> : null}
                  </Text>
                  <Text style={styles.dateText}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              {header('References')}
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refItem}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                {header(section.title)}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.projectItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.schoolText}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.bodyText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
