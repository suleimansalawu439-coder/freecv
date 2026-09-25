import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  container: {
    paddingTop: 36,
    paddingHorizontal: 44,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#292524',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contact: {
    fontSize: 8.5,
    color: '#78716C',
    marginBottom: 12,
  },
  headerDash: {
    width: 70,
    height: 5,
    borderRadius: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleUnderline: {
    width: 44,
    height: 3,
    borderRadius: 2,
    marginBottom: 12,
  },
  summaryBox: {
    borderRadius: 10,
    padding: 14,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#44403C',
    lineHeight: 1.6,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#292524',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#78716C',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: '#78716C',
    width: 10,
  },
  bulletText: {
    fontSize: 9,
    color: '#44403C',
    lineHeight: 1.5,
    flex: 1,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  eduRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eduDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 10,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#292524',
  },
  eduSchool: {
    fontSize: 9,
    color: '#57534E',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#78716C',
  },
  eduMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  projectDesc: {
    fontSize: 9,
    color: '#44403C',
    lineHeight: 1.5,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#292524',
  },
  certDetail: {
    fontSize: 8.5,
    color: '#78716C',
  },
  refRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 8,
    padding: 10,
    marginRight: '2%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#292524',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#57534E',
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#292524',
    marginBottom: 2,
  },
  customSubtitle: {
    fontSize: 9,
    color: '#57534E',
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 9,
    color: '#44403C',
    lineHeight: 1.5,
  },
});

export default function Ochre({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const SectionHeader = ({ title }: { title: string }) => (
    <View>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      <View style={[styles.titleUnderline, { backgroundColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
            ) : null}
            {contactItems.length > 0 ? (
              <Text style={styles.contact}>{contactItems.join('   ·   ')}</Text>
            ) : null}
            <View style={[styles.headerDash, { backgroundColor: themeColor }]} />
          </View>

          {data.summary ? (
            <View style={styles.section}>
              <View style={[styles.summaryBox, { backgroundColor: withAlpha(themeColor, 0.08) }]}>
                <SectionHeader title="About Me" />
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Work Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.card}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
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

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Skills" />
              <View style={styles.skillsRow}>
                {data.skills.map((skill) => (
                  <View
                    key={skill.id}
                    style={[styles.skillChip, { backgroundColor: withAlpha(themeColor, 0.14) }]}
                  >
                    <Text style={[styles.skillText, { color: themeColor }]}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View style={[styles.eduDot, { backgroundColor: themeColor }]} />
                  <View style={styles.eduMain}>
                    <View>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                    </View>
                    <Text style={styles.eduYear}>{edu.graduationYear}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {data.showProjects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.card}>
                  <Text style={styles.roleTitle}>
                    {proj.name}{proj.link ? <Text style={styles.certDetail}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name} <Text style={styles.certDetail}>· {cert.issuer}</Text>
                  </Text>
                  <Text style={styles.certDetail}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="References" />
              <View style={styles.refRow}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    <Text style={styles.refDetail}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.customSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <SectionHeader title={section.title} />
              {section.items.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                  </View>
                  {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                  {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
