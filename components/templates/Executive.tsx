import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/store';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    backgroundColor: '#FFFFFF',
    fontSize: 10,
    color: '#111827',
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    paddingBottom: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    maxWidth: '65%',
  },
  fullName: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginBottom: 6,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: 'Times-Italic',
    color: '#6B7280',
  },
  contactList: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
  },
  contactItem: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  summaryContainer: {
    marginBottom: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 16,
  },
  summaryText: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    color: '#374151',
    lineHeight: 1.5,
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
  expRole: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  expDates: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#9CA3AF',
  },
  expCompany: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6B7280',
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#000000',
    marginTop: 4,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.4,
    flex: 1,
  },
  projItem: {
    marginBottom: 10,
  },
  projHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 2,
  },
  projName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  projLink: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
  },
  projDesc: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.4,
  },
  grid: {
    flexDirection: 'row',
    gap: 30,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
    marginTop: 'auto',
  },
  gridCol: {
    flex: 1,
  },
  subSection: {
    marginBottom: 14,
  },
  subTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
    color: '#111827',
    lineHeight: 1.2,
  },
  subDetail: {
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    marginTop: 2,
  },
  customSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customSubTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Italic',
    color: '#374151',
  },
  customDate: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillText: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#111827',
  },
});

export default function Executive({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
            {data.personalInfo.jobTitle && (
              <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
            )}
          </View>
          <View style={styles.contactList}>
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

        {data.summary ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional History</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDates}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                {exp.company && (
                  <Text style={styles.expCompany}>{exp.company}</Text>
                )}
                {exp.description && (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split('\n')
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <View style={styles.bulletDot} />
                          <Text style={styles.bulletText}>{line.trim()}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projItem}>
                <View style={styles.projHeader}>
                  <Text style={styles.projName}>{proj.name}</Text>
                  {proj.link && (
                    <Link src={proj.link} style={styles.projLink}>
                      <Text>{proj.link}</Text>
                    </Link>
                  )}
                </View>
                {proj.description && (
                  <Text style={styles.projDesc}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.grid}>
          <View style={styles.gridCol}>
            {data.education && data.education.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.sectionTitle}>Formation</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 8 }}>
                    <Text style={styles.subTitle}>{edu.degree}</Text>
                    <Text style={styles.subDetail}>
                      {edu.school}
                      {edu.school && edu.graduationYear ? ', ' : ''}
                      {edu.graduationYear}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.gridCol}>
            {data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={{ marginBottom: 6 }}>
                    <Text style={styles.subTitle}>{cert.name}</Text>
                    <Text style={styles.subDetail}>
                      {cert.issuer} • {cert.date}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.sectionTitle}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={{ marginBottom: 6 }}>
                    <Text style={styles.subTitle}>{ref.name}</Text>
                    <Text style={styles.subDetail}>
                      {ref.title} at {ref.company} • {ref.contact}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.customSections &&
              data.customSections.map(
                (section) =>
                  section.items &&
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.subSection}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={{ marginBottom: 6 }}>
                          <View style={styles.customSubHeader}>
                            <View>
                              <Text style={styles.subTitle}>{item.title}</Text>
                              {item.subtitle && (
                                <Text style={styles.customSubTitle}>{item.subtitle}</Text>
                              )}
                            </View>
                            {item.date && (
                              <Text style={styles.customDate}>{item.date}</Text>
                            )}
                          </View>
                          {item.description && (
                            <Text style={styles.projDesc}>{item.description}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )
              )}

            {data.skills && data.skills.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.sectionTitle}>Expertise</Text>
                <View style={styles.skillsContainer}>
                  {data.skills.map((s) => (
                    <Text key={s.id} style={styles.skillText}>
                      {s.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}