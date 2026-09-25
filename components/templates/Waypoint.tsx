import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

function mixWithWhite(hex: string, weight: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  const r = Math.round(((n >> 16) & 255) * weight + 255 * (1 - weight));
  const g = Math.round(((n >> 8) & 255) * weight + 255 * (1 - weight));
  const b = Math.round((n & 255) * weight + 255 * (1 - weight));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '28%',
    padding: 22,
    flexDirection: 'column',
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#374151',
    marginBottom: 5,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2.5,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginTop: 2,
  },
  timelineRole: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3,
  },
  timelineCompany: {
    fontSize: 8,
    color: '#6B7280',
  },
  timelineDates: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginTop: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 8,
    color: '#374151',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#4B5563',
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
    width: '72%',
    padding: 30,
    flexDirection: 'column',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: '#111827',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#4B5563',
  },
  expItem: {
    marginBottom: 18,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  companyText: {
    fontSize: 9.5,
    color: '#6B7280',
    marginBottom: 7,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
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

export default function Waypoint({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const tintBg = mixWithWhite(themeColor, 0.09);
  const chipBg = mixWithWhite(themeColor, 0.12);
  const chipBorder = mixWithWhite(themeColor, 0.25);
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { backgroundColor: tintBg }]}>
          <View style={styles.sidebarBlock}>
            <Text style={[styles.sidebarTitle, { color: themeColor }]}>Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>Career Path</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { borderColor: themeColor }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.timelineRole}>{exp.role}</Text>
                    <Text style={styles.timelineCompany}>{exp.company}</Text>
                    <Text style={styles.timelineDates}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>Skills</Text>
              <View style={styles.chipRow}>
                {data.skills.map((s) => (
                  <View key={s.id} style={[styles.chip, { backgroundColor: chipBg, borderColor: chipBorder }]}>
                    <Text style={styles.chipText}>{s.name}</Text>
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
        </View>

        <View style={styles.main}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}

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
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{exp.role}</Text>
                    <Text style={[styles.dateText, { color: themeColor }]}>
                      {exp.startDate} – {exp.endDate}
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
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? (
                          <Text style={[styles.dateText, { color: themeColor }]}>{item.date}</Text>
                        ) : null}
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
