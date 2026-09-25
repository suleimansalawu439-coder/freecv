import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 40,
    paddingBottom: 22,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  jobTitle: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 5,
  },
  contactRow: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 6,
  },
  body: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
  },
  leftCol: {
    width: '70%',
    paddingRight: 24,
  },
  rightCol: {
    width: '30%',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 6,
  },
  section: {
    marginBottom: 16,
  },
  railSection: {
    marginBottom: 16,
  },
  mainSectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  railSectionTitle: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#6B7280',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  expCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#9CA3AF',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: '#374151',
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#4B5563',
    marginTop: 2,
  },
  skillBarItem: {
    marginBottom: 8,
  },
  skillBarLabel: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 3,
  },
  skillTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  skillFill: {
    height: 6,
    borderRadius: 3,
  },
  railItem: {
    marginBottom: 8,
  },
  railItemTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },
  railItemSub: {
    fontSize: 7.5,
    color: '#4B5563',
  },
  railItemMeta: {
    fontSize: 7.5,
    color: '#6B7280',
  },
});

function dateRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(' — ');
}

export default function Pixel({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Full-width header */}
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactRow}>{contactItems.join(' · ')}</Text>
          ) : null}
        </View>

        <View style={styles.body}>
          {/* Left 70% */}
          <View style={styles.leftCol}>
            {data.summary ? (
              <View style={styles.section}>
                <Text style={[styles.mainSectionTitle, { color: themeColor }]}>Profile</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            ) : null}

            {data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.mainSectionTitle, { color: themeColor }]}>
                  Experience
                </Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expCard}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      {dateRange(exp.startDate, exp.endDate) ? (
                        <Text style={styles.dateText}>
                          {dateRange(exp.startDate, exp.endDate)}
                        </Text>
                      ) : null}
                    </View>
                    {exp.company ? (
                      <Text style={[styles.companyName, { color: themeColor }]}>
                        {exp.company}
                      </Text>
                    ) : null}
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
            )}

            {data.showProjects && data.projects && data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.mainSectionTitle, { color: themeColor }]}>Projects</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={styles.expCard}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{proj.name}</Text>
                      {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                    </View>
                    {proj.description ? (
                      <Text style={styles.customDescription}>{proj.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}

            {data.customSections &&
              data.customSections.length > 0 &&
              data.customSections.map((section) =>
                section.items && section.items.length > 0 ? (
                  <View key={section.id} style={styles.section}>
                    <Text style={[styles.mainSectionTitle, { color: themeColor }]}>
                      {section.title}
                    </Text>
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.customItem}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                        </View>
                        {item.subtitle ? (
                          <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                        ) : null}
                        {item.description ? (
                          <Text style={styles.customDescription}>{item.description}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ) : null
              )}
          </View>

          {/* Right 30% rail */}
          <View style={styles.rightCol}>
            {data.skills && data.skills.length > 0 && (
              <View style={styles.railSection}>
                <Text style={styles.railSectionTitle}>Skills</Text>
                {data.skills.map((skill, i) => {
                  const pct = 65 + ((i * 7) % 31);
                  return (
                    <View key={skill.id} style={styles.skillBarItem}>
                      <Text style={styles.skillBarLabel}>{skill.name}</Text>
                      <View style={styles.skillTrack}>
                        <View
                          style={[
                            styles.skillFill,
                            { width: `${pct}%`, backgroundColor: themeColor },
                          ]}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {data.education && data.education.length > 0 && (
              <View style={styles.railSection}>
                <Text style={styles.railSectionTitle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.railItem}>
                    <Text style={styles.railItemTitle}>{edu.degree}</Text>
                    {edu.school ? <Text style={styles.railItemSub}>{edu.school}</Text> : null}
                    {edu.graduationYear ? (
                      <Text style={styles.railItemMeta}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}

            {data.showCertifications &&
              data.certifications &&
              data.certifications.length > 0 && (
                <View style={styles.railSection}>
                  <Text style={styles.railSectionTitle}>Certifications</Text>
                  {data.certifications.map((cert) => (
                    <View key={cert.id} style={styles.railItem}>
                      <Text style={styles.railItemTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.railItemSub}>{cert.issuer}</Text> : null}
                      {cert.date ? <Text style={styles.railItemMeta}>{cert.date}</Text> : null}
                    </View>
                  ))}
                </View>
              )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.railSection}>
                <Text style={styles.railSectionTitle}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.railItem}>
                    <Text style={styles.railItemTitle}>{ref.name}</Text>
                    <Text style={styles.railItemSub}>
                      {ref.title}
                      {ref.company ? ` @ ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.railItemMeta}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
