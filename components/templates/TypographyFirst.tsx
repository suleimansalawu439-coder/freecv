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
    color: '#000000',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    fontFamily: 'Times-Italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  contactText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#4B5563',
  },
  summaryContainer: {
    marginBottom: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  summaryText: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Times-Italic',
    marginBottom: 16,
  },
  grid2Col: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colLeft: {
    width: '28%',
    paddingRight: 12,
  },
  colRight: {
    width: '72%',
  },
  companyName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  dateText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    marginTop: 4,
  },
  roleTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
  },
  bulletList: {
    gap: 4,
  },
  bulletItem: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#1F2937',
    lineHeight: 1.4,
  },
  projectName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  projectLink: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    marginTop: 2,
  },
  projectDesc: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#1F2937',
    lineHeight: 1.4,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  detailsTitleCol: {
    width: '28%',
    paddingRight: 12,
  },
  detailsSubGrid: {
    flexDirection: 'row',
    width: '72%',
    gap: 20,
  },
  detailsSubCol: {
    flex: 1,
  },
  subSectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  subColBlock: {
    marginBottom: 14,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  eduSchool: {
    fontSize: 9,
    fontFamily: 'Times-Italic',
    marginTop: 2,
  },
  eduYear: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    marginTop: 2,
  },
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
  },
  certInfo: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    marginTop: 2,
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
  },
  refInfo: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    marginTop: 2,
  },
  customSectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
    paddingBottom: 2,
  },
  customItem: {
    marginBottom: 6,
  },
  customItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customItemTitle: {
    fontSize: 9,
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
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#374151',
    marginTop: 2,
  },
  skillsText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#1F2937',
    lineHeight: 1.4,
  },
});

export default function TypographyFirst({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && <Text style={styles.contactText}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text style={styles.contactText}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contactText}>{data.personalInfo.location}</Text>}
            {data.personalInfo.website && <Text style={styles.contactText}>{data.personalInfo.website}</Text>}
          </View>
        </View>

        {data.summary && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience.</Text>
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.grid2Col}>
                <View style={styles.colLeft}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <View style={styles.colRight}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <View style={styles.bulletList}>
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <Text key={i} style={styles.bulletItem}>
                        {line}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects.</Text>
            {data.projects.map(proj => (
              <View key={proj.id} style={styles.grid2Col}>
                <View style={styles.colLeft}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link && <Text style={styles.projectLink}>{proj.link}</Text>}
                </View>
                <View style={styles.colRight}>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.detailsContainer}>
          <View style={styles.detailsTitleCol}>
            <Text style={styles.sectionTitle}>Details.</Text>
          </View>
          <View style={styles.detailsSubGrid}>
            <View style={styles.detailsSubCol}>
              {data.education.length > 0 && (
                <View style={styles.subColBlock}>
                  <Text style={styles.subSectionTitle}>Education</Text>
                  {data.education.map(edu => (
                    <View key={edu.id} style={styles.eduItem}>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      <Text style={styles.eduYear}>{edu.graduationYear}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.detailsSubCol}>
              {data.showCertifications && data.certifications.length > 0 && (
                <View style={styles.subColBlock}>
                  <Text style={styles.subSectionTitle}>Certifications</Text>
                  {data.certifications.map(cert => (
                    <View key={cert.id} style={styles.certItem}>
                      <Text style={styles.certName}>{cert.name}</Text>
                      <Text style={styles.certInfo}>{cert.issuer} ({cert.date})</Text>
                    </View>
                  ))}
                </View>
              )}

              {data.showReferences && data.references.length > 0 && (
                <View style={styles.subColBlock}>
                  <Text style={styles.subSectionTitle}>References</Text>
                  {data.references.map(ref => (
                    <View key={ref.id} style={styles.refItem}>
                      <Text style={styles.refName}>{ref.name}</Text>
                      <Text style={styles.refInfo}>{ref.title} at {ref.company} ({ref.contact})</Text>
                    </View>
                  ))}
                </View>
              )}

              {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
                section.items.length > 0 && (
                  <View key={section.id} style={styles.subColBlock}>
                    <Text style={styles.customSectionTitle}>{section.title}</Text>
                    {section.items.map(item => (
                      <View key={item.id} style={styles.customItem}>
                        <View style={styles.customItemHeader}>
                          <View>
                            <Text style={styles.customItemTitle}>{item.title}</Text>
                            {item.subtitle && <Text style={styles.customItemSubtitle}>{item.subtitle}</Text>}
                          </View>
                          {item.date && <Text style={styles.customItemDate}>{item.date}</Text>}
                        </View>
                        {item.description && <Text style={styles.customItemDesc}>{item.description}</Text>}
                      </View>
                    ))}
                  </View>
                )
              ))}

              {data.skills.length > 0 && (
                <View style={styles.subColBlock}>
                  <Text style={styles.subSectionTitle}>Skills</Text>
                  <Text style={styles.skillsText}>
                    {data.skills.map(s => s.name).join(' • ')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}