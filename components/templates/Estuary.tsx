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
    width: '30%',
    padding: 24,
    flexDirection: 'column',
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 9,
    marginRight: 4,
    marginBottom: 4,
  },
  pillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduSchool: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.8)',
  },
  eduYear: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.6)',
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
    fontSize: 10.5,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: '#111827',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
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
    color: '#6B7280',
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

export default function Estuary({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const cardBg = mixWithWhite(themeColor, 0.07);
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { backgroundColor: themeColor }]}>
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarTitle}>Skills</Text>
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

          {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarTitle}>Certifications</Text>
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
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}

          {data.summary ? (
            <View style={[styles.card, { backgroundColor: cardBg }]}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={[styles.card, { backgroundColor: cardBg }]}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{exp.role}</Text>
                    <Text style={styles.dateText}>
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
            <View style={[styles.card, { backgroundColor: cardBg }]}>
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
            <View style={[styles.card, { backgroundColor: cardBg }]}>
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
                <View key={section.id} style={[styles.card, { backgroundColor: cardBg }]}>
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
