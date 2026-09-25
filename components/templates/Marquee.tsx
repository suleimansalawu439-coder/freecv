import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 0,
  },
  header: {
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 22,
  },
  name: {
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#111827',
    lineHeight: 1.05,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#4B5563',
  },
  contactBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 18,
    marginBottom: 2,
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 6,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#4B5563',
  },
  skillsInline: {
    fontSize: 9.5,
    fontWeight: 'bold',
    lineHeight: 1.7,
    color: '#374151',
  },
  expItem: {
    marginBottom: 16,
  },
  roleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6B7280',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: '#6B7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#4B5563',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#4B5563',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 12,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 7,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
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
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#6B7280',
  },
});

export default function Marquee({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        </View>

        {info.email || info.phone || info.location || info.website ? (
          <View style={[styles.contactBar, { backgroundColor: themeColor }]}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>
        ) : null}

        <View style={styles.body}>
          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skillsInline}>
                {data.skills.map((s) => s.name).join('  •  ')}
              </Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <Text style={styles.roleText}>{exp.role}</Text>
                  <Text style={styles.metaText}>
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

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                  </View>
                  {edu.graduationYear ? (
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
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

          {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((c) => (
                <View key={c.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {c.name}
                    {c.issuer ? ` — ${c.issuer}` : ''}
                  </Text>
                  {c.date ? <Text style={styles.dateText}>{c.date}</Text> : null}
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
                      <View style={styles.eduRow}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.metaText}>{item.subtitle}</Text>
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
