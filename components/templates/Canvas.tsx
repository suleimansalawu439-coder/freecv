import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    padding: 44,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 1,
  },
  bar: {
    width: 90,
    height: 7,
    marginTop: 14,
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactRow: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 6,
  },
  section: {
    marginTop: 26,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 6,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 14,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#374151',
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
    lineHeight: 1.5,
    color: '#4B5563',
  },
  educationItem: {
    marginBottom: 10,
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
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginTop: 2,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  certItem: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  certName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  certIssuer: {
    fontSize: 9,
    color: '#4B5563',
  },
  certDate: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 3,
    paddingLeft: 10,
    marginBottom: 10,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 2,
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 10,
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
    marginTop: 3,
    lineHeight: 1.5,
  },
});

function dateRange(startDate?: string, endDate?: string): string | null {
  const parts = [startDate, endDate].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(' \u2014 ') : null;
}

export default function Canvas({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Oversized name + thick theme bar */}
              {data.personalInfo.fullName ? (
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              ) : null}
              <View style={[styles.bar, { backgroundColor: themeColor }]} />
              {data.personalInfo.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>
                  {data.personalInfo.jobTitle}
                </Text>
              ) : null}
              {contact.length > 0 ? (
                <Text style={styles.contactRow}>{contact.join('   •   ')}</Text>
              ) : null}

              {data.summary ? (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>Summary</Text>
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
              {data.experience.map(exp => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {dateRange(exp.startDate, exp.endDate) ? (
                      <Text style={styles.dateText}>{dateRange(exp.startDate, exp.endDate)}</Text>
                    ) : null}
                  </View>
                  {exp.company ? <Text style={styles.companyName}>{exp.company}</Text> : null}
                  {exp.description ? (
                    <View>
                      {exp.description
                        .split(/\n|\r?\n/)
                        .filter(Boolean)
                        .map((line, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>{'•'}</Text>
                            <Text style={styles.bulletText}>{line.trim()}</Text>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
              {data.education.map(edu => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map(skill => (
                  <View key={skill.id} style={[styles.skillPill, { backgroundColor: themeColor }]}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
              {data.projects.map(project => (
                <View key={project.id} style={styles.projectItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.link ? (
                      <Text style={[styles.projectLink, { color: themeColor }]}>
                        {project.link}
                      </Text>
                    ) : null}
                  </View>
                  {project.description ? (
                    <Text style={styles.summaryText}>{project.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications</Text>
              {data.certifications.map(cert => (
                <View key={cert.id} style={styles.certItem}>
                  <View>
                    <Text style={styles.certName}>{cert.name}</Text>
                    {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
                  </View>
                  {cert.date ? <Text style={styles.certDate}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section} wrap={false}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map(ref => (
                  <View
                    key={ref.id}
                    style={[styles.refCard, { borderLeftColor: themeColor }]}
                  >
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {[ref.title, ref.company].filter(Boolean).join(' · ')}
                    </Text>
                    {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  {section.title}
                </Text>
                {section.items.map(item => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
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
            ))
        )}
      </Page>
    </Document>
  );
}
