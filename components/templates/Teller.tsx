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
    padding: 44,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 4,
    marginBottom: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
  },
  contactBlock: {
    alignItems: 'flex-end',
  },
  contactLine: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 2,
  },
  contactBold: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#0F172A',
    paddingBottom: 4,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  expItem: {
    marginBottom: 12,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateBold: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletMark: {
    width: 12,
    fontSize: 8,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#334155',
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.8,
    color: '#1E293B',
  },
  skillBold: {
    fontWeight: 'bold',
  },
  skillSep: {
    color: '#94A3B8',
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

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Teller({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={[styles.header, { borderBottomColor: themeColor }]}>
                <View>
                  {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                  {info.jobTitle ? (
                    <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
                  ) : null}
                </View>
                <View style={styles.contactBlock}>
                  {info.email ? <Text style={styles.contactLine}>{info.email}</Text> : null}
                  {info.phone ? <Text style={styles.contactBold}>{info.phone}</Text> : null}
                  {info.location ? <Text style={styles.contactLine}>{info.location}</Text> : null}
                  {info.website ? <Text style={styles.contactLine}>{info.website}</Text> : null}
                </View>
              </View>

              {data.summary ? (
                <View style={styles.section}>
                  <SectionHead title="Professional Summary" />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Professional Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expTop}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={[styles.dateBold, { color: themeColor }]}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={[styles.bulletMark, { color: themeColor }]}>›</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          ),

          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Core Competencies" />
              <Text style={styles.skillsText}>
                {data.skills.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <Text style={styles.skillBold}>{s.name}</Text>
                    {i < data.skills.length - 1 ? (
                      <Text style={styles.skillSep}>  •  </Text>
                    ) : null}
                  </React.Fragment>
                ))}
              </Text>
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Education" />
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

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Selected Projects" />
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

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Certifications & Licenses" />
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

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="References" />
              {data.references.map((ref) => (
                <View key={ref.id} style={{ marginBottom: 6 }}>
                  <Text style={styles.degreeText}>{ref.name}</Text>
                  <Text style={styles.schoolText}>
                    {ref.title}
                    {ref.company ? ` · ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.contactLine}>{ref.contact}</Text> : null}
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
      </Page>
    </Document>
  );
}
