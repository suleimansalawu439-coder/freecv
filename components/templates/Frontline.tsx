import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';
const DARK = '#0F172A';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    paddingHorizontal: 44,
    paddingTop: 40,
    paddingBottom: 26,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 6,
  },
  contactLine: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  body: {
    paddingHorizontal: 44,
    paddingVertical: 24,
  },
  sectionBar: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    lineHeight: 1.5,
    color: '#1E293B',
    borderLeftWidth: 4,
    paddingLeft: 10,
  },
  expCard: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  expCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DARK,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  expRole: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  expDates: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  expBody: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  checkMark: {
    width: 12,
    fontSize: 9,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#334155',
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: '2%',
    marginBottom: 6,
  },
  skillMark: {
    fontSize: 8,
    fontWeight: 'bold',
    marginRight: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#475569',
  },
  yearBold: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={[styles.sectionBar, { backgroundColor: themeColor }]}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Frontline({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('   |   ')}</Text>
          ) : null}
        </View>
          ),
        })}

        <View style={styles.body}>
          {orderSections(data, {
            personal: data.summary ? (
            <View style={styles.section}>
              <SectionHead title="Mission Statement" themeColor={themeColor} />
              <Text style={[styles.summaryText, { borderLeftColor: themeColor }]}>
                {data.summary}
              </Text>
            </View>
          ) : null,

            experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Service Record" themeColor={themeColor} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expCard}>
                  <View style={styles.expCardTop}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expDates}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                  <View style={styles.expBody}>
                    <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.checkMark}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                </View>
              ))}
            </View>
          ),

            skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Key Strengths" themeColor={themeColor} />
              <View style={styles.skillGrid}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillCell}>
                    <Text style={[styles.skillMark, { color: themeColor }]}>•</Text>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

            education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Training & Education" themeColor={themeColor} />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    <Text style={styles.schoolText}>{edu.school}</Text>
                  </View>
                  {edu.graduationYear ? (
                    <Text style={styles.yearBold}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Certifications" themeColor={themeColor} />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.eduRow}>
                  <Text style={styles.degreeText}>
                    {cert.name}
                    {cert.issuer ? ` · ${cert.issuer}` : ''}
                  </Text>
                  {cert.date ? <Text style={styles.yearBold}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Operations & Projects" themeColor={themeColor} />
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.degreeText}>
                    {proj.name}
                    {proj.link ? ` (${proj.link})` : ''}
                  </Text>
                  <Text style={styles.schoolText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="References" themeColor={themeColor} />
              {data.references.map((ref) => (
                <View key={ref.id} style={{ marginBottom: 6 }}>
                  <Text style={styles.degreeText}>{ref.name}</Text>
                  <Text style={styles.schoolText}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.schoolText}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          ),
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id} style={styles.section}>
                  <SectionHead title={section.title} themeColor={themeColor} />
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      <View style={styles.eduRow}>
                        <Text style={styles.degreeText}>{item.title}</Text>
                        {item.date ? <Text style={styles.yearBold}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={[styles.schoolText, { fontStyle: 'italic' }]}>
                          {item.subtitle}
                        </Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.schoolText}>{item.description}</Text>
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
