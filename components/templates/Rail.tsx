import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  rail: {
    width: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 36,
    paddingVertical: 32,
  },
  headerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 1,
  },
  headerTitle: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6B7280',
    marginRight: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  timeline: {
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 16,
    marginLeft: 4,
  },
  timelineItem: {
    marginBottom: 14,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    left: -21,
    top: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 4,
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

export default function Rail({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.rail, { backgroundColor: themeColor }]} />
        <View style={styles.content}>
          {info.fullName ? <Text style={styles.headerName}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.headerTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 && (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>
                  {item}{i < contactItems.length - 1 ? '   •' : ''}
                </Text>
              ))}
            </View>
          )}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.timeline}>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.timelineItem}>
                    <View style={[styles.dot, { backgroundColor: themeColor }]} />
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    <Text style={styles.companyName}>{exp.company}</Text>
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
            </View>
          )}

          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
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
              <Text style={styles.sectionTitle}>Skills</Text>
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
              <Text style={styles.sectionTitle}>Projects</Text>
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
              <Text style={styles.sectionTitle}>Certifications</Text>
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
                  <Text style={styles.sectionTitle}>{section.title}</Text>
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
              <Text style={styles.sectionTitle}>References</Text>
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
