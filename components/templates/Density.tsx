import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    fontSize: 8.5,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  contactBlock: {
    alignItems: 'flex-end',
  },
  contactItem: {
    fontSize: 7.5,
    color: '#4B5563',
    marginBottom: 2,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: 3,
    borderBottomWidth: 1,
    marginBottom: 7,
  },
  bodyText: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#1F2937',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '33.33%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingRight: 6,
  },
  skillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 5,
  },
  skillText: {
    fontSize: 8,
    color: '#1F2937',
  },
  experienceItem: {
    marginBottom: 8,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  dateText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
    color: '#9CA3AF',
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  inlineText: {
    fontSize: 8.5,
    color: '#111827',
    flex: 1,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemDescription: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#4B5563',
    marginTop: 1,
  },
});

export default function Density({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const sectionTitleStyle = [styles.sectionTitle, { color: themeColor, borderBottomColor: themeColor }];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>
                {data.personalInfo.jobTitle}
              </Text>
            ) : null}
          </View>
          <View style={styles.contactBlock}>
            {data.personalInfo.email ? (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            ) : null}
            {data.personalInfo.phone ? (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            ) : null}
            {data.personalInfo.location ? (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            ) : null}
            {data.personalInfo.website ? (
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            ) : null}
          </View>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={sectionTitleStyle}>Summary</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={sectionTitleStyle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <View style={[styles.skillDot, { backgroundColor: themeColor }]} />
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={sectionTitleStyle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expTitle}>
                    {exp.role}
                    {exp.company ? (
                      <Text style={{ color: themeColor }}>  ·  {exp.company}</Text>
                    ) : null}
                  </Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                {exp.description ? (
                  <View>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
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
            <Text style={sectionTitleStyle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.inlineRow}>
                <Text style={styles.inlineText}>
                  <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                  <Text style={{ color: '#4B5563' }}> — {edu.school}</Text>
                </Text>
                {edu.graduationYear ? (
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={sectionTitleStyle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>
                  {proj.name}
                  {proj.link ? (
                    <Text style={[styles.contactItem, { fontSize: 7.5 }]}>  ({proj.link})</Text>
                  ) : null}
                </Text>
                {proj.description ? (
                  <Text style={styles.itemDescription}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={sectionTitleStyle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.inlineRow}>
                <Text style={styles.inlineText}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ color: '#4B5563' }}> — {cert.issuer}</Text> : null}
                </Text>
                {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <Text style={sectionTitleStyle}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={[styles.itemTitle, { fontSize: 8.5 }]}>{ref.name}</Text>
                  <Text style={[styles.contactItem, { marginBottom: 0 }]}>
                    {ref.title}
                    {ref.company ? ` @ ${ref.company}` : ''}
                    {ref.contact ? ` · ${ref.contact}` : ''}
                  </Text>
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
                <Text style={sectionTitleStyle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 6 }}>
                    <View style={styles.inlineRow}>
                      <Text style={styles.itemTitle}>
                        {item.title}
                        {item.subtitle ? (
                          <Text style={[styles.contactItem, { fontStyle: 'italic' }]}>
                            {'  '}— {item.subtitle}
                          </Text>
                        ) : null}
                      </Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
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
