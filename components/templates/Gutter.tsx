import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingHorizontal: 64,
    paddingVertical: 56,
    flexDirection: 'column',
  },
  headerBlock: {
    marginLeft: 118,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    color: '#111827',
    lineHeight: 1.2,
  },
  deck: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 4,
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 8,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#111827',
    marginBottom: 14,
  },
  marginRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  marginNote: {
    width: 104,
    marginRight: 14,
    alignItems: 'flex-end',
  },
  marginNoteText: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#9CA3AF',
    lineHeight: 1.5,
    textAlign: 'right',
  },
  marginBody: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3,
  },
  metaItalic: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 2,
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
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.8,
  },
  bodyText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.85,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCell: {
    width: '50%',
    paddingRight: 16,
    marginBottom: 10,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
    lineHeight: 1.5,
  },
});

function MarginRow({ margin, children }: { margin?: string; children: React.ReactNode }) {
  return (
    <View style={styles.marginRow}>
      <View style={styles.marginNote}>
        {margin ? <Text style={styles.marginNoteText}>{margin}</Text> : null}
      </View>
      <View style={styles.marginBody}>{children}</View>
    </View>
  );
}

export default function Gutter({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.deck}>{info.jobTitle}</Text> : null}
          {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <MarginRow>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </MarginRow>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <MarginRow
                key={exp.id}
                margin={
                  exp.startDate || exp.endDate
                    ? `${exp.startDate}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate}`
                    : undefined
                }
              >
                <Text style={styles.roleTitle}>{exp.role}</Text>
                {exp.company ? <Text style={styles.metaItalic}>{exp.company}</Text> : null}
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))
                  : null}
              </MarginRow>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <MarginRow key={edu.id} margin={edu.graduationYear || undefined}>
                {edu.school ? <Text style={styles.roleTitle}>{edu.school}</Text> : null}
                {edu.degree ? <Text style={styles.metaItalic}>{edu.degree}</Text> : null}
              </MarginRow>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <MarginRow margin={`${data.skills.length} areas`}>
              <Text style={styles.bodyText}>{data.skills.map((s) => s.name).join('  ·  ')}</Text>
            </MarginRow>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <MarginRow key={proj.id} margin={proj.link || undefined}>
                <Text style={styles.roleTitle}>{proj.name}</Text>
                {proj.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{proj.description}</Text> : null}
              </MarginRow>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <MarginRow key={cert.id} margin={cert.date || undefined}>
                <Text style={styles.bodyText}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ fontStyle: 'italic' }}>, {cert.issuer}</Text> : null}
                </Text>
              </MarginRow>
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
                  <MarginRow key={item.id} margin={item.date || undefined}>
                    {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                    {item.subtitle ? <Text style={styles.metaItalic}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{item.description}</Text> : null}
                  </MarginRow>
                ))}
              </View>
            ) : null
          )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <MarginRow>
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
            </MarginRow>
          </View>
        )}
      </Page>
    </Document>
  );
}
