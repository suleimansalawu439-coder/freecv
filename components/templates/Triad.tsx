import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

/** Convert a hex color to an rgba() string (react-pdf safe). */
function hexToRgba(hex: string | undefined, alpha: number): string {
  const h = (hex || DEFAULT_THEME_COLOR).replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  headerZone: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 48,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  bandZone: {
    paddingVertical: 20,
    paddingHorizontal: 48,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#1F2937',
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  mainZone: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    flex: 1,
  },
  section: {
    marginBottom: 18,
  },
  experienceItem: {
    marginBottom: 12,
  },
  headerRow: {
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
    fontWeight: 'bold',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8.5,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 8.5,
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
  itemTitle: {
    fontSize: 9.5,
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
    lineHeight: 1.45,
    color: '#4B5563',
    marginTop: 2,
  },
});

export default function Triad({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const bandBg = hexToRgba(themeColor, 0.08);
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Zone 1 — white header */}
        {orderSections(data, {
          personal: (
            <View style={styles.headerZone}>
              {data.personalInfo.fullName ? (
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              ) : null}
              {data.personalInfo.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>
                  {data.personalInfo.jobTitle}
                </Text>
              ) : null}
              {contactItems.length > 0 ? (
                <Text style={styles.contactLine}>{contactItems.join('  •  ')}</Text>
              ) : null}
            </View>
          ),
        })}

        {/* Zone 2 — tinted band: summary + skills */}
        {data.summary || (data.skills && data.skills.length > 0) ? (
          <View style={[styles.bandZone, { backgroundColor: bandBg }]}>
            {orderSections(data, {
              personal: data.summary ? (
                <View style={{ marginBottom: data.skills.length > 0 ? 14 : 0 }}>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>Summary</Text>
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null,

              skills: data.skills && data.skills.length > 0 ? (
                <View>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
                  <View style={styles.pillsWrap}>
                    {data.skills.map((skill) => (
                      <View key={skill.id} style={styles.pill}>
                        <Text style={styles.pillText}>{skill.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null,
            })}
          </View>
        ) : null}

        {/* Zone 3 — white main zone */}
        <View style={styles.mainZone}>
          {orderSections(data, {
            experience: data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.headerRow}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
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
            ) : null,

            education: data.education && data.education.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduRow}>
                    <View>
                      <Text style={styles.degreeText}>{edu.degree}</Text>
                      <Text style={styles.schoolText}>{edu.school}</Text>
                    </View>
                    {edu.graduationYear ? (
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.itemTitle}>
                      {proj.name}
                      {proj.link ? (
                        <Text style={[styles.itemSubtitle, { fontStyle: 'normal' }]}>
                          {'  '}({proj.link})
                        </Text>
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
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.certRow}>
                    <Text style={styles.itemTitle}>
                      {cert.name}
                      {cert.issuer ? (
                        <Text style={[styles.schoolText, { fontWeight: 'normal' }]}>
                          {'  '}— {cert.issuer}
                        </Text>
                      ) : null}
                    </Text>
                    {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.section} wrap={false}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
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
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    {section.title}
                  </Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <View style={styles.headerRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
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
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
