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
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10.5,
    color: '#374151',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 16,
  },
  summaryBox: {
    borderWidth: 2,
    borderColor: '#111827',
    padding: 14,
    marginBottom: 18,
  },
  summaryBoxTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTick: {
    width: 16,
    height: 3,
    backgroundColor: '#111827',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
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
    color: '#4B5563',
  },
  companyText: {
    fontSize: 9.5,
    fontStyle: 'italic',
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
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  schoolText: {
    fontSize: 9,
    color: '#374151',
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
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={styles.sectionTick} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Gateway({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryBoxTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
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
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Skills" />
            <Text style={styles.smallText}>{data.skills.map((s) => s.name).join(' · ')}</Text>
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={styles.degreeText}>
                  {proj.name}{proj.link ? ` (${proj.link})` : ''}
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
                <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> — {cert.issuer}
                {cert.date ? ` · ${cert.date}` : ''}
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
