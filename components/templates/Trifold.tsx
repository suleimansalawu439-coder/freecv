import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  summaryWrap: {
    alignItems: 'center',
    paddingTop: 14,
    paddingHorizontal: 40,
  },
  summaryText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'center',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  colExp: {
    width: '38%',
    paddingRight: 12,
  },
  colMid: {
    width: '31%',
    paddingHorizontal: 8,
  },
  colEdu: {
    width: '31%',
    paddingLeft: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: 4,
    marginBottom: 10,
    borderBottomWidth: 2,
  },
  roleTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 1,
  },
  companyName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  dates: {
    fontSize: 7.5,
    color: '#6B7280',
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 8,
    color: '#6B7280',
    width: 8,
  },
  bulletText: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },
  expItem: {
    marginBottom: 12,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 4,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  itemTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSub: {
    fontSize: 8,
    color: '#4B5563',
  },
  itemMeta: {
    fontSize: 7.5,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDesc: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 8,
  },
});

export default function Trifold({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const titleStyle = [styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.header}>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? (
                  <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
                ) : null}
                {contactItems.length > 0 ? (
                  <Text style={styles.contact}>{contactItems.join('  ·  ')}</Text>
                ) : null}
              </View>

              {data.summary ? (
                <View style={styles.summaryWrap}>
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),
        })}

        <View style={styles.body}>
          <View style={styles.colExp}>
            {orderSections(data, {
              experience: data.experience && data.experience.length > 0 ? (
                <View style={styles.section}>
                  <Text style={titleStyle}>Experience</Text>
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.expItem}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                      <Text style={styles.dates}>{exp.startDate} – {exp.endDate}</Text>
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
                  <Text style={titleStyle}>Projects</Text>
                  {data.projects.map((proj) => (
                    <View key={proj.id}>
                      <Text style={styles.roleTitle}>{proj.name}</Text>
                      <Text style={styles.itemDesc}>{proj.description}</Text>
                    </View>
                  ))}
                </View>
              ) : null,
            })}
          </View>

          <View style={styles.colMid}>
            {orderSections(data, {
              skills: data.skills && data.skills.length > 0 ? (
                <View style={styles.section}>
                  <Text style={titleStyle}>Skills</Text>
                  <View style={styles.skillsRow}>
                    {data.skills.map((skill) => (
                      <View key={skill.id} style={[styles.skillChip, { backgroundColor: themeColor }]}>
                        <Text style={styles.skillText}>{skill.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null,

              certifications: data.showCertifications && data.certifications.length > 0 ? (
                <View style={styles.section}>
                  <Text style={titleStyle}>Certifications</Text>
                  {data.certifications.map((cert) => (
                    <View key={cert.id}>
                      <Text style={styles.itemTitle}>{cert.name}</Text>
                      <Text style={styles.itemSub}>{cert.issuer}</Text>
                      <Text style={styles.itemMeta}>{cert.date}</Text>
                    </View>
                  ))}
                </View>
              ) : null,
            },
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <Text style={titleStyle}>{section.title}</Text>
                    {section.items.map((item) => (
                      <View key={item.id}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                        {item.date ? <Text style={styles.itemSub}>{item.date}</Text> : null}
                        {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ))
            )}
          </View>

          <View style={styles.colEdu}>
            {orderSections(data, {
              education: data.education && data.education.length > 0 ? (
                <View style={styles.section}>
                  <Text style={titleStyle}>Education</Text>
                  {data.education.map((edu) => (
                    <View key={edu.id}>
                      <Text style={styles.itemTitle}>{edu.degree}</Text>
                      <Text style={styles.itemSub}>{edu.school}</Text>
                      <Text style={[styles.itemMeta, { color: themeColor }]}>{edu.graduationYear}</Text>
                    </View>
                  ))}
                </View>
              ) : null,

              references: data.showReferences && data.references.length > 0 ? (
                <View style={styles.section}>
                  <Text style={titleStyle}>References</Text>
                  {data.references.map((ref) => (
                    <View key={ref.id}>
                      <Text style={styles.itemTitle}>{ref.name}</Text>
                      <Text style={styles.itemSub}>
                        {ref.title}{ref.company ? `, ${ref.company}` : ''}
                      </Text>
                      <Text style={styles.itemMeta}>{ref.contact}</Text>
                    </View>
                  ))}
                </View>
              ) : null,
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
