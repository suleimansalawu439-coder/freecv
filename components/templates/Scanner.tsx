import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 14,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 4,
    marginBottom: 8,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '33.33%',
    marginBottom: 4,
    paddingRight: 8,
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  companyText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
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
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  eduText: {
    fontSize: 9.5,
  },
  eduBold: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 6,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 8,
    color: '#4B5563',
  },
});

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export default function Scanner({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  |  ')}</Text>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Core Competencies" />
            <View style={styles.skillGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={styles.skillText}>• {skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Professional Summary" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Professional Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
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
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <Text style={styles.eduText}>
                  <Text style={styles.eduBold}>{edu.degree}</Text> — {edu.school}
                </Text>
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={styles.smallText}>
                  <Text style={styles.eduBold}>{proj.name}</Text>
                  {proj.link ? ` — ${proj.link}` : ''}
                </Text>
                {proj.description ? <Text style={styles.smallText}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={[styles.smallText, { marginBottom: 3 }]}>
                <Text style={styles.eduBold}>{cert.name}</Text> — {cert.issuer}
                {cert.date ? ` (${cert.date})` : ''}
              </Text>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="References" />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}{ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.customSections && data.customSections.length > 0
          ? data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  <SectionHeader title={section.title} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.experienceItem}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
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
