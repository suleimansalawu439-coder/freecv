import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 54,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fullName: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  cvSubtitle: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    marginBottom: 6,
    textAlign: 'center',
  },
  metaContainer: {
    alignItems: 'center',
    gap: 2,
  },
  metaText: {
    fontSize: 9,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 10,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gridLeft: {
    width: 90,
    fontSize: 10,
  },
  gridRight: {
    flex: 1,
  },
  indentBlock: {
    marginLeft: 90,
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  itemSubtitle: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 12,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  grayText: {
    color: '#4B5563',
    fontFamily: 'Times-Roman',
  },
  linkText: {
    fontSize: 8.5,
    color: '#1E40AF',
    fontFamily: 'Times-Roman',
  },
});

export default function Academic({ data }: TemplateProps) {
  const contactLine1 = [data.personalInfo.email, data.personalInfo.phone].filter(Boolean).join('  |  ');
  const contactLine2 = [data.personalInfo.location, data.personalInfo.website].filter(Boolean).join('  |  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          <Text style={styles.cvSubtitle}>Curriculum Vitae</Text>
          <View style={styles.metaContainer}>
            {data.personalInfo.jobTitle ? (
              <Text style={styles.metaText}>{data.personalInfo.jobTitle}</Text>
            ) : null}
            {contactLine1 ? <Text style={styles.metaText}>{contactLine1}</Text> : null}
            {contactLine2 ? <Text style={styles.metaText}>{contactLine2}</Text> : null}
          </View>
        </View>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.gridRow}>
                <Text style={styles.gridLeft}>{edu.graduationYear}</Text>
                <View style={styles.gridRight}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={{ fontSize: 10 }}>{edu.school}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic & Professional Appointments</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.gridRow}>
                <Text style={styles.gridLeft}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <View style={styles.gridRight}>
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  {exp.description
                    ? exp.description
                        .split('\n')
                        .filter((line) => line.trim())
                        .map((line, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>{line.trim()}</Text>
                          </View>
                        ))
                    : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Research & Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research & Projects</Text>
            <View style={styles.indentBlock}>
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.itemTitle}>
                    {proj.name}{' '}
                    {proj.link ? <Text style={styles.linkText}>[{proj.link}]</Text> : null}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{proj.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications & Awards */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications & Awards</Text>
            <View style={styles.indentBlock}>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.flexBetween}>
                  <Text style={styles.itemTitle}>
                    {cert.name}{' '}
                    <Text style={styles.grayText}>({cert.issuer})</Text>
                  </Text>
                  <Text style={{ fontSize: 10 }}>{cert.date}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.indentBlock}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.flexBetween}>
                  <Text style={styles.itemTitle}>
                    {ref.name}{' '}
                    <Text style={styles.grayText}>
                      ({ref.title} at {ref.company})
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 10 }}>{ref.contact}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 6 }}>
                      <View style={styles.flexBetween}>
                        <View>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          {item.subtitle ? (
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                          ) : null}
                        </View>
                        {item.date ? (
                          <Text style={styles.itemTitle}>{item.date}</Text>
                        ) : null}
                      </View>
                      {item.description ? (
                        <Text style={{ fontSize: 10, marginTop: 2 }}>
                          {item.description}
                        </Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              )
          )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Proficiencies</Text>
            <Text style={[styles.indentBlock, { fontSize: 10 }]}>
              {data.skills.map((s) => s.name).join(', ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
}