import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
  },
  runningHead: {
    paddingHorizontal: 56,
    paddingTop: 28,
  },
  runningHeadText: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
  },
  runningRule: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    marginTop: 8,
  },
  header: {
    paddingHorizontal: 56,
    paddingTop: 28,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 26,
    color: '#111827',
  },
  folioLabel: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#9CA3AF',
  },
  deck: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 6,
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 8,
  },
  body: {
    paddingHorizontal: 56,
    flex: 1,
  },
  folioHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12,
  },
  folioHeadText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#111827',
    marginRight: 12,
  },
  folioHeadRule: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D1D5DB',
  },
  bodyText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.85,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#9CA3AF',
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
  footer: {
    paddingHorizontal: 56,
    paddingBottom: 28,
    paddingTop: 24,
  },
  footerText: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#9CA3AF',
    textAlign: 'center',
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

function FolioHead({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.folioHeadRow}>
      <Text style={styles.folioHeadText}>{children}</Text>
      <View style={styles.folioHeadRule} />
    </View>
  );
}

export default function Folio({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.runningHead}>
          <Text style={[styles.runningHeadText, { color: themeColor }]}>
            {info.fullName || 'Curriculum Vitae'}
            {info.fullName ? '  ·  Résumé' : ''}
          </Text>
          <View style={styles.runningRule} />
        </View>

        <View style={styles.header}>
          <View style={styles.headerRow}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            <Text style={styles.folioLabel}>Curriculum Vitae</Text>
          </View>
          {info.jobTitle ? <Text style={styles.deck}>{info.jobTitle}</Text> : null}
          {contact.length > 0 ? <Text style={styles.contact}>{contact.join('  |  ')}</Text> : null}
        </View>

        <View style={styles.body}>
          {data.summary ? (
            <View>
              <FolioHead>Profile</FolioHead>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 && (
            <View>
              <FolioHead>Experience</FolioHead>
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
                  {exp.company ? <Text style={styles.metaItalic}>{exp.company}</Text> : null}
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
            <View>
              <FolioHead>Education</FolioHead>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.expHeaderRow}>
                  <View>
                    {edu.school ? <Text style={styles.roleTitle}>{edu.school}</Text> : null}
                    {edu.degree ? <Text style={styles.metaItalic}>{edu.degree}</Text> : null}
                  </View>
                  {edu.graduationYear ? <Text style={styles.dateText}>{edu.graduationYear}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.skills && data.skills.length > 0 && (
            <View>
              <FolioHead>Skills</FolioHead>
              <Text style={styles.bodyText}>{data.skills.map((s) => s.name).join('  ·  ')}</Text>
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <FolioHead>Projects</FolioHead>
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
            <View>
              <FolioHead>Certifications</FolioHead>
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={[styles.bodyText, { marginBottom: 6 }]}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ fontStyle: 'italic' }}>, {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#9CA3AF' }}> — {cert.date}</Text> : null}
                </Text>
              ))}
            </View>
          )}

          {data.customSections &&
            data.customSections.length > 0 &&
            data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id}>
                  <FolioHead>{section.title}</FolioHead>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 12 }}>
                      <View style={styles.expHeaderRow}>
                        {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.metaItalic}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              ) : null
            )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <FolioHead>References</FolioHead>
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
        </View>

        <View style={styles.footer}>
          <View style={styles.runningRule} />
          <Text style={[styles.footerText, { marginTop: 8 }]}>
            {info.fullName || 'Résumé'}  ·  Folio 1
          </Text>
        </View>
      </Page>
    </Document>
  );
}
