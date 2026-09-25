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
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 6,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  datedRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dateCol: {
    width: 96,
  },
  dateMain: {
    fontSize: 9.5,
    fontWeight: 'bold',
    lineHeight: 1.35,
  },
  dateEnd: {
    fontSize: 9.5,
    fontWeight: 'bold',
    lineHeight: 1.35,
    color: '#6B7280',
  },
  contentCol: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 14,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  companyText: {
    fontSize: 9.5,
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
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  schoolText: {
    fontSize: 9,
    color: '#374151',
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  linkText: {
    fontSize: 8,
    color: '#4B5563',
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

export default function Tenure({ data }: { data: ResumeData }) {
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.datedRow}>
                <View style={styles.dateCol}>
                  <Text style={styles.dateMain}>{exp.startDate}</Text>
                  <Text style={styles.dateEnd}>{exp.endDate}</Text>
                </View>
                <View style={styles.contentCol}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
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
              </View>
            ))}
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.datedRow}>
                <View style={styles.dateCol}>
                  <Text style={styles.dateMain}>{edu.graduationYear}</Text>
                </View>
                <View style={styles.contentCol}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
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
              <View key={proj.id} style={styles.datedRow}>
                <View style={styles.dateCol}>
                  {proj.link ? <Text style={styles.linkText}>{proj.link}</Text> : null}
                </View>
                <View style={styles.contentCol}>
                  <Text style={styles.degreeText}>{proj.name}</Text>
                  {proj.description ? <Text style={styles.smallText}>{proj.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.datedRow}>
                <View style={styles.dateCol}>
                  <Text style={styles.dateMain}>{cert.date}</Text>
                </View>
                <View style={styles.contentCol}>
                  <Text style={styles.smallText}>
                    <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text> — {cert.issuer}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
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
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.datedRow}>
                      <View style={styles.dateCol}>
                        {item.date ? <Text style={styles.dateMain}>{item.date}</Text> : null}
                      </View>
                      <View style={styles.contentCol}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
                        {item.description ? <Text style={styles.smallText}>{item.description}</Text> : null}
                      </View>
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
