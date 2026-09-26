import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
    minHeight: 130,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 36,
    paddingBottom: 28,
    paddingLeft: 48,
    paddingRight: 24,
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  contactPanel: {
    width: '38%',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  panelTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  panelContact: {
    fontSize: 9,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  body: {
    paddingHorizontal: 48,
    paddingBottom: 36,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingBottom: 8,
    marginBottom: 12,
    borderBottomWidth: 2,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 10,
  },
  bulletDot: {
    fontSize: 9.5,
    color: '#9CA3AF',
    width: 10,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
    flex: 1,
  },
  experienceItem: {
    marginBottom: 14,
  },
  skillsPanel: {
    marginBottom: 20,
    marginHorizontal: -48,
    paddingHorizontal: 48,
    paddingVertical: 20,
  },
  skillsPanelTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  whitePill: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  projectItem: {
    marginBottom: 12,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  certMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
});

export default function Uplink({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  const sectionHeaderStyle = [
    styles.sectionHeader,
    { color: themeColor, borderBottomColor: themeColor },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <View style={styles.header}>
              <View style={styles.nameBlock}>
                <Text style={styles.name}>{info.fullName}</Text>
                {info.jobTitle ? (
                  <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
                ) : null}
              </View>
              <View style={[styles.contactPanel, { backgroundColor: themeColor }]}>
                <Text style={styles.panelTitle}>Contact</Text>
                {info.email ? <Text style={styles.panelContact}>{info.email}</Text> : null}
                {info.phone ? <Text style={styles.panelContact}>{info.phone}</Text> : null}
                {info.location ? <Text style={styles.panelContact}>{info.location}</Text> : null}
                {info.website ? <Text style={styles.panelContact}>{info.website}</Text> : null}
              </View>
            </View>
          ),
        })}

        <View style={styles.body}>
          {orderSections(data, {
            personal: data.summary ? (
              <View style={styles.section}>
                <Text style={sectionHeaderStyle}>Profile</Text>
                <Text style={styles.bodyText}>{data.summary}</Text>
              </View>
            ) : null,

            experience: data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={sectionHeaderStyle}>Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} — {exp.endDate}
                      </Text>
                    </View>
                    <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                    {exp.description
                      ? exp.description
                          .split(/\n|\r?\n/)
                          .filter((l) => l.trim())
                          .map((line, i) => (
                            <View key={i} style={styles.bulletRow}>
                              <Text style={styles.bulletDot}>•</Text>
                              <Text style={styles.bulletText}>{line}</Text>
                            </View>
                          ))
                      : null}
                  </View>
                ))}
              </View>
            ) : null,

            skills: data.skills && data.skills.length > 0 ? (
              <View style={[styles.skillsPanel, { backgroundColor: themeColor }]}>
                <Text style={styles.skillsPanelTitle}>Skills</Text>
                <View style={styles.pillsWrap}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.whitePill}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null,

            education: data.education && data.education.length > 0 ? (
              <View style={styles.section}>
                <Text style={sectionHeaderStyle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduRow}>
                    <View>
                      <Text style={styles.degreeText}>{edu.degree}</Text>
                      <Text style={styles.schoolText}>{edu.school}</Text>
                    </View>
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <Text style={sectionHeaderStyle}>Projects</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={styles.projectItem}>
                    <Text style={styles.roleTitle}>
                      {proj.name}
                      {proj.link ? <Text style={styles.certMeta}> ({proj.link})</Text> : null}
                    </Text>
                    <Text style={styles.bodyText}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={styles.section}>
                <Text style={sectionHeaderStyle}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.certRow}>
                    <Text style={styles.certName}>
                      {cert.name}
                      {cert.issuer ? <Text style={styles.certMeta}> — {cert.issuer}</Text> : null}
                    </Text>
                    <Text style={styles.dateText}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.section}>
                <Text style={sectionHeaderStyle}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refItem}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}
                      {ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null,
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id} style={styles.section}>
                  <Text style={sectionHeaderStyle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.projectItem}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.schoolText}>{item.subtitle}</Text> : null}
                      {item.description ? (
                        <Text style={styles.bodyText}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
