import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

function tint(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    padding: 44,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  contactRow: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 8,
  },
  header: {
    marginBottom: 20,
  },
  block: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  blockTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  bar1: {
    width: 70,
    height: 4,
    marginTop: 6,
  },
  bar2: {
    width: 40,
    height: 4,
    marginTop: 4,
    marginLeft: 30,
    opacity: 0.4,
  },
  blockBody: {
    marginTop: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
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
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
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
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4B5563',
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
    fontSize: 9,
    color: '#4B5563',
  },
  gradYearText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    marginTop: 2,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 8.5,
    fontWeight: 'bold',
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
    fontSize: 9,
    color: '#4B5563',
  },
  certDate: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
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
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 3,
    lineHeight: 1.5,
  },
});

function dateRange(startDate?: string, endDate?: string): string | null {
  const parts = [startDate, endDate].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(' \u2014 ') : null;
}

export default function Collage({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {orderSections(data, {
          personal: (
            <View style={styles.header}>
              {data.personalInfo.fullName ? (
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              ) : null}
              {data.personalInfo.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>
                  {data.personalInfo.jobTitle}
                </Text>
              ) : null}
              {contact.length > 0 ? (
                <Text style={styles.contactRow}>{contact.join('   \u2022   ')}</Text>
              ) : null}
            </View>
          ),
        })}

        {/* Layered tint blocks with alternating horizontal offset */}
        {orderSections(
          data,
          {
            personal: data.summary ? ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>Summary</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              </View>
            )) : null,

            experience: data.experience && data.experience.length > 0 && ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>Experience</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <View>
                    {data.experience.map(exp => (
                      <View key={exp.id} style={styles.experienceItem}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.roleTitle}>{exp.role}</Text>
                          {dateRange(exp.startDate, exp.endDate) ? (
                            <Text style={styles.dateText}>{dateRange(exp.startDate, exp.endDate)}</Text>
                          ) : null}
                        </View>
                        {exp.company ? (
                          <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                        ) : null}
                        {exp.description ? (
                          <View>
                            {exp.description
                              .split(/\n|\r?\n/)
                              .filter(Boolean)
                              .map((line, i) => (
                                <View key={i} style={styles.bulletRow}>
                                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                                  <Text style={styles.bulletText}>{line.trim()}</Text>
                                </View>
                              ))}
                          </View>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )),

            education: data.education && data.education.length > 0 && ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>Education</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <View>
                    {data.education.map(edu => (
                      <View key={edu.id} style={styles.educationItem}>
                        <Text style={styles.degreeText}>{edu.degree}</Text>
                        <Text style={styles.schoolText}>{edu.school}</Text>
                        {edu.graduationYear ? (
                          <Text style={[styles.gradYearText, { color: themeColor }]}>
                            {edu.graduationYear}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )),

            skills: data.skills && data.skills.length > 0 && ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>Skills</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <View style={styles.chipsWrap}>
                    {data.skills.map(skill => (
                      <View key={skill.id} style={styles.chip}>
                        <Text style={[styles.chipText, { color: themeColor }]}>{skill.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )),

            projects: data.showProjects && data.projects && data.projects.length > 0 && ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>Projects</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <View>
                    {data.projects.map(project => (
                      <View key={project.id} style={styles.experienceItem}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.roleTitle}>{project.name}</Text>
                          {project.link ? (
                            <Text style={[styles.dateText, { color: themeColor }]}>
                              {project.link}
                            </Text>
                          ) : null}
                        </View>
                        {project.description ? (
                          <Text style={styles.summaryText}>{project.description}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>Certifications</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <View>
                    {data.certifications.map(cert => (
                      <View key={cert.id} style={styles.certItem}>
                        <View>
                          <Text style={styles.certName}>{cert.name}</Text>
                          {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
                        </View>
                        {cert.date ? (
                          <Text style={[styles.certDate, { color: themeColor }]}>{cert.date}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )),

            references: data.showReferences && data.references && data.references.length > 0 && ((i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>References</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
                  <View style={styles.refGrid}>
                    {data.references.map(ref => (
                      <View key={ref.id} style={styles.refCard}>
                        <Text style={styles.refName}>{ref.name}</Text>
                        <Text style={styles.refDetail}>
                          {[ref.title, ref.company].filter(Boolean).join(' \u00B7 ')}
                        </Text>
                        {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )),
          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (i) => (
              <View
                style={[
                  styles.block,
                  {
                    backgroundColor: tint(themeColor, 0.07),
                    marginLeft: i % 2 === 0 ? 0 : 18,
                    marginRight: i % 2 === 0 ? 18 : 0,
                  },
                ]}
              >
                <Text style={styles.blockTitle}>{section.title}</Text>
                <View style={[styles.bar1, { backgroundColor: themeColor }]} />
                <View style={[styles.bar2, { backgroundColor: themeColor }]} />
                <View style={styles.blockBody}>
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
                </View>
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
