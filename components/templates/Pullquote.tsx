import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    padding: 56,
    flexDirection: 'column',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 26,
    color: '#111827',
    textAlign: 'center',
  },
  deck: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 4,
    textAlign: 'center',
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  quoteBlock: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 32,
  },
  quoteMark: {
    fontSize: 40,
    lineHeight: 1,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#1F2937',
    lineHeight: 1.6,
    textAlign: 'center',
    marginTop: -8,
  },
  quoteRule: {
    width: 48,
    height: 2,
    marginTop: 14,
  },
  quoteHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12,
  },
  quoteHeadBar: {
    width: 3,
    alignSelf: 'stretch',
    marginRight: 12,
  },
  quoteHeadText: {
    fontSize: 14,
    color: '#111827',
  },
  bodyText: {
    fontSize: 10,
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 9,
    color: '#1F2937',
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

function QuoteHead({ children, themeColor }: { children: React.ReactNode; themeColor: string }) {
  return (
    <View style={styles.quoteHeadRow}>
      <View style={[styles.quoteHeadBar, { backgroundColor: themeColor }]} />
      <Text style={styles.quoteHeadText}>{children}</Text>
    </View>
  );
}

export default function Pullquote({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
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
          <View style={styles.quoteBlock}>
            <Text style={[styles.quoteMark, { color: themeColor }]}>&ldquo;</Text>
            <Text style={styles.quoteText}>{data.summary}</Text>
            <View style={[styles.quoteRule, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            <QuoteHead themeColor={themeColor}>Experience</QuoteHead>
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

        {data.skills && data.skills.length > 0 && (
          <View>
            <QuoteHead themeColor={themeColor}>Skills</QuoteHead>
            <View style={styles.chipRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.chip}>
                  <Text style={styles.chipText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View>
            <QuoteHead themeColor={themeColor}>Education</QuoteHead>
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

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <QuoteHead themeColor={themeColor}>Projects</QuoteHead>
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
            <QuoteHead themeColor={themeColor}>Certifications</QuoteHead>
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
                <QuoteHead themeColor={themeColor}>{section.title}</QuoteHead>
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
            <QuoteHead themeColor={themeColor}>References</QuoteHead>
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
