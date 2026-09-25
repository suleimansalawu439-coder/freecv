import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 56,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 8,
    lineHeight: 1.3,
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 1.6,
  },
  section: {
    marginTop: 26,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  bodyText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.8,
  },
  expItem: {
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3,
  },
  dateText: {
    fontSize: 9,
    color: '#6B7280',
  },
  companyText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 8.5,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.7,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  eduMain: {
    flexDirection: 'column',
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.5,
  },
  eduDegree: {
    fontSize: 9.5,
    color: '#4B5563',
    lineHeight: 1.5,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '33.333%',
    paddingRight: 16,
    paddingBottom: 8,
    marginBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  skillText: {
    fontSize: 9.5,
    color: '#1F2937',
    lineHeight: 1.6,
  },
  projTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCell: {
    width: '50%',
    paddingRight: 16,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
    lineHeight: 1.5,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
});

export default function Lucid({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                <View style={styles.eduMain}>
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
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 10 }}>
                <Text style={styles.projTitle}>
                  {proj.name}
                  {proj.link ? <Text style={styles.customMeta}>  ({proj.link})</Text> : null}
                </Text>
                {proj.description ? <Text style={[styles.bodyText, { marginTop: 3 }]}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.bodyText}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={styles.customMeta}> — {cert.issuer}</Text> : null}
                </Text>
                {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
              </View>
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
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View style={styles.expHeaderRow}>
                      {item.title ? <Text style={styles.customTitle}>{item.title}</Text> : null}
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={[styles.customMeta, { fontStyle: 'italic' }]}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={[styles.bodyText, { marginTop: 3 }]}>{item.description}</Text> : null}
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
