import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const SIDEBAR_BG = '#92400e';
const CREAM = '#FEF3C7';
const CREAM_DIM = 'rgba(254, 243, 199, 0.7)';
const DARK_BROWN = '#451a03';
const CARD_BORDER = '#F0DDB8';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '30%',
    backgroundColor: SIDEBAR_BG,
    padding: 24,
    flexDirection: 'column',
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  sidebarHead: {
    fontSize: 8,
    fontWeight: 'bold',
    color: CREAM_DIM,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'medium',
    color: CREAM,
    marginBottom: 7,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  skillMarker: {
    fontSize: 9,
    color: CREAM,
    width: 10,
    lineHeight: 1.5,
  },
  skillName: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'medium',
    color: CREAM,
    lineHeight: 1.5,
  },
  processSectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: CREAM,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  processItem: {
    marginBottom: 8,
  },
  processItemTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: CREAM,
  },
  processItemSub: {
    fontSize: 8,
    color: CREAM_DIM,
  },
  main: {
    width: '70%',
    padding: 28,
    flexDirection: 'column',
  },
  headerBlock: {
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: DARK_BROWN,
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: SIDEBAR_BG,
    marginTop: 6,
  },
  section: {
    marginBottom: 20,
  },
  mainHead: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: SIDEBAR_BG,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  expCard: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderLeftWidth: 4,
    borderLeftColor: SIDEBAR_BG,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: DARK_BROWN,
  },
  companyLine: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#4B5563',
    marginTop: 2,
    marginBottom: 5,
  },
  dateDim: {
    fontSize: 8.5,
    color: '#9CA3AF',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  eduItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: DARK_BROWN,
  },
  schoolText: {
    fontSize: 9,
    color: '#4B5563',
  },
  gradYearText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginTop: 1,
  },
  projectItem: {
    borderLeftWidth: 4,
    borderLeftColor: SIDEBAR_BG,
    paddingLeft: 10,
    marginBottom: 10,
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: DARK_BROWN,
  },
  projectLink: {
    fontSize: 8.5,
    fontWeight: 'medium',
    color: SIDEBAR_BG,
  },
  projectDescription: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.45,
  },
  certRow: {
    marginBottom: 5,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: DARK_BROWN,
  },
  certMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    borderLeftColor: SIDEBAR_BG,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: DARK_BROWN,
  },
  refTitle: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default function Workshop({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = data;
  const hasCustomSections = !!(data.customSections && data.customSections.length > 0);
  const showEducationInMain = !hasCustomSections;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarHead}>Contact</Text>
            {personalInfo.email ? <Text style={styles.contactItem}>{personalInfo.email}</Text> : null}
            {personalInfo.phone ? <Text style={styles.contactItem}>{personalInfo.phone}</Text> : null}
            {personalInfo.location ? <Text style={styles.contactItem}>{personalInfo.location}</Text> : null}
            {personalInfo.website ? <Text style={styles.contactItem}>{personalInfo.website}</Text> : null}
          </View>

          {skills && skills.length > 0 && (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarHead}>Tools & Skills</Text>
              {skills.map((skill) => (
                <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillMarker}>•</Text>
                  <Text style={styles.skillName}>{skill.name}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarHead}>Process</Text>
            {hasCustomSections
              ? data.customSections!.map((section) =>
                  section.items && section.items.length > 0 ? (
                    <View key={section.id} style={{ marginBottom: 12 }}>
                      <Text style={styles.processSectionTitle}>{section.title}</Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={styles.processItem}>
                          <Text style={styles.processItemTitle}>{item.title}</Text>
                          {item.subtitle ? <Text style={styles.processItemSub}>{item.subtitle}</Text> : null}
                          {item.date ? <Text style={styles.processItemSub}>{item.date}</Text> : null}
                        </View>
                      ))}
                    </View>
                  ) : null
                )
              : education &&
                education.length > 0 &&
                education.map((edu) => (
                  <View key={edu.id} style={styles.processItem}>
                    <Text style={styles.processItemTitle}>{edu.degree}</Text>
                    <Text style={styles.processItemSub}>{edu.school}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.processItemSub}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                ))}
          </View>
        </View>

        {/* Main column */}
        <View style={styles.main}>
          <View style={styles.headerBlock}>
            {personalInfo.fullName ? <Text style={styles.name}>{personalInfo.fullName}</Text> : null}
            {personalInfo.jobTitle ? <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text> : null}
          </View>

          {summary ? (
            <View style={styles.section}>
              <Text style={styles.mainHead}>Summary</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {experience && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainHead}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.expCard}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.companyLine}>
                    {exp.company} <Text style={styles.dateDim}>  ·  {exp.startDate} - {exp.endDate}</Text>
                  </Text>
                  {exp.description ? (
                    <View>
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

          {showEducationInMain && education && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainHead}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                  {edu.graduationYear ? <Text style={styles.gradYearText}>{edu.graduationYear}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainHead}>Projects</Text>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.projectItem}>
                  <View style={styles.projectHeaderRow}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.link ? <Text style={styles.projectLink}>{project.link}</Text> : null}
                  </View>
                  {project.description ? (
                    <Text style={styles.projectDescription}>{project.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainHead}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name}
                    {(cert.issuer || cert.date) && (
                      <Text style={styles.certMeta}>
                        {' — '}
                        {cert.issuer}
                        {cert.issuer && cert.date ? ', ' : ''}
                        {cert.date}
                      </Text>
                    )}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.mainHead}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>
                      {ref.title}
                      {ref.title && ref.company ? ' @ ' : ''}
                      {ref.company}
                    </Text>
                    {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
