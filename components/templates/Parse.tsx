import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#000000',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    marginBottom: 6,
  },
  contactLine: {
    fontSize: 8.5,
    marginBottom: 2,
  },
  headerBlock: {
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  roleLine: {
    fontSize: 9.5,
    marginBottom: 1,
  },
  roleBold: {
    fontWeight: 'bold',
  },
  dateLine: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 10,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  eduItem: {
    marginBottom: 6,
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  graySmall: {
    fontSize: 8,
    color: '#4B5563',
  },
});

export default function Parse({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {info.email ? <Text style={styles.contactLine}>{info.email}</Text> : null}
          {info.phone ? <Text style={styles.contactLine}>{info.phone}</Text> : null}
          {info.location ? <Text style={styles.contactLine}>{info.location}</Text> : null}
          {info.website ? <Text style={styles.contactLine}>{info.website}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.roleLine}>
                  <Text style={styles.roleBold}>{exp.role}</Text>
                  {exp.company ? `, ${exp.company}` : ''}
                </Text>
                <Text style={styles.dateLine}>{exp.startDate} - {exp.endDate}</Text>
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))
                  : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <Text style={styles.smallText}>
                  <Text style={styles.roleBold}>{edu.degree}</Text>
                  {edu.school ? `, ${edu.school}` : ''}
                </Text>
                {edu.graduationYear ? <Text style={styles.graySmall}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.smallText}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={styles.smallText}>
                  <Text style={styles.roleBold}>{proj.name}</Text>
                  {proj.link ? ` (${proj.link})` : ''}
                </Text>
                {proj.description ? <Text style={styles.smallText}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={styles.smallText}>
                <Text style={styles.roleBold}>{cert.name}</Text>
                {cert.issuer ? `, ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
              </Text>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.eduItem}>
                <Text style={styles.roleBold}>{ref.name}</Text>
                <Text style={styles.graySmall}>
                  {ref.title}{ref.company ? `, ${ref.company}` : ''}{ref.contact ? ` — ${ref.contact}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.customSections && data.customSections.length > 0
          ? data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.experienceItem}>
                      <Text style={styles.smallText}>
                        <Text style={styles.roleBold}>{item.title}</Text>
                        {item.date ? ` (${item.date})` : ''}
                      </Text>
                      {item.subtitle ? <Text style={styles.graySmall}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.smallText}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              ) : null
            )
          : null}
      </Page>
    </Document>
  );
}
