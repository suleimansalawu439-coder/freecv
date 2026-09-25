import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    lineHeight: 1.1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagPill: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  tagPillText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contactRow: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: 'medium',
    marginBottom: 8,
  },
  headerBlock: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  pillWrap: {
    marginBottom: 10,
  },
  sectionPill: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  sectionPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 14,
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  companyDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 2,
    marginBottom: 4,
  },
  companyText: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  bulletList: {
    marginTop: 4,
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
  projectItem: {
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
    color: '#111827',
  },
  projectLink: {
    fontSize: 8.5,
    fontWeight: 'medium',
  },
  projectDescription: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.45,
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
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
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillPillText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  certRow: {
    marginBottom: 5,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
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
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
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
  customItem: {
    marginBottom: 8,
  },
  customHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.45,
  },
});

export default function Studio({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const { personalInfo, summary, experience, education, skills } = data;
  const disciplineTags: string[] = [
    ...(personalInfo.jobTitle ? personalInfo.jobTitle.split(/\s+/).filter(Boolean) : []),
    ...skills.slice(0, 4).map((s) => s.name),
  ];
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(
    Boolean
  ) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBlock}>
          {personalInfo.fullName ? <Text style={styles.name}>{personalInfo.fullName}</Text> : null}
          {disciplineTags.length > 0 && (
            <View style={styles.tagsRow}>
              {disciplineTags.map((tag, i) => (
                <View key={i} style={[styles.tagPill, { backgroundColor: themeColor }]}>
                  <Text style={styles.tagPillText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
          {contacts.length > 0 && <Text style={styles.contactRow}>{contacts.join('  •  ')}</Text>}
        </View>

        {summary ? (
          <View style={styles.section}>
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>Profile</Text>
              </View>
            </View>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>Experience</Text>
              </View>
            </View>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                <View style={styles.companyDateRow}>
                  <Text style={[styles.companyText, { color: themeColor }]}>{exp.company}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
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
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>Projects</Text>
              </View>
            </View>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <View style={styles.projectHeaderRow}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  {project.link ? (
                    <Text style={[styles.projectLink, { color: themeColor }]}>{project.link}</Text>
                  ) : null}
                </View>
                {project.description ? (
                  <Text style={styles.projectDescription}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {education && education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>Education</Text>
              </View>
            </View>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>{edu.school}</Text>
                {edu.graduationYear ? <Text style={styles.gradYearText}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>Skills</Text>
              </View>
            </View>
            <View style={styles.skillsRow}>
              {skills.map((skill) => (
                <View key={skill.id} style={[styles.skillPill, { borderColor: themeColor }]}>
                  <Text style={[styles.skillPillText, { color: themeColor }]}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>Certifications</Text>
              </View>
            </View>
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
            <View style={styles.pillWrap}>
              <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                <Text style={styles.sectionPillText}>References</Text>
              </View>
            </View>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
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

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <View style={styles.pillWrap}>
                  <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
                    <Text style={styles.sectionPillText}>{section.title}</Text>
                  </View>
                </View>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
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
