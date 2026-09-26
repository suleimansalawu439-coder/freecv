import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const CLUSTER_LABELS = ['Technical', 'Leadership', 'Domain'];

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 44,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'medium',
  },
  contactLine: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 6,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitleContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#1a1a1a',
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  /* Competency clusters */
  clusterGrid: {
    flexDirection: 'row',
    gap: 18,
  },
  clusterCol: {
    flex: 1,
  },
  clusterLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
    marginBottom: 6,
  },
  clusterSkill: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
  },
  /* One-line rows */
  rowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  rowMain: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  rowSub: {
    fontSize: 9.5,
    fontWeight: 'normal',
    color: '#4b5563',
  },
  rowDates: {
    fontSize: 8,
    color: '#6b7280',
  },
  linkText: {
    fontSize: 8,
    textDecoration: 'none',
  },
});

export default function Pivot({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Split skills into three clusters (no invented skills — names only)
  const third = Math.ceil(data.skills.length / 3);
  const clusters = CLUSTER_LABELS.map((label, i) => ({
    label,
    items: data.skills.slice(i * third, (i + 1) * third),
  })).filter((c) => c.items.length > 0);

  const sectionTitle = (title: string) => (
    <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{info.fullName}</Text>
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactBits.length > 0 ? (
            <Text style={styles.contactLine}>{contactBits.join('  ·  ')}</Text>
          ) : null}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            {sectionTitle('Summary')}
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          // Core Competencies — skills-first
          skills: clusters.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Core Competencies')}
            <View style={styles.clusterGrid}>
              {clusters.map((cluster) => (
                <View key={cluster.label} style={styles.clusterCol}>
                  <Text style={[styles.clusterLabel, { color: themeColor }]}>
                    {cluster.label}
                  </Text>
                  {cluster.items.map((skill) => (
                    <Text key={skill.id} style={styles.clusterSkill}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // Work History — one line each, no descriptions
        experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Work History')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.rowLine}>
                <Text style={styles.rowMain}>
                  {exp.role}
                  {exp.company ? <Text style={styles.rowSub}> — {exp.company}</Text> : null}
                </Text>
                <Text style={styles.rowDates}>
                  {exp.startDate}
                  {exp.startDate && exp.endDate ? ' – ' : ''}
                  {exp.endDate}
                </Text>
              </View>
            ))}
          </View>
        ) : null,

        // Education
        education: data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.rowLine}>
                <Text style={styles.rowMain}>
                  {edu.degree}
                  {edu.school ? <Text style={styles.rowSub}> — {edu.school}</Text> : null}
                </Text>
                {edu.graduationYear ? (
                  <Text style={styles.rowDates}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null,

        // Projects
        projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={styles.rowMain}>
                  {proj.name}
                  {proj.description ? <Text style={styles.rowSub}> — {proj.description}</Text> : null}
                  {proj.link ? (
                    <Text>
                      {' '}
                      <Link src={proj.link} style={[styles.linkText, { color: themeColor }]}>
                        Link
                      </Link>
                    </Text>
                  ) : null}
                </Text>
              </View>
            ))}
          </View>
        ) : null,

        // Certifications
        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.rowLine}>
                <Text style={styles.rowMain}>
                  {cert.name}
                  {cert.issuer ? <Text style={styles.rowSub}> — {cert.issuer}</Text> : null}
                </Text>
                {cert.date ? <Text style={styles.rowDates}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null,

        // References
        references: data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('References')}
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 6 }}>
                <Text style={styles.rowMain}>
                  {ref.name}
                  {ref.title || ref.company ? (
                    <Text style={styles.rowSub}>
                      {' '}
                      — {ref.title}
                      {ref.title && ref.company ? ' @ ' : ''}
                      {ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.rowDates}> · {ref.contact}</Text> : null}
                </Text>
              </View>
            ))}
          </View>
        ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                {sectionTitle(section.title)}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.rowLine}>
                    <Text style={styles.rowMain}>
                      {item.title}
                      {item.subtitle ? (
                        <Text style={styles.rowSub}> — {item.subtitle}</Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.rowSub}> · {item.description}</Text>
                      ) : null}
                    </Text>
                    {item.date ? <Text style={styles.rowDates}>{item.date}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
