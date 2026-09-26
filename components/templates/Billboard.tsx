import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 0,
  },
  header: {
    paddingHorizontal: 40,
    paddingTop: 46,
    paddingBottom: 34,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 1.05,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  headerContact: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.85)',
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    color: '#9CA3AF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 6,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#4B5563',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 3,
  },
  timelineBody: {
    flex: 1,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#6B7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#4B5563',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 12,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 7,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#6B7280',
  },
});

export default function Billboard({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactLine = [info.email, info.phone, info.location, info.website]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <View style={[styles.header, { backgroundColor: themeColor }]}>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? <Text style={styles.headerTitle}>{info.jobTitle}</Text> : null}
              {contactLine ? <Text style={styles.headerContact}>{contactLine}</Text> : null}
            </View>
          ),
        })}

        <View style={styles.body}>
          {orderSections(data, {
            personal: data.summary ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            ) : null,

            skills: data.skills && data.skills.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.pillRow}>
                  {data.skills.map((s) => (
                    <View key={s.id} style={styles.pill}>
                      <Text style={styles.pillText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null,

            experience: data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.timelineItem}>
                    <View style={[styles.timelineDot, { backgroundColor: themeColor }]} />
                    <View style={styles.timelineBody}>
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{exp.role}</Text>
                        <Text style={styles.dateText}>
                          {exp.startDate} – {exp.endDate}
                        </Text>
                      </View>
                      <Text style={[styles.companyText, { color: themeColor }]}>{exp.company}</Text>
                      {exp.description ? (
                        <View>
                          {exp.description
                            .split(/\n|\r?\n/)
                            .filter(Boolean)
                            .map((line, i) => (
                              <View key={i} style={styles.bulletRow}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.bulletText}>{line}</Text>
                              </View>
                            ))}
                        </View>
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            ) : null,

            education: data.education && data.education.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduRow}>
                    <View>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                    </View>
                    {edu.graduationYear ? (
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((p) => (
                  <View key={p.id} style={styles.projectItem}>
                    <Text style={styles.projectName}>{p.name}</Text>
                    <Text style={styles.projectDesc}>{p.description}</Text>
                  </View>
                ))}
              </View>
            ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((c) => (
                  <View key={c.id} style={styles.certRow}>
                    <Text style={styles.certName}>
                      {c.name}
                      {c.issuer ? ` — ${c.issuer}` : ''}
                    </Text>
                    {c.date ? <Text style={styles.dateText}>{c.date}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>References</Text>
                <View style={styles.refGrid}>
                  {data.references.map((r) => (
                    <View key={r.id} style={styles.refCard}>
                      <Text style={styles.refName}>{r.name}</Text>
                      <Text style={styles.refDetail}>
                        {r.title}
                        {r.company ? ` · ${r.company}` : ''}
                      </Text>
                      {r.contact ? <Text style={styles.refDetail}>{r.contact}</Text> : null}
                    </View>
                  ))}
                </View>
              </View>
            ) : null,
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.projectItem}>
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.bulletText}>{item.subtitle}</Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.summaryText}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
