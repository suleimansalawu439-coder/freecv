import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 56,
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 7,
    color: '#111827',
    lineHeight: 1.3,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 5,
    color: '#6B7280',
    marginTop: 10,
  },
  contact: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#9CA3AF',
    marginTop: 10,
    lineHeight: 1.9,
  },
  rule: {
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
    marginTop: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 5,
    color: '#111827',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.85,
    letterSpacing: 0.6,
  },
  expItem: {
    marginBottom: 16,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    color: '#6B7280',
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.8,
    letterSpacing: 0.6,
  },
  skillsText: {
    fontSize: 9.5,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#1F2937',
    lineHeight: 2.4,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#111827',
  },
  eduDegree: {
    fontSize: 9.5,
    color: '#4B5563',
    letterSpacing: 0.6,
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCell: {
    width: '50%',
    paddingRight: 20,
    marginBottom: 10,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#6B7280',
    letterSpacing: 0.6,
    lineHeight: 1.5,
    marginTop: 2,
  },
});

export default function Kerning({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
          <View style={styles.rule} />
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))
                  : null}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  {edu.school ? <Text style={styles.eduSchool}>{edu.school}</Text> : null}
                  {edu.degree ? <Text style={styles.eduDegree}>{edu.degree}</Text> : null}
                </View>
                {edu.graduationYear ? <Text style={styles.dateText}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join('   ·   ')}</Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 12 }}>
                <Text style={styles.roleTitle}>
                  {proj.name}
                  {proj.link ? <Text style={styles.dateText}> — {proj.link}</Text> : null}
                </Text>
                {proj.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={[styles.bodyText, { marginBottom: 6 }]}>
                <Text style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.4 }}>{cert.name}</Text>
                {cert.issuer ? <Text> — {cert.issuer}</Text> : null}
                {cert.date ? <Text style={{ color: '#9CA3AF' }}> · {cert.date}</Text> : null}
              </Text>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 12 }}>
                    <View style={styles.expHeaderRow}>
                      {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null
          )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCell}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  {ref.title || ref.company ? (
                    <Text style={styles.refDetail}>
                      {ref.title}
                      {ref.title && ref.company ? ', ' : ''}
                      {ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
