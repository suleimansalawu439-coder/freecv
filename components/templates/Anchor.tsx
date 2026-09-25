import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
  },
  sidebar: {
    width: '35%',
    padding: 28,
    borderRightWidth: 2,
    flexDirection: 'column',
  },
  monogram: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  monogramText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 6,
  },
  skillItem: {
    fontSize: 9.5,
    color: '#111827',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },
  eduItem: {
    marginBottom: 12,
  },
  main: {
    width: '65%',
    padding: 32,
    flexDirection: 'column',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 24,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyText: {
    fontSize: 10.5,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
    marginTop: 3,
  },
  projectItem: {
    marginBottom: 10,
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
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customItem: {
    marginBottom: 10,
  },
});

export default function Anchor({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName.split(' ').map((w) => w.charAt(0)).slice(0, 2).join('')
    : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { borderRightColor: themeColor }]}>
          {initials ? (
            <View style={[styles.monogram, { borderColor: themeColor }]}>
              <Text style={[styles.monogramText, { color: themeColor }]}>{initials}</Text>
            </View>
          ) : null}

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
              {data.skills.map((s) => (
                <Text key={s.id} style={styles.skillItem}>
                  {s.name}
                </Text>
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
              <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>
                Profile
              </Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>
                Experience
              </Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} — {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.companyText}>{exp.company}</Text>
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
              <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>
                Projects
              </Text>
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
              <Text style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}>
                References
              </Text>
              <View style={styles.refGrid}>
                {data.references.map((r) => (
                  <View key={r.id} style={styles.refCard}>
                    <Text style={styles.refName}>{r.name}</Text>
                    <Text style={styles.refDetail}>
                      {r.title}
                      {r.company ? `, ${r.company}` : ''}
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
                  <Text
                    style={[styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }]}
                  >
                    {section.title}
                  </Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.customItem}>
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.companyText}>{item.subtitle}</Text>
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
