import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  container: {
    paddingTop: 32,
    paddingHorizontal: 40,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  railMarks: {
    marginRight: 14,
  },
  railMark: {
    width: 4,
    height: 26,
    marginBottom: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 24,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
    paddingLeft: 12,
    borderLeftWidth: 4,
  },
  ladderWrap: {
    flexDirection: 'row',
  },
  rails: {
    flexDirection: 'row',
    marginRight: 16,
  },
  rail: {
    width: 3,
    borderRadius: 2,
    marginRight: 6,
  },
  rungs: {
    flex: 1,
  },
  rung: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateBadge: {
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  dateBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: '#6B7280',
    width: 9,
  },
  bulletText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },
  skillsInline: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.7,
  },
  eduRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eduDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  eduMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
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
    color: '#111827',
  },
  certDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCard: {
    width: '50%',
    paddingRight: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  customSubtitle: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
  },
});

export default function Ladder({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <View style={styles.railMarks}>
              <View style={[styles.railMark, { backgroundColor: themeColor }]} />
              <View style={[styles.railMark, { backgroundColor: themeColor, opacity: 0.6 }]} />
              <View style={[styles.railMark, { backgroundColor: themeColor, opacity: 0.3 }]} />
            </View>
            <View>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
              ) : null}
            </View>
          </View>
          {contactItems.length > 0 ? (
            <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
          ) : null}

          {data.summary ? (
            <View style={styles.section}>
              <SectionHeader title="Profile" />
              <Text style={[styles.summaryText, { borderLeftColor: themeColor }]}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Career Ladder" />
              <View style={styles.ladderWrap}>
                <View style={styles.rails}>
                  <View style={[styles.rail, { backgroundColor: themeColor }]} />
                  <View style={[styles.rail, { backgroundColor: themeColor, opacity: 0.35 }]} />
                </View>
                <View style={styles.rungs}>
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.rung}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{exp.role}</Text>
                        <View style={[styles.dateBadge, { backgroundColor: themeColor }]}>
                          <Text style={styles.dateBadgeText}>{exp.startDate} – {exp.endDate}</Text>
                        </View>
                      </View>
                      <Text style={styles.companyName}>{exp.company}</Text>
                      {exp.description ? (
                        <View>
                          {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
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
            </View>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Skills" />
              <Text style={styles.skillsInline}>
                {data.skills.map((s) => s.name).join('  ·  ')}
              </Text>
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View style={[styles.eduDot, { backgroundColor: themeColor }]} />
                  <View style={styles.eduMain}>
                    <View>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                    </View>
                    <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {data.showProjects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id}>
                  <Text style={styles.projectName}>
                    {proj.name}{proj.link ? <Text style={styles.certDetail}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name} <Text style={styles.certDetail}>— {cert.issuer}</Text>
                  </Text>
                  <Text style={styles.certDetail}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="References" />
              <View style={styles.refRow}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    <Text style={styles.refDetail}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.customSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <SectionHeader title={section.title} />
              {section.items.map((item) => (
                <View key={item.id}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.certDetail}>{item.date}</Text> : null}
                  </View>
                  {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                  {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
