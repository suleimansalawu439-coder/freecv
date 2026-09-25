import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  sidebar: {
    width: '28%',
    backgroundColor: '#172554',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sidebarTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#93C5FD',
    marginBottom: 12,
  },
  sidebarSection: {
    marginBottom: 26,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#DBEAFE',
    marginBottom: 5,
  },
  skillName: {
    fontSize: 9,
    color: '#DBEAFE',
    marginBottom: 5,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  dotOff: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 6,
  },
  customTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  customMeta: {
    fontSize: 8.5,
    color: '#BFDBFE',
    marginBottom: 8,
  },
  main: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 28,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#9CA3AF',
    marginBottom: 14,
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
    marginBottom: 16,
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

export default function Compass({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {data.skills.map((skill) => (
                <View key={skill.id}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.dotsRow}>
                    {[0, 1, 2, 3, 4].map((d) => (
                      <View
                        key={d}
                        style={d < 3 + (skill.name.length % 2) ? styles.dot : styles.dotOff}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {data.customSections &&
            data.customSections.map((section) => (
              <View key={section.id} style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    <Text style={styles.customMeta}>
                      {item.subtitle}
                      {item.date ? ` · ${item.date}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
        </View>

        <View style={styles.main}>
          <Text style={styles.name}>{info.fullName}</Text>
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
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
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
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
              <Text style={styles.sectionTitle}>Projects</Text>
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
              <Text style={styles.sectionTitle}>Certifications</Text>
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

          {data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
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
        </View>
      </Page>
    </Document>
  );
}
