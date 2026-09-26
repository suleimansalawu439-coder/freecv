import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

// Waterfall indents in points, one step per section
const INDENTS = [0, 18, 36, 54, 72, 90, 108];

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
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  step: {
    height: 5,
    borderRadius: 3,
    marginRight: 4,
  },
  waterfall: {
    position: 'relative',
  },
  guideLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTick: {
    width: 22,
    height: 3,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
  },
  expItem: {
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
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
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
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduLine: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 10,
  },
  eduYear: {
    fontSize: 9,
    fontWeight: 'bold',
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
  certText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  certDetail: {
    fontSize: 9,
    color: '#4B5563',
    fontWeight: 'normal',
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

export default function Cascade({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.headerTick, { backgroundColor: themeColor }]} />
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
    </View>
  );

  const stepWidths = [28, 25, 22, 19, 16, 13, 10];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {orderSections(data, {
            personal: (
              <>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? (
                  <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
                ) : null}
                {contactItems.length > 0 ? (
                  <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
                ) : null}
                <View style={styles.stepRow}>
                  {stepWidths.map((w, i) => (
                    <View
                      key={i}
                      style={[styles.step, { width: w, backgroundColor: themeColor, opacity: 1 - i * 0.12 }]}
                    />
                  ))}
                </View>
              </>
            ),
          })}

          <View style={styles.waterfall}>
            <View style={[styles.guideLine, { backgroundColor: themeColor, opacity: 0.25 }]} />

            {orderSections(data, {
              personal: data.summary && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
                    <SectionHeader title="Profile" />
                    <Text style={styles.summaryText}>{data.summary}</Text>
                  </View>
                )),

              experience: data.experience && data.experience.length > 0 && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
                    <SectionHeader title="Experience" />
                    {data.experience.map((exp) => (
                      <View key={exp.id} style={styles.expItem}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.roleTitle}>{exp.role}</Text>
                          <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                        </View>
                        <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
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
                )),

              skills: data.skills && data.skills.length > 0 && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
                    <SectionHeader title="Skills" />
                    <View style={styles.skillsRow}>
                      {data.skills.map((skill) => (
                        <View key={skill.id} style={[styles.skillChip, { borderColor: themeColor }]}>
                          <Text style={[styles.skillText, { color: themeColor }]}>{skill.name}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )),

              education: data.education && data.education.length > 0 && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
                    <SectionHeader title="Education" />
                    {data.education.map((edu) => (
                      <View key={edu.id}>
                        <Text style={styles.eduDegree}>{edu.degree}</Text>
                        <Text style={styles.eduLine}>
                          {edu.school} · <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                        </Text>
                      </View>
                    ))}
                  </View>
                )),

              projects: data.showProjects && data.projects.length > 0 && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
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
                )),

              certifications: data.showCertifications && data.certifications.length > 0 && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
                    <SectionHeader title="Certifications" />
                    {data.certifications.map((cert) => (
                      <Text key={cert.id} style={styles.certText}>
                        {cert.name} <Text style={styles.certDetail}>— {cert.issuer} · {cert.date}</Text>
                      </Text>
                    ))}
                  </View>
                )),

              references: data.showReferences && data.references.length > 0 && ((index: number) => (
                  <View style={[styles.section, { paddingLeft: INDENTS[index] }]}>
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
                )),
            },
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section, si) => (
                  <View key={section.id} style={[styles.section, { paddingLeft: INDENTS[Math.min(6, 4 + si)] }]}>
                    <SectionHeader title={section.title} />
                    {section.items.map((item) => (
                      <View key={item.id}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                        </View>
                        {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                        {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
