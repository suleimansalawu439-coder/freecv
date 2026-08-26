import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    backgroundColor: '#FFFFFF',
    fontSize: 10,
    color: '#000000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  fullName: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Times-Italic',
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 9,
    color: '#374151',
  },
  abstractSection: {
    marginBottom: 20,
  },
  abstractTitle: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  abstractText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    textAlign: 'justify',
    paddingHorizontal: 24,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  expItem: {
    marginBottom: 12,
  },
  expRole: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  expCompanyDate: {
    fontSize: 9.5,
    fontFamily: 'Times-Italic',
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.35,
    marginTop: 4,
    textAlign: 'justify',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  eduSchool: {
    fontSize: 9.5,
  },
  skillsList: {
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    fontSize: 9.5,
    flex: 1,
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  refTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Italic',
    marginBottom: 1,
  },
  refContact: {
    fontSize: 9,
  },
  customSectionItem: {
    marginBottom: 12,
  },
  customSectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 8,
  },
  customItem: {
    marginBottom: 6,
  },
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customItemTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
  },
  customItemSubtitle: {
    fontSize: 9,
    fontFamily: 'Times-Italic',
  },
  customItemDate: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
  },
  customItemDesc: {
    fontSize: 9,
    marginTop: 2,
  },
});

export default function AcademicJournal({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.email}
            {data.personalInfo.phone ? ` • ${data.personalInfo.phone}` : ''}
            {data.personalInfo.location ? ` • ${data.personalInfo.location}` : ''}
          </Text>
        </View>

        {data.summary ? (
          <View style={styles.abstractSection}>
            <Text style={styles.abstractTitle}>Abstract</Text>
            <Text style={styles.abstractText}>{data.summary}</Text>
          </View>
        ) : null}

        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>I. Professional Appointments</Text></View>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expCompanyDate}>{exp.company} ({exp.startDate} - {exp.endDate})</Text>
                    {exp.description ? (
                      <Text style={styles.expDesc}>{exp.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.column}>
            {data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>II. Education</Text></View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}, {edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>III. Technical Skills</Text></View>
                <View style={styles.skillsList}>
                  {data.skills.map((skill) => (
                    <View key={skill.id} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>IV. References</Text></View>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refItem}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                    {ref.contact ? (
                      <Text style={styles.refContact}>{ref.contact}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}

            {data.customSections &&
              data.customSections.length > 0 &&
              data.customSections.map(
                (section) =>
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.customSectionItem}>
                      <Text style={styles.customSectionTitle}>{section.title}</Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={styles.customItem}>
                          <View style={styles.customRow}>
                            <View>
                              <Text style={styles.customItemTitle}>{item.title}</Text>
                              {item.subtitle ? (
                                <Text style={styles.customItemSubtitle}>{item.subtitle}</Text>
                              ) : null}
                            </View>
                            {item.date ? (
                              <Text style={styles.customItemDate}>{item.date}</Text>
                            ) : null}
                          </View>
                          {item.description ? (
                            <Text style={styles.customItemDesc}>{item.description}</Text>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  )
              )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
