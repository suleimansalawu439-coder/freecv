import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Times-Roman',
    backgroundColor: '#FFFFFF',
    fontSize: 9,
    color: '#000000',
  },
  header: {
    padding: 36,
    paddingBottom: 24,
    borderBottomWidth: 6,
    borderBottomColor: '#000000',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    textAlign: 'center',
  },
  fullName: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#4B5563',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  contactItem: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#6B7280',
    textDecoration: 'none',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    width: '65%',
    padding: 36,
    paddingTop: 24,
    paddingRight: 24,
  },
  rightColumn: {
    width: '35%',
    backgroundColor: '#F9FAFB',
    padding: 36,
    paddingTop: 24,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  expDates: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  expRole: {
    fontSize: 8.5,
    fontFamily: 'Times-BoldItalic',
    color: '#374151',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 6,
  },
  bulletDot: {
    width: 8,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  projectDesc: {
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  eduSchool: {
    fontSize: 8,
    fontFamily: 'Times-Italic',
    color: '#374151',
    marginTop: 1,
    marginBottom: 1,
  },
  eduYear: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
  },
  certItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
  },
  certIssuer: {
    fontSize: 8,
    fontFamily: 'Times-Italic',
    color: '#374151',
    marginTop: 1,
    marginBottom: 1,
  },
  certDate: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
  },
  refItem: {
    marginBottom: 10,
  },
  refName: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
  },
  refTitle: {
    fontSize: 8,
    fontFamily: 'Times-Italic',
    color: '#374151',
    marginTop: 1,
    marginBottom: 1,
  },
  refContact: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
  },
  customSubtitle: {
    fontSize: 8,
    fontFamily: 'Times-Italic',
  },
  customDate: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
  },
  customDesc: {
    fontSize: 8.5,
    marginTop: 2,
  },
  skillText: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
});

export default function ExecutiveSplit({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header spanning full width */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            )}
            {data.personalInfo.website && (
              <Link src={data.personalInfo.website} style={styles.contactItem}>
                <Text>{data.personalInfo.website}</Text>
              </Link>
            )}
          </View>
        </View>

        <View style={styles.body}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {data.summary ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Executive Profile</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            ) : null}

            {data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Professional Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expCompany}>{exp.company}</Text>
                      <Text style={styles.expDates}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    {exp.description
                      .split('\n')
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line.trim()}</Text>
                        </View>
                      ))}
                  </View>
                ))}
              </View>
            ) : null}

            {data.showProjects && data.projects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Strategic Initiatives</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={styles.projectItem}>
                    <Text style={styles.projectDesc}>
                      <Text style={styles.projectName}>{proj.name}: </Text>
                      {proj.description}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {data.education && data.education.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduYear}>{edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Credentials</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.certItem}>
                    <Text style={styles.certName}>{cert.name}</Text>
                    <Text style={styles.certIssuer}>{cert.issuer}</Text>
                    <Text style={styles.certDate}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refItem}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>{ref.title} at {ref.company}</Text>
                    <Text style={styles.refContact}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.customSections &&
              data.customSections.map(
                (section) =>
                  section.items &&
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.section}>
                      <Text style={styles.sectionHeading}>{section.title}</Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={styles.customItem}>
                          <View style={styles.expHeader}>
                            <View>
                              <Text style={styles.customTitle}>{item.title}</Text>
                              {item.subtitle ? (
                                <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                              ) : null}
                            </View>
                            {item.date ? (
                              <Text style={styles.customDate}>{item.date}</Text>
                            ) : null}
                          </View>
                          {item.description ? (
                            <Text style={styles.customDesc}>{item.description}</Text>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  )
              )}

            {data.skills && data.skills.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Skills</Text>
                {data.skills.map((s) => (
                  <Text key={s.id} style={styles.skillText}>{s.name}</Text>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}