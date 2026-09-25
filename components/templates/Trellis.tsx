import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '28%',
    backgroundColor: '#E9EFE7',
    padding: 22,
    flexDirection: 'column',
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#3C443A',
    marginBottom: 5,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    borderWidth: 1,
    borderColor: '#C9D4C5',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  pillText: {
    fontSize: 8,
    color: '#3C443A',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2E352C',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#5A6557',
  },
  eduYear: {
    fontSize: 8,
    color: '#7A8577',
    marginTop: 1,
  },
  eduItem: {
    marginBottom: 12,
  },
  main: {
    width: '72%',
    padding: 32,
    flexDirection: 'column',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#242B23',
    marginBottom: 3,
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 12,
    color: '#5A6557',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#5C6B58',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.8,
    color: '#4B5563',
  },
  expItem: {
    marginBottom: 18,
  },
  roleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#242B23',
    marginBottom: 1,
  },
  companyLine: {
    fontSize: 8.5,
    color: '#5A6557',
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#9AA794',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.7,
    color: '#4B5563',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#242B23',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: '#4B5563',
    marginTop: 3,
  },
  projectItem: {
    marginBottom: 14,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 10,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#242B23',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#5A6557',
  },
});

export default function Trellis({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarBlock}>
            <Text style={[styles.sidebarTitle, { color: themeColor }]}>Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>Skills</Text>
              <View style={styles.pillRow}>
                {data.skills.map((s) => (
                  <View key={s.id} style={styles.pill}>
                    <Text style={styles.pillText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.eduYear}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>Certifications</Text>
              {data.certifications.map((c) => (
                <View key={c.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{c.name}</Text>
                  {c.issuer ? <Text style={styles.eduSchool}>{c.issuer}</Text> : null}
                  {c.date ? <Text style={styles.eduYear}>{c.date}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.main}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <Text style={styles.roleText}>{exp.role}</Text>
                  <Text style={styles.companyLine}>
                    {exp.company} · {exp.startDate} – {exp.endDate}
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
          ) : null}

          {data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((p) => (
                <View key={p.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{p.name}</Text>
                  <Text style={styles.projectDesc}>{p.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map((r) => (
                  <View key={r.id} style={styles.refCard}>
                    <Text style={styles.refName}>{r.name}</Text>
                    <Text style={styles.refDetail}>
                      {r.title}
                      {r.company ? ` · ${r.company}` : ''}
                    </Text>
                    {r.contact ? <Text style={styles.refDetail}>{r.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.customSections &&
            data.customSections.length > 0 &&
            data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      <Text style={styles.roleText}>{item.title}</Text>
                      {item.subtitle || item.date ? (
                        <Text style={styles.companyLine}>
                          {item.subtitle}
                          {item.subtitle && item.date ? ' · ' : ''}
                          {item.date}
                        </Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.summaryText}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null
            )}
        </View>
      </Page>
    </Document>
  );
}
