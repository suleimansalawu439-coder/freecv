import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Courier',
    fontSize: 9,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 16,
    marginBottom: 16,
  },
  fullName: {
    fontSize: 22,
    fontFamily: 'Courier-Bold',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Courier-Bold',
    color: '#4B5563',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#111827',
  },
  summaryBox: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#111827',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#111827',
  },
  section: {
    marginBottom: 16,
  },
  badgeTitle: {
    backgroundColor: '#111827',
    color: '#FFFFFF',
    fontFamily: 'Courier-Bold',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  expItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  expRoleCompany: {
    fontSize: 9.5,
    fontFamily: 'Courier-Bold',
    color: '#111827',
    flex: 1,
  },
  expDates: {
    fontSize: 8,
    fontFamily: 'Courier-Bold',
    color: '#6B7280',
    marginLeft: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'flex-start',
  },
  bulletSymbol: {
    fontSize: 9,
    color: '#9CA3AF',
    marginRight: 6,
  },
  bulletText: {
    fontSize: 8.5,
    color: '#374151',
    flex: 1,
    lineHeight: 1.3,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  projectName: {
    fontSize: 9.5,
    fontFamily: 'Courier-Bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 8,
    color: '#2563EB',
    marginLeft: 6,
  },
  projectDesc: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.3,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 20,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 'auto',
  },
  column: {
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 9,
    fontFamily: 'Courier-Bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8,
    color: '#4B5563',
    marginTop: 2,
  },
  certItem: {
    marginBottom: 6,
  },
  certName: {
    fontSize: 9,
    fontFamily: 'Courier-Bold',
    color: '#111827',
  },
  certDetails: {
    fontSize: 8,
    color: '#4B5563',
  },
  refItem: {
    marginBottom: 6,
  },
  refName: {
    fontSize: 9,
    fontFamily: 'Courier-Bold',
    color: '#111827',
  },
  refDetails: {
    fontSize: 8,
    color: '#4B5563',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 8,
    color: '#111827',
  },
  customSection: {
    marginBottom: 12,
  },
  customTitle: {
    fontSize: 10,
    fontFamily: 'Courier-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 6,
    paddingBottom: 2,
  },
  customItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customItemTitle: {
    fontSize: 9,
    fontFamily: 'Courier-Bold',
  },
  customItemSubtitle: {
    fontSize: 8,
    fontStyle: 'italic',
  },
  customItemDate: {
    fontSize: 8,
    fontFamily: 'Courier-Bold',
  },
  customItemDesc: {
    fontSize: 8.5,
    marginTop: 2,
    color: '#374151',
  },
});

export default function TechPro({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.fullName}>
            {'< '}{data.personalInfo.fullName}{' />'}
          </Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{'>'} email: {data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{'>'} tel: {data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>{'>'} loc: {data.personalInfo.location}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>{'>'} web: {data.personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.badgeTitle}>{'[ EXPERIENCE ]'}</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRoleCompany}>{exp.role} @ {exp.company}</Text>
                  <Text style={styles.expDates}>[{exp.startDate} .. {exp.endDate}]</Text>
                </View>
                {exp.description
                  .split('\n')
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletSymbol}>$</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.badgeTitle}>{'[ PROJECTS ]'}</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <View style={styles.projectNameRow}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link && (
                    <Link src={proj.link} style={styles.projectLink}>
                      [{proj.link}]
                    </Link>
                  )}
                </View>
                <Text style={styles.projectDesc}>&gt; {proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Columns */}
        <View style={styles.columnsContainer}>
          {/* Left Column */}
          <View style={styles.column}>
            {/* Education */}
            {data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.badgeTitle}>{'[ EDUCATION ]'}</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school} [{edu.graduationYear}]</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {data.showCertifications && data.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.badgeTitle}>{'[ CERTIFICATIONS ]'}</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.certItem}>
                    <Text style={styles.certName}>{cert.name}</Text>
                    <Text style={styles.certDetails}>{cert.issuer} {'//'} {cert.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* References */}
            {data.showReferences && data.references.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.badgeTitle}>{'[ REFERENCES ]'}</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refItem}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetails}>{ref.title} at {ref.company} {'//'} {ref.contact}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Custom Sections */}
            {data.customSections &&
              data.customSections.length > 0 &&
              data.customSections.map(
                (section) =>
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.customSection}>
                      <Text style={styles.customTitle}>{section.title}</Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={{ marginBottom: 6 }}>
                          <View style={styles.customItemHeader}>
                            <View>
                              <Text style={styles.customItemTitle}>{item.title}</Text>
                              {item.subtitle && (
                                <Text style={styles.customItemSubtitle}>{item.subtitle}</Text>
                              )}
                            </View>
                            {item.date && (
                              <Text style={styles.customItemDate}>{item.date}</Text>
                            )}
                          </View>
                          {item.description && (
                            <Text style={styles.customItemDesc}>{item.description}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )
              )}
          </View>

          {/* Right Column */}
          <View style={styles.column}>
            {/* Skills */}
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.badgeTitle}>{'[ SKILLS ]'}</Text>
                <View style={styles.skillsContainer}>
                  {data.skills.map((s) => (
                    <Text key={s.id} style={styles.skillBadge}>{s.name}</Text>
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