import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 64,
    paddingHorizontal: 64,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 1.05,
  },
  underline: {
    height: 5,
    width: 84,
    marginTop: 16,
    marginBottom: 18,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contact: {
    fontSize: 10,
    color: '#4B5563',
  },
  headerBlock: {
    marginBottom: 36,
  },
  section: {
    marginBottom: 34,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    marginBottom: 16,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.9,
    color: '#374151',
  },
  expItem: {
    marginBottom: 22,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  role: {
    fontSize: 12.5,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletDash: {
    width: 14,
    fontSize: 10.5,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 1.75,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  degree: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  school: {
    fontSize: 10.5,
    color: '#4B5563',
  },
  skillsText: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 2,
  },
  projectName: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  projectDesc: {
    fontSize: 10.5,
    lineHeight: 1.75,
    color: '#374151',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  certText: {
    fontSize: 10.5,
  },
  certName: {
    fontWeight: 'bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 12,
  },
  refName: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 10,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  customSubtitle: {
    fontSize: 10.5,
    color: '#4B5563',
    marginBottom: 4,
  },
  customDesc: {
    fontSize: 10.5,
    lineHeight: 1.75,
    color: '#374151',
  },
});

export default function Jumbotron({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.headerBlock}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          <View style={[styles.underline, { backgroundColor: themeColor }]} />
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
                </View>
                <Text style={[styles.company, { color: themeColor }]}>{exp.company}</Text>
                {exp.description
                  .split(/\n|\r?\n/)
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={[styles.bulletDash, { color: themeColor }]}>—</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        ),

          education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
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
        ),

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join('   ·   ')}</Text>
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
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
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
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
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? ` · ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ),
          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
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
            ))
        )}
      </Page>
    </Document>
  );
}
