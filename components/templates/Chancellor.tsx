import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const NAVY = '#1E3A5F';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 24,
    color: NAVY,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontFamily: 'Times-Italic',
    fontSize: 11,
    color: '#4B5563',
    marginTop: 4,
  },
  contactBlock: {
    textAlign: 'right',
    marginLeft: 16,
  },
  contactItem: {
    fontSize: 8.5,
    color: NAVY,
    marginBottom: 3,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: NAVY,
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginTop: 20,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  companyTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10.5,
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  roleText: {
    fontFamily: 'Times-Italic',
    fontSize: 9.5,
    color: '#374151',
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#111827',
  },
  schoolText: {
    fontSize: 9,
    color: '#4B5563',
  },
  gradYearText: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 1,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: 5,
    paddingRight: 10,
  },
  skillDot: {
    width: 10,
    fontSize: 9,
  },
  skillText: {
    flex: 1,
    fontSize: 9,
    color: '#374151',
  },
  projectItem: {
    marginBottom: 8,
  },
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  projectName: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#111827',
  },
  projectLink: {
    fontSize: 8,
  },
  projectDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  certItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
  },
  certName: {
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#111827',
  },
  customSubtitle: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

export default function Chancellor({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
            ) : null}
          </View>
          <View style={styles.contactBlock}>
            {data.personalInfo.email ? (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            ) : null}
            {data.personalInfo.phone ? (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            ) : null}
            {data.personalInfo.location ? (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            ) : null}
            {data.personalInfo.website ? (
              <Link style={styles.contactItem} src={data.personalInfo.website}>
                {data.personalInfo.website}
              </Link>
            ) : null}
          </View>
        </View>

        {data.summary ? (
          <View>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.companyTitle}>{exp.company}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                  </Text>
                </View>
                {exp.role ? (
                  <Text style={styles.roleText}>{exp.role}</Text>
                ) : null}
                {exp.description ? (
                  <View>
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>{edu.school}</Text>
                {edu.graduationYear ? (
                  <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={[styles.skillDot, { color: themeColor }]}>•</Text>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <View style={styles.projectRow}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link style={[styles.projectLink, { color: themeColor }]} src={proj.link}>
                      {proj.link}
                    </Link>
                  ) : null}
                </View>
                {proj.description ? (
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={styles.certItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                {cert.issuer ? <Text> — {cert.issuer}</Text> : null}
                {cert.date ? <Text>, {cert.date}</Text> : null}
              </Text>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.refItem}>
                <Text style={styles.refName}>{ref.name}</Text>
                {ref.title || ref.company ? (
                  <Text style={styles.refDetail}>
                    {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                  </Text>
                ) : null}
                {ref.contact ? (
                  <Text style={styles.refContact}>{ref.contact}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? (
                        <Text style={styles.dateText}>{item.date}</Text>
                      ) : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null
          )}
      </Page>
    </Document>
  );
}
