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
    width: '35%',
    flexDirection: 'column',
  },
  nameBlock: {
    padding: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 1.2,
    marginBottom: 4,
  },
  nameTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: 'rgba(255,255,255,0.85)',
  },
  sidebarBody: {
    padding: 24,
    flex: 1,
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 22,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#374151',
    marginBottom: 5,
  },
  barBlock: {
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
  },
  barTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F3F4F6',
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  eduYear: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 1,
  },
  eduItem: {
    marginBottom: 10,
  },
  main: {
    width: '65%',
    padding: 30,
    flexDirection: 'column',
  },
  quoteBlock: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    paddingVertical: 4,
    marginBottom: 24,
  },
  quoteText: {
    fontSize: 10.5,
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#4B5563',
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
    marginBottom: 12,
  },
  expItem: {
    marginBottom: 16,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9,
    fontWeight: 'bold',
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

export default function Headland({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={[styles.nameBlock, { backgroundColor: themeColor }]}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? <Text style={styles.nameTitle}>{info.jobTitle}</Text> : null}
          </View>

          <View style={styles.sidebarBody}>
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
                {data.skills.map((s, i) => (
                  <View key={s.id} style={styles.barBlock}>
                    <Text style={styles.barLabel}>{s.name}</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[styles.barFill, { width: `${66 + ((i * 43) % 30)}%`, backgroundColor: themeColor }]}
                      />
                    </View>
                  </View>
                ))}
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
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.main}>
          {data.summary ? (
            <View style={[styles.quoteBlock, { borderLeftColor: themeColor }]}>
              <Text style={styles.quoteText}>“{data.summary}”</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                  <Text style={[styles.companyText, { color: themeColor }]}>{exp.company}</Text>
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
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.bulletText}>{item.subtitle}</Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.bulletText}>{item.description}</Text>
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
