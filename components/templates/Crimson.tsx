import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  topBand: {
    height: 12,
    width: '100%',
  },
  container: {
    paddingTop: 28,
    paddingHorizontal: 40,
    paddingBottom: 32,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 3,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 10,
    borderLeftWidth: 4,
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
    fontSize: 8,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: '#4B5563',
    width: 10,
  },
  bulletText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 9,
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 8,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  certIssuer: {
    fontSize: 9,
    color: '#4B5563',
  },
  certDate: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCard: {
    width: '50%',
    paddingRight: 12,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  customSubtitle: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 8,
  },
  link: {
    fontSize: 8.5,
    color: '#4B5563',
  },
});

export default function Crimson({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const sectionTitleStyle = [styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.topBand, { backgroundColor: themeColor }]} />
        <View style={styles.container}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
          ) : null}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={[styles.experienceItem, { borderLeftColor: themeColor }]}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={[styles.dateText, { color: themeColor }]}>
                      {exp.startDate} — {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description ? (
                    <View style={styles.bulletList}>
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
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>Skills</Text>
              <View style={styles.skillsRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={[styles.skillChip, { backgroundColor: themeColor }]}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                  </View>
                  <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showProjects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id}>
                  <Text style={styles.projectName}>
                    {proj.name}
                    {proj.link ? <Text style={styles.link}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name} <Text style={styles.certIssuer}>— {cert.issuer}</Text>
                  </Text>
                  <Text style={[styles.certDate, { color: themeColor }]}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references.length > 0 ? (
            <View style={styles.section}>
              <Text style={sectionTitleStyle}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    <Text style={styles.refDetail}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.customSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={sectionTitleStyle}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.date ? (
                      <Text style={[styles.dateText, { color: themeColor }]}>{item.date}</Text>
                    ) : null}
                  </View>
                  {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                  {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
