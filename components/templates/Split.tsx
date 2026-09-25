import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    paddingTop: 28,
    paddingHorizontal: 40,
    paddingBottom: 18,
    borderBottomWidth: 4,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.6,
  },
  body: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  column: {
    width: '50%',
  },
  columnLeft: {
    paddingRight: 16,
  },
  columnRight: {
    paddingLeft: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 2,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 1,
  },
  companyLine: {
    fontSize: 8.5,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  metaText: {
    fontSize: 8,
    color: '#6B7280',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 8.5,
    color: '#6B7280',
    width: 9,
  },
  bulletText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },
  expItem: {
    marginBottom: 12,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  certName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  certDetail: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 6,
  },
  refName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 8,
  },
  customSection: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  customSubtitle: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
  },
});

export default function Split({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const titleStyle = [styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { borderBottomColor: themeColor }]}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
          ) : null}
          {data.summary ? <Text style={styles.summaryText}>{data.summary}</Text> : null}
        </View>

        <View style={styles.body}>
          <View style={[styles.column, styles.columnLeft]}>
            {data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={titleStyle}>Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={[styles.companyLine, { color: themeColor }]}>
                      {exp.company} <Text style={styles.metaText}>· {exp.startDate} – {exp.endDate}</Text>
                    </Text>
                    {exp.description ? (
                      <View>
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

            {data.showProjects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <Text style={titleStyle}>Projects</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id}>
                    <Text style={styles.projectName}>
                      {proj.name}{proj.link ? <Text style={styles.metaText}> ({proj.link})</Text> : null}
                    </Text>
                    <Text style={styles.projectDesc}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          <View style={[styles.column, styles.columnRight]}>
            {data.skills && data.skills.length > 0 ? (
              <View style={styles.section}>
                <Text style={titleStyle}>Skills</Text>
                <View style={styles.skillsRow}>
                  {data.skills.map((skill) => (
                    <View key={skill.id} style={[styles.skillChip, { borderColor: themeColor }]}>
                      <Text style={[styles.skillText, { color: themeColor }]}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            {data.education && data.education.length > 0 ? (
              <View style={styles.section}>
                <Text style={titleStyle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.showCertifications && data.certifications.length > 0 ? (
              <View style={styles.section}>
                <Text style={titleStyle}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id}>
                    <Text style={styles.certName}>{cert.name}</Text>
                    <Text style={styles.certDetail}>{cert.issuer} · {cert.date}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.showReferences && data.references.length > 0 ? (
              <View style={styles.section}>
                <Text style={titleStyle}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    <Text style={styles.refDetail}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        {data.customSections.length > 0 ? (
          <View style={styles.customSection}>
            {data.customSections.map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={titleStyle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.date ? (
                      <Text style={[styles.metaText, { color: themeColor, marginBottom: 2 }]}>{item.date}</Text>
                    ) : null}
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
