import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const FOREST = '#1D4A2C';
const FOREST_DEEP = '#122E1C';
const FOREST_SOFT = '#EEF5EE';
const FOREST_LINE = '#C9DCC9';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: FOREST_DEEP,
    paddingHorizontal: 44,
    paddingTop: 36,
    paddingBottom: 30,
  },
  eyebrow: {
    fontFamily: 'Times-Roman',
    fontSize: 8,
    color: FOREST_LINE,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  jobTitle: {
    fontFamily: 'Times-Italic',
    fontSize: 12,
    color: FOREST_LINE,
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 8,
    color: '#FFFFFF',
  },
  body: {
    paddingHorizontal: 44,
    paddingVertical: 24,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionBar: {
    width: 6,
    height: 20,
    backgroundColor: FOREST,
    marginRight: 10,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    color: FOREST_DEEP,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginRight: 10,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: FOREST_LINE,
  },
  summaryBox: {
    backgroundColor: FOREST_SOFT,
    borderRadius: 6,
    padding: 12,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  expItem: {
    marginBottom: 14,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: FOREST_DEEP,
  },
  dateBadge: {
    backgroundColor: FOREST,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  dateBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  companyName: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: FOREST,
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletMark: {
    width: 12,
    fontSize: 8,
    color: FOREST,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#334155',
  },
  skillChip: {
    backgroundColor: FOREST,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontFamily: 'Times-Roman',
    fontSize: 8.5,
    color: '#FFFFFF',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: FOREST_DEEP,
  },
  schoolItalic: {
    fontFamily: 'Times-Italic',
    fontSize: 8.5,
    color: FOREST,
  },
  yearBadge: {
    backgroundColor: FOREST,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  yearBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  refCard: {
    backgroundColor: FOREST_SOFT,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHead}>
      <View style={styles.sectionBar} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Forest({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Professional Résumé</Text>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('   ·   ')}</Text>
          ) : null}
        </View>
          ),
        })}

        <View style={styles.body}>
          {orderSections(data, {
            personal: data.summary ? (
            <View style={styles.section}>
              <SectionHead title="Profile" />
              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            </View>
          ) : null,

            experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expTop}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <View style={styles.dateBadge}>
                      <Text style={styles.dateBadgeText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>◆</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          ),

            skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Skills" />
              <View style={styles.skillsWrap}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

            education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    <Text style={styles.schoolItalic}>{edu.school}</Text>
                  </View>
                  {edu.graduationYear ? (
                    <View style={styles.yearBadge}>
                      <Text style={styles.yearBadgeText}>{edu.graduationYear}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.degreeText}>
                    {proj.name}
                    {proj.link ? ` (${proj.link})` : ''}
                  </Text>
                  <Text style={styles.summaryText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.eduRow}>
                  <Text style={styles.degreeText}>
                    {cert.name}
                    {cert.issuer ? ` · ${cert.issuer}` : ''}
                  </Text>
                  {cert.date ? <Text style={styles.schoolItalic}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="References" />
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.degreeText}>{ref.name}</Text>
                  <Text style={styles.schoolItalic}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.summaryText}>{ref.contact}</Text> : null}
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
                        {item.date ? (
                          <Text style={styles.schoolItalic}>{item.date}</Text>
                        ) : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.schoolItalic}>{item.subtitle}</Text>
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
