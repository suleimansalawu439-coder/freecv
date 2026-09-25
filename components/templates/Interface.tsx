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
    width: '30%',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 6,
  },
  contactGroup: {
    marginBottom: 32,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 28,
  },
  skillName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  skillRow: {
    marginBottom: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduMeta: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 10,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 8,
  },
  main: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
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
    color: '#111827',
    marginBottom: 6,
  },
  hairline: {
    height: 1,
    backgroundColor: '#E5E7EB',
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
});

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Interface({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName
        .split(' ')
        .map((w) => w.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  const dots = (level: number) => (
    <View style={styles.dotsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i <= level ? themeColor : 'rgba(0,0,0,0.12)' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { backgroundColor: hexToRgba(themeColor, 0.08) }]}>
          {initials ? (
            <View style={[styles.avatar, { backgroundColor: themeColor }]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          ) : null}

          <View style={styles.contactGroup}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {data.skills.map((skill, i) => (
                <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  {dots(3 + ((i * 37) % 3))}
                </View>
              ))}
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduMeta}>
                    {edu.school}
                    {edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.main}>
          <Text style={styles.name}>{info.fullName}</Text>
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <View style={styles.hairline} />
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.hairline} />
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

          {data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              <View style={styles.hairline} />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.roleTitle}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                  <Text style={styles.bodyText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              <View style={styles.hairline} />
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
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.hairline} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.projectItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.eduMeta}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.bodyText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
}
