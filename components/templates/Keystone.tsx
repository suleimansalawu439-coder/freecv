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
    width: '30%',
    padding: 22,
    flexDirection: 'column',
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 22,
  },
  keySkillCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 7,
  },
  keySkillText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contactItem: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 5,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.9)',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduSchool: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.75)',
  },
  eduYear: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 1,
  },
  eduItem: {
    marginBottom: 10,
  },
  main: {
    width: '70%',
    padding: 28,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: '#111827',
    marginBottom: 4,
  },
  sectionBar: {
    width: 28,
    height: 3,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.55,
    color: '#4B5563',
  },
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleText: {
    fontSize: 10.5,
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
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#6B7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 9,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  certName: {
    fontSize: 9,
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
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#6B7280',
  },
});

export default function Keystone({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const keySkills = data.skills ? data.skills.slice(0, 4) : [];
  const restSkills = data.skills ? data.skills.slice(4) : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { backgroundColor: themeColor }]}>
          {keySkills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarTitle}>Key Skills</Text>
              {keySkills.map((s) => (
                <View key={s.id} style={styles.keySkillCard}>
                  <Text style={styles.keySkillText}>{s.name}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {restSkills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarTitle}>More Skills</Text>
              <View style={styles.chipRow}>
                {restSkills.map((s) => (
                  <View key={s.id} style={styles.chip}>
                    <Text style={styles.chipText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarTitle}>Education</Text>
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
        </View>

        <View style={styles.main}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
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
              <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
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
              <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
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
              <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
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
                  <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
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
