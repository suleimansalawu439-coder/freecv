import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  jobTitle: {
    fontSize: 10,
    marginTop: 4,
  },
  contactRow: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 6,
  },
  body: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  colLeft: {
    width: '50%',
    paddingRight: 14,
  },
  colRight: {
    width: '50%',
    paddingLeft: 14,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#111827',
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  expItem: {
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 7.5,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: 3,
  },
  skillDot: {
    fontSize: 8,
    marginRight: 3,
  },
  skillText: {
    fontSize: 8.5,
    color: '#374151',
  },
  eduItem: {
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
  metaText: {
    fontSize: 7.5,
    color: '#6B7280',
    marginTop: 1,
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 7.5,
    color: '#6B7280',
  },
  projectDesc: {
    fontSize: 8.5,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.4,
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
});

export default function Capsule({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const SectionHead = ({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <View style={styles.header}>
              <Text style={styles.name}>{pi.fullName}</Text>
              {pi.jobTitle ? <Text style={[styles.jobTitle, { color: themeColor }]}>{pi.jobTitle}</Text> : null}
              {contacts.length > 0 ? <Text style={styles.contactRow}>{contacts.join(' · ')}</Text> : null}
            </View>
          ),
        })}

        <View style={styles.body}>
          <View style={styles.colLeft}>
            {orderSections(data, {
              experience: data.experience && data.experience.length > 0 && (
                <View style={styles.section}>
                  <SectionHead title="Experience" />
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.expItem}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{exp.role}</Text>
                        {(exp.startDate || exp.endDate) ? (
                          <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                        ) : null}
                      </View>
                      {exp.company ? (
                        <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                      ) : null}
                      {exp.description ? (
                        <View>
                          {exp.description
                            .split(/\n|\r\n/)
                            .filter((l) => l.trim())
                            .map((line, i) => (
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
              ),

              projects: data.showProjects && data.projects && data.projects.length > 0 && (
                <View style={styles.section}>
                  <SectionHead title="Projects" />
                  {data.projects.map((p) => (
                    <View key={p.id} style={styles.eduItem}>
                      <Text style={styles.projectName}>{p.name}</Text>
                      {p.link ? <Text style={styles.projectLink}>{p.link}</Text> : null}
                      {p.description ? <Text style={styles.projectDesc}>{p.description}</Text> : null}
                    </View>
                  ))}
                </View>
              ),
            },
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <SectionHead title={section.title} />
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.customItem}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                        </View>
                        {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                        {item.description ? <Text style={styles.projectDesc}>{item.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ))
            )}
          </View>

          <View style={styles.colRight}>
            {orderSections(data, {
              personal: data.summary ? (
                <View style={styles.section}>
                  <SectionHead title="Summary" />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null,

              skills: data.skills && data.skills.length > 0 && (
                <View style={styles.section}>
                  <SectionHead title="Skills" />
                  <View style={styles.skillsGrid}>
                    {data.skills.map((s) => (
                      <View key={s.id} style={styles.skillCell}>
                        <Text style={[styles.skillDot, { color: themeColor }]}>•</Text>
                        <Text style={styles.skillText}>{s.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ),

              education: data.education && data.education.length > 0 && (
                <View style={styles.section}>
                  <SectionHead title="Education" />
                  {data.education.map((edu) => (
                    <View key={edu.id} style={styles.eduItem}>
                      <Text style={styles.degreeText}>{edu.degree}</Text>
                      {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
                      {edu.graduationYear ? <Text style={styles.metaText}>{edu.graduationYear}</Text> : null}
                    </View>
                  ))}
                </View>
              ),

              certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
                <View style={styles.section}>
                  <SectionHead title="Certifications" />
                  {data.certifications.map((c) => (
                    <View key={c.id} style={styles.eduItem}>
                      <Text style={styles.degreeText}>{c.name}</Text>
                      {(c.issuer || c.date) ? (
                        <Text style={styles.metaText}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ),

              references: data.showReferences && data.references && data.references.length > 0 && (
                <View style={styles.section}>
                  <SectionHead title="References" />
                  {data.references.map((r) => (
                    <View key={r.id} style={styles.eduItem}>
                      <Text style={styles.degreeText}>{r.name}</Text>
                      {(r.title || r.company) ? (
                        <Text style={styles.schoolText}>{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</Text>
                      ) : null}
                      {r.contact ? <Text style={styles.metaText}>{r.contact}</Text> : null}
                    </View>
                  ))}
                </View>
              ),
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
