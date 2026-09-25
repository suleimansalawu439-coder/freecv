import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const CLINICAL_BLUE = '#2563EB';
const CLINICAL_BLUE_DARK = '#1D4ED8';
const CLINICAL_RULE = '#DBEAFE';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    paddingTop: 52,
    paddingHorizontal: 52,
    paddingBottom: 52,
    borderTopWidth: 8,
    borderTopColor: CLINICAL_BLUE,
  },
  header: {
    marginBottom: 22,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: CLINICAL_BLUE,
    marginBottom: 7,
    letterSpacing: 0.4,
  },
  contactRow: {
    fontSize: 8.5,
    color: '#64748B',
  },
  contactLink: {
    fontSize: 8.5,
    color: CLINICAL_BLUE,
    textDecoration: 'none',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: CLINICAL_BLUE_DARK,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: CLINICAL_RULE,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  certItem: {
    borderLeftWidth: 2,
    borderLeftColor: CLINICAL_BLUE,
    paddingLeft: 12,
    marginBottom: 10,
  },
  certName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  certMeta: {
    fontSize: 8.5,
    color: '#4B5563',
    marginTop: 1,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillRow: {
    width: '48%',
    flexDirection: 'row',
    marginBottom: 5,
  },
  skillMarker: {
    width: 10,
    fontSize: 7,
    color: CLINICAL_BLUE,
  },
  skillText: {
    flex: 1,
    fontSize: 9,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 14,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
  },
  dateText: {
    fontSize: 8,
    color: '#6B7280',
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDash: {
    width: 10,
    fontSize: 8,
    color: '#94A3B8',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
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
    color: '#6B7280',
    marginTop: 1,
  },
  projectItem: {
    marginBottom: 9,
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 8.5,
    color: CLINICAL_BLUE,
    textDecoration: 'none',
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 1,
  },
  refContact: {
    fontSize: 8,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 8,
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
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.45,
  },
});

export default function Clinician({ data }: { data: ResumeData }) {
  const contactItems = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {(contactItems.length > 0 || data.personalInfo.website) && (
            <Text style={styles.contactRow}>
              {contactItems.join('  •  ')}
              {data.personalInfo.website ? (
                <Link style={styles.contactLink} src={data.personalInfo.website}>
                  {contactItems.length > 0 ? '  •  ' : ''}{data.personalInfo.website}
                </Link>
              ) : null}
            </Text>
          )}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Certifications — credential-forward */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications & Licenses</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                {(cert.issuer || cert.date) && (
                  <Text style={styles.certMeta}>
                    {[cert.issuer, cert.date].filter(Boolean).join('  •  ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinical & Technical Skills</Text>
            <View style={styles.skillsList}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillMarker}>•</Text>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                <View style={styles.companyRow}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDash}>–</Text>
                          <Text style={styles.bulletText}>{line}</Text>
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
          <View style={styles.section}>
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

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.link ? (
                  <Link style={styles.projectLink} src={proj.link}>
                    {proj.link}
                  </Link>
                ) : null}
                {proj.description ? (
                  <Text style={styles.projectDescription}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>{ref.title}{ref.company ? `, ${ref.company}` : ''}</Text>
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
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.companyRow}>
                      <View>
                        <Text style={styles.customTitle}>{item.title}</Text>
                        {item.subtitle ? (
                          <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                        ) : null}
                      </View>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
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
