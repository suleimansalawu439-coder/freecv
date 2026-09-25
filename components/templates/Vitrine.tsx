import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 60,
    paddingHorizontal: 60,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#111827',
  },
  headerBlock: {
    position: 'relative',
    marginBottom: 28,
  },
  circle: {
    position: 'absolute',
    top: -34,
    left: -34,
    width: 168,
    height: 168,
    borderRadius: 84,
    opacity: 0.12,
  },
  name: {
    fontSize: 34,
    fontFamily: 'Times-Bold',
    lineHeight: 1.08,
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 6,
  },
  contact: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.6,
    marginBottom: 12,
  },
  summary: {
    fontSize: 10.5,
    fontStyle: 'italic',
    lineHeight: 1.8,
    color: '#374151',
  },
  expItem: {
    borderLeftWidth: 2,
    paddingLeft: 12,
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 11.5,
    fontFamily: 'Times-Bold',
  },
  dates: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  company: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 12,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  school: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  certText: {
    fontSize: 10,
  },
  certName: {
    fontFamily: 'Times-Bold',
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
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  customSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
    marginTop: 2,
  },
});

export default function Vitrine({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('   ·   ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          <View style={[styles.circle, { backgroundColor: themeColor }]} />
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text> : null}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Profile</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={[styles.expItem, { borderLeftColor: themeColor }]}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                {exp.description
                  .split(/\n|\r?\n/)
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={[styles.bulletMark, { color: themeColor }]}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.school}>{edu.school}</Text>
                </View>
                <Text style={styles.dates}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
            <View style={styles.chipsRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={[styles.chip, { borderColor: themeColor }]}>
                  <Text style={[styles.chipText, { color: themeColor }]}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.dates}>{proj.link}</Text> : null}
                </View>
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.certText}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
                </Text>
                <Text style={styles.dates}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id} style={styles.card}>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      <View style={styles.expHeaderRow}>
                        <Text style={styles.customTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dates}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
