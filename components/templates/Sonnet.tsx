import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#111827',
    paddingTop: 60,
    paddingBottom: 56,
    paddingHorizontal: 70,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 8.5,
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 1.6,
    marginBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#374151',
    letterSpacing: 1,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 10.5,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 2,
    color: '#1F2937',
    paddingHorizontal: 20,
  },
  stanza: {
    alignItems: 'center',
    marginBottom: 26,
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  companyText: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#6B7280',
    letterSpacing: 2,
    marginBottom: 10,
  },
  verseLine: {
    fontSize: 10.5,
    lineHeight: 1.9,
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 6,
    paddingHorizontal: 20,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  skillsText: {
    fontSize: 10.5,
    lineHeight: 2.2,
    textAlign: 'center',
    color: '#1F2937',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  refName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4B5563',
  },
});

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>— {title} —</Text>;
}

export default function Sonnet({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('   ·   ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Profile" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.stanza}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                <Text style={styles.dateText}>
                  {exp.startDate} — {exp.endDate}
                </Text>
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <Text key={i} style={styles.verseLine}>{line.trim()}</Text>
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
              <View key={edu.id} style={styles.stanza}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.companyText}>{edu.school}</Text>
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((s) => s.name).join('   ·   ')}
            </Text>
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.stanza}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.description ? <Text style={styles.verseLine}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.stanza}>
                <Text style={styles.eduDegree}>{cert.name}</Text>
                <Text style={styles.companyText}>
                  {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="References" />
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.stanza}>
                <Text style={styles.refName}>{ref.name}</Text>
                <Text style={styles.refDetail}>
                  {ref.title}{ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.customSections && data.customSections.length > 0
          ? data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  <SectionHeader title={section.title} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.stanza}>
                      <Text style={styles.eduDegree}>{item.title}</Text>
                      {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      {item.description ? <Text style={styles.verseLine}>{item.description}</Text> : null}
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
