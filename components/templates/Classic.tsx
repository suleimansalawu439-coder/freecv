import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#374151',
  },
  contactRow: {
    fontSize: 9,
    color: '#1F2937',
    textAlign: 'center',
  },
  summaryContainer: {
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    borderBottomStyle: 'solid',
    marginBottom: 10,
    paddingBottom: 3,
  },
  itemContainer: {
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  companyText: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletSymbol: {
    width: 10,
    fontSize: 10,
  },
  bulletContent: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.3,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 9,
    fontFamily: 'Times-Italic',
    color: '#6B7280',
    marginLeft: 4,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
  },
  column: {
    flex: 1,
  },
  subText: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 10,
    lineHeight: 1.3,
    marginTop: 2,
  },
});

export default function Classic({ data }: TemplateProps) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          {contactItems.length > 0 && (
            <Text style={styles.contactRow}>{contactItems.join('  |  ')}</Text>
          )}
        </View>

        {data.summary ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.itemContainer}>
                <View style={styles.rowBetween}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyText}>{exp.company}</Text>
                {exp.description
                  .split('\n')
                  .filter((line) => line.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletContent}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer}>
                <View style={styles.projectHeader}>
                  <Text style={styles.roleTitle}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={styles.projectLink}>
                      ({proj.link})
                    </Link>
                  ) : null}
                </View>
                <Text style={styles.summaryText}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.itemContainer}>
                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.roleTitle}>{edu.school}</Text>
                        <Text style={styles.subText}>{edu.degree}</Text>
                      </View>
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.column}>
            {data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.itemContainer}>
                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.roleTitle}>{cert.name}</Text>
                        <Text style={styles.subText}>{cert.issuer}</Text>
                      </View>
                      <Text style={styles.dateText}>{cert.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.itemContainer}>
                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.roleTitle}>{ref.name}</Text>
                        <Text style={styles.subText}>
                          {ref.title} at {ref.company}
                        </Text>
                      </View>
                      <Text style={styles.dateText}>{ref.contact}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {data.customSections &&
              data.customSections.map(
                (section) =>
                  section.items &&
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.section}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                          <View style={styles.rowBetween}>
                            <View>
                              <Text style={styles.roleTitle}>{item.title}</Text>
                              {item.subtitle ? (
                                <Text style={styles.subText}>{item.subtitle}</Text>
                              ) : null}
                            </View>
                            {item.date ? (
                              <Text style={styles.dateText}>{item.date}</Text>
                            ) : null}
                          </View>
                          {item.description ? (
                            <Text style={styles.descriptionText}>{item.description}</Text>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  )
              )}

            {data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text style={styles.skillsText}>
                  {data.skills.map((s) => s.name).join(' • ')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}