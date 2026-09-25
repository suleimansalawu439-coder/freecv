import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

// Ember carries its own warm identity — fixed terracotta, independent of theme.
const EMBER = '#c2410c';
const EMBER_TINT = 'rgba(194, 65, 12, 0.10)';
const EMBER_DEEP = '#7c2d12';
const SERIF = 'Times-Roman';
const SANS = 'Helvetica';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: SANS,
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  masthead: {
    alignItems: 'center',
    marginBottom: 28,
  },
  name: {
    fontFamily: SERIF,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  jobTitle: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 12,
    color: EMBER,
    textAlign: 'center',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    textAlign: 'center',
  },
  pullQuote: {
    borderLeftWidth: 3,
    borderLeftColor: EMBER,
    paddingLeft: 16,
    paddingVertical: 2,
    marginBottom: 28,
  },
  pullQuoteText: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 1.6,
    color: '#1F2937',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 13,
    fontWeight: 'bold',
    color: EMBER,
    marginBottom: 4,
  },
  hairline: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: EMBER_TINT,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: EMBER_DEEP,
  },
  experienceItem: {
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontFamily: SERIF,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateItalic: {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: EMBER,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletGlyph: {
    width: 12,
    fontSize: 7,
    color: EMBER,
    paddingTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  degreeText: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  projTitle: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projDesc: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    borderLeftColor: EMBER,
    paddingLeft: 8,
    marginBottom: 10,
  },
  refName: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 2,
  },
  itemTitle: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  itemDescription: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#4B5563',
    marginTop: 2,
  },
});

export default function Ember({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.masthead}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
          ) : null}
        </View>

        {data.summary ? (
          <View style={styles.pullQuote}>
            <Text style={styles.pullQuoteText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Capabilities</Text>
            <View style={styles.hairline} />
            <View style={styles.chipsWrap}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.chip}>
                  <Text style={styles.chipText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Experience</Text>
            <View style={styles.hairline} />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateItalic}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description ? (
                  <View>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletGlyph}>◆</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education</Text>
            <View style={styles.hairline} />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.dateItalic}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Selected Work</Text>
            <View style={styles.hairline} />
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 12 }}>
                <Text style={styles.projTitle}>
                  {proj.name}
                  {proj.link ? (
                    <Text style={[styles.schoolText, { fontFamily: SANS }]}>
                      {'  '}— {proj.link}
                    </Text>
                  ) : null}
                </Text>
                {proj.description ? (
                  <Text style={styles.projDesc}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Certifications</Text>
            <View style={styles.hairline} />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.projDesc}>
                  <Text style={[styles.degreeText, { fontSize: 9 }]}>{cert.name}</Text>
                  {cert.issuer ? <Text style={styles.schoolText}>, {cert.issuer}</Text> : null}
                </Text>
                {cert.date ? <Text style={styles.dateItalic}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionHeading}>References</Text>
            <View style={styles.hairline} />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionHeading}>{section.title}</Text>
                <View style={styles.hairline} />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 12 }}>
                    <View style={styles.headerRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateItalic}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null
          )}
      </Page>
    </Document>
  );
}
