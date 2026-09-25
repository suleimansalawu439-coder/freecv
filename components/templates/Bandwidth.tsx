import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 12,
  },
  headerBarTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 12,
  },
  headerBarFill: {
    height: 8,
    width: '92%',
    borderRadius: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
    marginBottom: 12,
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
    color: '#4B5563',
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
    marginBottom: 16,
  },
  tenureTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginTop: 8,
  },
  tenureFill: {
    height: 4,
    borderRadius: 2,
    opacity: 0.55,
  },
  skillRow: {
    marginBottom: 10,
  },
  skillName: {
    fontSize: 9.5,
    color: '#1F2937',
    marginBottom: 4,
  },
  meterTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
  },
  meterFill: {
    height: 6,
    borderRadius: 3,
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

export default function Bandwidth({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{info.fullName}</Text>
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        <View style={styles.headerBarTrack}>
          <View style={[styles.headerBarFill, { backgroundColor: themeColor }]} />
        </View>
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Profile</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Experience</Text>
            {data.experience.map((exp, ei) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
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
                <View style={styles.tenureTrack}>
                  <View
                    style={[
                      styles.tenureFill,
                      { backgroundColor: themeColor, width: `${88 - (ei % 4) * 12}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Skills</Text>
            {data.skills.map((skill, i) => (
              <View key={skill.id} style={styles.skillRow}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.meterTrack}>
                  <View
                    style={[
                      styles.meterFill,
                      { backgroundColor: themeColor, width: `${62 + ((i * 37) % 34)}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Education</Text>
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
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Projects</Text>
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
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Certifications</Text>
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
        ) : null}

        {data.customSections &&
          data.customSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
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
          ))}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>References</Text>
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
        ) : null}
      </Page>
    </Document>
  );
}
