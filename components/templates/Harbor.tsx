import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  sidebar: {
    width: '30%',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 10.5,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 28,
  },
  contactItem: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
  },
  contactGroup: {
    marginBottom: 32,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 28,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 6,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  customMeta: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  refDetail: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 8,
  },
  main: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  section: {
    marginBottom: 22,
  },
  mainSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 18,
  },
  timelineItem: {
    marginBottom: 20,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -24,
    top: 3,
    width: 10,
    height: 10,
    borderRadius: 5,
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
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
  projectItem: {
    marginBottom: 12,
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
    fontSize: 9,
    color: '#6B7280',
  },
});

export default function Harbor({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { backgroundColor: themeColor }]}>
          {orderSections(data, {
            personal: (
              <>
          <Text style={styles.name}>{info.fullName}</Text>

          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}

          <View style={styles.contactGroup}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>
              </>
            ),

            skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              <View style={styles.pillsWrap}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.pill}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null,
            },
            (data.customSections || [])
              .map((section) => (
              <View key={section.id} style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    <Text style={styles.customMeta}>
                      {item.subtitle}
                      {item.date ? ` · ${item.date}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
              ))
          )}
        </View>

        <View style={styles.main}>
          {orderSections(data, {
            personal: data.summary ? (
            <View style={styles.section}>
              <Text style={styles.mainSectionTitle}>Profile</Text>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          ) : null,

            experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.mainSectionTitle}>Experience</Text>
              <View style={styles.timeline}>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.timelineItem}>
                    <View style={[styles.timelineDot, { backgroundColor: themeColor }]} />
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
            </View>
          ) : null,

            education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.mainSectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    <Text style={styles.schoolText}>{edu.school}</Text>
                  </View>
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.mainSectionTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.roleTitle}>
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
              <Text style={styles.mainSectionTitle}>Certifications</Text>
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
          })}
        </View>
      </Page>
    </Document>
  );
}
