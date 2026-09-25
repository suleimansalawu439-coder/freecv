import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingTop: 56,
    paddingBottom: 56,
    paddingLeft: 64,
    paddingRight: 64,
  },
  header: {
    alignItems: 'center',
  },
  name: {
    fontSize: 34,
    fontStyle: 'italic',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: 1,
  },
  nameInitial: {
    fontSize: 42,
  },
  jobTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 10,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 10,
    textAlign: 'center',
  },
  headerRule: {
    width: 140,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  summary: {
    fontSize: 10.5,
    fontStyle: 'italic',
    lineHeight: 1.85,
    color: '#374151',
    textAlign: 'center',
    marginTop: 28,
  },
  sectionHeader: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#111827',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    marginTop: 30,
    marginBottom: 14,
  },
  experienceItem: {
    marginBottom: 18,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#6B7280',
    marginTop: 4,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletMark: {
    width: 14,
    fontSize: 8,
    color: '#9CA3AF',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.75,
    color: '#374151',
  },
  eduItem: {
    marginBottom: 12,
  },
  degreeText: {
    fontSize: 11.5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#6B7280',
    marginTop: 4,
  },
  skillsText: {
    fontSize: 10,
    fontStyle: 'italic',
    lineHeight: 1.9,
    color: '#374151',
    textAlign: 'center',
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 11.5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 9,
    color: '#6B7280',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.75,
    color: '#374151',
    marginTop: 3,
  },
  certItem: {
    marginBottom: 10,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  refName: {
    fontSize: 11.5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  refMeta: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  refContact: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 3,
    textAlign: 'center',
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 11.5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#6B7280',
    marginTop: 4,
  },
  customDesc: {
    fontSize: 9.5,
    lineHeight: 1.75,
    color: '#374151',
    marginTop: 3,
  },
});

export default function Calligraphy({ data }: { data: ResumeData }) {
  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const name = data.personalInfo.fullName || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header — swash name */}
        <View style={styles.header}>
          {name ? (
            <Text style={styles.name}>
              <Text style={styles.nameInitial}>{name.charAt(0)}</Text>
              {name.slice(1)}
            </Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contactParts.length > 0 ? (
            <Text style={styles.contactLine}>{contactParts.join('  ·  ')}</Text>
          ) : null}
          <View style={styles.headerRule} />
        </View>

        {/* Summary */}
        {data.summary ? <Text style={styles.summary}>{data.summary}</Text> : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {lines(exp.description).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
                <Text style={styles.schoolText}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills — italic inline list */}
        {data.skills && data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Skills</Text>
            <Text style={styles.skillsText}>
              {data.skills.map((skill) => skill.name).join('    ·    ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectName}>
                  {project.name}
                  {project.link ? <Text style={styles.projectLink}> — {project.link}</Text> : null}
                </Text>
                {project.description ? (
                  <Text style={styles.projectDesc}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.degreeText}>{cert.name}</Text>
                  {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                </View>
                {cert.issuer ? <Text style={styles.schoolText}>{cert.issuer}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refMeta}>
                    {ref.title}
                    {ref.company ? ` · ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom sections */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.customDesc}>{item.description}</Text>
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
