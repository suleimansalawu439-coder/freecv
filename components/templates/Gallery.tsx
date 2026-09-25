import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const INK = '#000000';
const GRAY_700 = '#374151';
const GRAY_800 = '#1F2937';
const GRAY_500 = '#6B7280';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingHorizontal: 64,
    paddingVertical: 56,
  },
  headerBlock: {
    textAlign: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: INK,
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 15,
    fontStyle: 'italic',
    color: GRAY_700,
    marginTop: 10,
  },
  contactRow: {
    fontSize: 10,
    color: GRAY_500,
    textAlign: 'center',
    marginBottom: 52,
  },
  section: {
    marginBottom: 44,
  },
  sectionHead: {
    fontSize: 9,
    fontWeight: 'bold',
    color: GRAY_500,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.9,
    color: GRAY_800,
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: 32,
  },
  roleDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: INK,
  },
  dateText: {
    fontSize: 9,
    color: GRAY_500,
    letterSpacing: 0.5,
  },
  companyText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: GRAY_700,
    marginTop: 3,
  },
  bulletList: {
    marginTop: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  bulletDot: {
    width: 12,
    fontSize: 9,
    color: GRAY_800,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.9,
    color: GRAY_800,
  },
  projectItem: {
    marginBottom: 24,
  },
  eduBlock: {
    textAlign: 'center',
    marginBottom: 24,
  },
  degreeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: INK,
  },
  schoolText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: GRAY_700,
    marginTop: 3,
  },
  gradYearText: {
    fontSize: 9,
    color: GRAY_500,
    letterSpacing: 0.5,
    marginTop: 5,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '50%',
    textAlign: 'center',
    marginBottom: 9,
  },
  skillText: {
    fontSize: 11,
    color: GRAY_800,
  },
  certBlock: {
    textAlign: 'center',
    marginBottom: 14,
  },
  certName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: INK,
  },
  certMeta: {
    fontSize: 10,
    fontStyle: 'italic',
    color: GRAY_700,
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCell: {
    width: '48%',
    textAlign: 'center',
    marginBottom: 12,
  },
  refName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: INK,
  },
  refTitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: GRAY_700,
    marginTop: 2,
  },
  refContact: {
    fontSize: 10,
    color: GRAY_500,
    marginTop: 2,
  },
  customItem: {
    marginBottom: 24,
    textAlign: 'center',
  },
  customHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: INK,
  },
  customDate: {
    fontSize: 9,
    color: GRAY_500,
    letterSpacing: 0.5,
    marginLeft: 12,
  },
  customSubtitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: GRAY_700,
    marginTop: 3,
  },
  customDescription: {
    fontSize: 11,
    lineHeight: 1.9,
    color: GRAY_800,
    marginTop: 6,
  },
});

export default function Gallery({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = data;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(
    Boolean
  ) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBlock}>
          {personalInfo.fullName ? <Text style={styles.name}>{personalInfo.fullName}</Text> : null}
          {personalInfo.jobTitle ? <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text> : null}
        </View>
        {contacts.length > 0 && <Text style={styles.contactRow}>{contacts.join('  ·  ')}</Text>}

        {summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionHead}>Profile</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHead}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.roleDateRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyText}>{exp.company}</Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
                      .map((line, i) => (
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

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHead}>Selected Work</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <View style={styles.roleDateRow}>
                  <Text style={styles.roleTitle}>{project.name}</Text>
                  {project.link ? <Text style={styles.dateText}>{project.link}</Text> : null}
                </View>
                {project.description ? (
                  <Text style={[styles.bulletText, { marginTop: 6 }]}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHead}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduBlock}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>{edu.school}</Text>
                {edu.graduationYear ? <Text style={styles.gradYearText}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHead}>Capabilities</Text>
            <View style={styles.skillsGrid}>
              {skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHead}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certBlock}>
                <Text style={styles.certName}>{cert.name}</Text>
                {(cert.issuer || cert.date) && (
                  <Text style={styles.certMeta}>
                    {cert.issuer}
                    {cert.issuer && cert.date ? ', ' : ''}
                    {cert.date}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionHead}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCell}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>
                    {ref.title}
                    {ref.title && ref.company ? ', ' : ''}
                    {ref.company}
                  </Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionHead}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.customDate}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
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
