import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    paddingTop: 26,
    paddingHorizontal: 36,
    paddingBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 6,
  },
  contact: {
    fontSize: 8.5,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  mainCol: {
    width: '64%',
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  sideCol: {
    width: '36%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
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
  skillCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 10,
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
  certName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  certDetail: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 8,
  },
  refName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 8,
  },
  customWrap: {
    paddingHorizontal: 30,
    paddingBottom: 20,
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

export default function Tandem({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const MainHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
  );
  const SideHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <View style={[styles.header, { backgroundColor: themeColor }]}>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
              {contactItems.length > 0 ? (
                <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
              ) : null}
            </View>
          ),
        })}

        <View style={styles.body}>
          <View style={styles.mainCol}>
            {orderSections(data, {
              personal: data.summary ? (
                <View style={styles.section}>
                  <MainHeader title="Profile" />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null,

              experience: data.experience && data.experience.length > 0 ? (
                <View style={styles.section}>
                  <MainHeader title="Experience" />
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
              ) : null,

              projects: data.showProjects && data.projects.length > 0 ? (
                <View style={styles.section}>
                  <MainHeader title="Projects" />
                  {data.projects.map((proj) => (
                    <View key={proj.id}>
                      <Text style={styles.projectName}>
                        {proj.name}{proj.link ? <Text style={styles.certDetail}> ({proj.link})</Text> : null}
                      </Text>
                      <Text style={styles.projectDesc}>{proj.description}</Text>
                    </View>
                  ))}
                </View>
              ) : null,
            })}
          </View>

          <View style={[styles.sideCol, { backgroundColor: withAlpha(themeColor, 0.07) }]}>
            {orderSections(data, {
              skills: data.skills && data.skills.length > 0 ? (
                <View style={styles.section}>
                  <SideHeader title="Skills" />
                  {data.skills.map((skill) => (
                    <View key={skill.id} style={styles.skillCard}>
                      <Text style={styles.skillText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              ) : null,

              education: data.education && data.education.length > 0 ? (
                <View style={styles.section}>
                  <SideHeader title="Education" />
                  {data.education.map((edu) => (
                    <View key={edu.id}>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                    </View>
                  ))}
                </View>
              ) : null,

              certifications: data.showCertifications && data.certifications.length > 0 ? (
                <View style={styles.section}>
                  <SideHeader title="Certifications" />
                  {data.certifications.map((cert) => (
                    <View key={cert.id}>
                      <Text style={styles.certName}>{cert.name}</Text>
                      <Text style={styles.certDetail}>{cert.issuer} · {cert.date}</Text>
                    </View>
                  ))}
                </View>
              ) : null,

              references: data.showReferences && data.references.length > 0 ? (
                <View style={styles.section}>
                  <SideHeader title="References" />
                  {data.references.map((ref) => (
                    <View key={ref.id}>
                      <Text style={styles.refName}>{ref.name}</Text>
                      <Text style={styles.refDetail}>
                        {ref.title}{ref.company ? `, ${ref.company}` : ''}
                      </Text>
                      <Text style={styles.refDetail}>{ref.contact}</Text>
                    </View>
                  ))}
                </View>
              ) : null,
            })}
          </View>
        </View>

        {data.customSections.length > 0 ? (
          <View style={styles.customWrap}>
            {orderSections(data, {},
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <MainHeader title={section.title} />
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
        ) : null}
      </Page>
    </Document>
  );
}
