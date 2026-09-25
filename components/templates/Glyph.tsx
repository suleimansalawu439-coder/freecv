import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    paddingHorizontal: 48,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerName: {
    fontSize: 28,
    fontWeight: 'light',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6B7280',
    marginHorizontal: 8,
    marginBottom: 3,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionGlyph: {
    fontSize: 9,
    fontWeight: 'bold',
    marginRight: 7,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginRight: 10,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: '#4B5563',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 13,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 8,
    fontSize: 6,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9,
    color: '#6B7280',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    width: 130,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
  },
  meterTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F3F4F6',
  },
  meterFill: {
    height: 4,
    borderRadius: 2,
  },
  projectItem: {
    marginBottom: 9,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSub: {
    fontSize: 9,
    color: '#6B7280',
  },
  itemDesc: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 3,
    lineHeight: 1.5,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '47%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  refContact: {
    fontSize: 8.5,
    color: '#9CA3AF',
  },
});

export default function Glyph({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const sectionHeader = (title: string, glyph: string) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={[styles.sectionGlyph, { color: themeColor }]}>{glyph}</Text>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.headerName}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.headerTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 && (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          )}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            {sectionHeader('Profile', '◆')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            {sectionHeader('Experience', '▣')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description ? (
                  <View>
                    {exp.description.split(/\n|\r\n/).filter((l) => l.trim()).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={[styles.bulletDot, { color: themeColor }]}>●</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            {sectionHeader('Education', '▲')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
                <Text style={styles.schoolText}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            {sectionHeader('Skills', '★')}
            {data.skills.map((skill, si) => {
              const level = 55 + ((si * 41) % 41);
              return (
                <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.meterTrack}>
                    <View style={[styles.meterFill, { width: `${level}%`, backgroundColor: themeColor }]} />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            {sectionHeader('Projects', '▤')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                </View>
                {proj.description ? (
                  <Text style={styles.itemDesc}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            {sectionHeader('Certifications', '✦')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.projectItem}>
                <View style={styles.itemHeaderRow}>
                  <View>
                    <Text style={styles.itemTitle}>{cert.name}</Text>
                    {cert.issuer ? <Text style={styles.itemSub}>{cert.issuer}</Text> : null}
                  </View>
                  {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                {sectionHeader(section.title, '≡')}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.projectItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null
          )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section} wrap={false}>
            {sectionHeader('References', '◆')}
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
