import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
  },
  header: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  contactBlock: {
    alignItems: 'flex-end',
  },
  contactItem: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 2,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.55,
    color: '#4B5563',
    marginTop: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginRight: 8,
  },
  sectionRule: {
    flex: 1,
    height: 2.5,
    borderRadius: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillCell: {
    width: '32%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletGlyph: {
    width: 12,
    fontSize: 9,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#1F2937',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  historyText: {
    fontSize: 8.5,
    color: '#111827',
    flex: 1,
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemDescription: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#4B5563',
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8,
    color: '#6B7280',
  },
});

export default function Arsenal({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  const achievements: string[] = (data.experience || []).flatMap((exp) =>
    (exp.description || '')
      .split(/\n|\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
  );

  const SectionHead = ({ title }: { title: string }) => (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      <View style={[styles.sectionRule, { backgroundColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.header}>
                <View style={styles.headerRow}>
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
                  {contactItems.length > 0 ? (
                    <View style={styles.contactBlock}>
                      {contactItems.map((item, i) => (
                        <Text key={i} style={styles.contactItem}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
                {data.summary ? <Text style={styles.summaryText}>{data.summary}</Text> : null}
              </View>
            </>
          ),

          experience: achievements.length > 0 || (data.experience && data.experience.length > 0) ? (
            <>
              {achievements.length > 0 ? (
                <View style={styles.section}>
                  <SectionHead title="Selected Achievements" />
                  {achievements.map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={[styles.bulletGlyph, { color: themeColor }]}>▸</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
                </View>
              ) : null}

              {data.experience && data.experience.length > 0 ? (
                <View style={styles.section}>
                  <SectionHead title="Employment History" />
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.historyRow}>
                      <Text style={styles.historyText}>
                        <Text style={{ fontWeight: 'bold' }}>{exp.company}</Text>
                        {exp.role ? <Text style={{ color: '#4B5563' }}> — {exp.role}</Text> : null}
                      </Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </>
          ) : null,

          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <SectionHead title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.historyRow}>
                  <Text style={styles.historyText}>
                    <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                    <Text style={{ color: '#4B5563' }}> — {edu.school}</Text>
                  </Text>
                  {edu.graduationYear ? (
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <SectionHead title="Core Competencies" />
              <View style={styles.skillsGrid}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillCell}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <SectionHead title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 10 }}>
                  <Text style={styles.itemTitle}>
                    {proj.name}
                    {proj.link ? (
                      <Text style={[styles.contactItem, { fontSize: 8 }]}>  ({proj.link})</Text>
                    ) : null}
                  </Text>
                  {proj.description ? (
                    <Text style={styles.itemDescription}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHead title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.historyRow}>
                  <Text style={styles.historyText}>
                    <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                    {cert.issuer ? <Text style={{ color: '#4B5563' }}> — {cert.issuer}</Text> : null}
                  </Text>
                  {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section} wrap={false}>
              <SectionHead title="References" />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}
                      {ref.company ? ` @ ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHead title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 10 }}>
                    <View style={styles.historyRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={[styles.refDetail, { fontStyle: 'italic' }]}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
