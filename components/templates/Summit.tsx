import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  headerBand: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 36,
    paddingVertical: 32,
  },
  accentBar: {
    width: 48,
    height: 5,
    marginBottom: 14,
  },
  headerName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 1,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#D1D5DB',
    marginRight: 14,
    marginBottom: 3,
  },
  body: {
    paddingHorizontal: 36,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 3,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
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
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  experienceItem: {
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 9,
    paddingVertical: 4,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  projectItem: {
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSub: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  itemDesc: {
    fontSize: 8.5,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.4,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8,
    color: '#6B7280',
  },
});

export default function Summit({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const sectionHeader = (title: string) => (
    <Text style={[styles.sectionHeader, { color: themeColor, borderLeftColor: themeColor }]}>
      {title}
    </Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Dark header band */}
        <View style={styles.headerBand}>
          <View style={[styles.accentBar, { backgroundColor: themeColor }]} />
          {info.fullName ? <Text style={styles.headerName}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.headerTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 && (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Body */}
        <View style={styles.body}>
          {data.summary ? (
            <View style={styles.section}>
              {sectionHeader('Summary')}
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              {sectionHeader('Experience')}
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                  </View>
                  <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                  {exp.description ? (
                    <View>
                      {exp.description.split(/\n|\r\n/).filter((l) => l.trim()).map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              {sectionHeader('Education')}
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
              ))}
            </View>
          )}

          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              {sectionHeader('Skills')}
              <View style={styles.pillsRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.pill}>
                    <Text style={styles.pillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              {sectionHeader('Projects')}
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.itemDesc}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              {sectionHeader('Certifications')}
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.projectItem}>
                  <View style={styles.itemHeaderRow}>
                    <View>
                      <Text style={styles.itemTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.itemSub}>{cert.issuer}</Text> : null}
                    </View>
                    {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.customSections &&
            data.customSections.length > 0 &&
            data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  {sectionHeader(section.title)}
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.projectItem}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                      {item.description ? (
                        <Text style={styles.itemDesc}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null
            )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section} wrap={false}>
              {sectionHeader('References')}
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                    {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
