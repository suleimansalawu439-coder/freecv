import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diamond: {
    width: 13,
    height: 13,
    marginRight: 10,
    transform: 'rotate(45deg)',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  jobTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 5,
    marginLeft: 28,
  },
  contactRow: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 4,
    marginLeft: 28,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  sectionBullet: {
    width: 7,
    height: 7,
    marginRight: 8,
    transform: 'rotate(45deg)',
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  railItem: {
    borderLeftWidth: 2,
    paddingLeft: 12,
    marginBottom: 12,
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
  skillPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillDot: {
    fontSize: 8,
    marginRight: 5,
  },
  skillText: {
    fontSize: 8.5,
    color: '#1F2937',
  },
  plainItem: {
    marginBottom: 8,
  },
  plainTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  plainSub: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#6B7280',
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
});

function SectionHeader({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionBullet, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function dateRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(' — ');
}

export default function Vector({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerRow}>
                  <View style={[styles.diamond, { backgroundColor: themeColor }]} />
                  <Text style={styles.name}>{info.fullName}</Text>
                </View>
                {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
                {contactItems.length > 0 ? (
                  <Text style={styles.contactRow}>{contactItems.join('  ·  ')}</Text>
                ) : null}
              </View>

              {data.summary ? (
                <View style={styles.section}>
                  <SectionHeader title="Profile" themeColor={themeColor} />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="Experience" themeColor={themeColor} />
              {data.experience.map((exp) => (
                <View
                  key={exp.id}
                  style={[styles.railItem, { borderLeftColor: themeColor }]}
                >
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {dateRange(exp.startDate, exp.endDate) ? (
                      <Text style={styles.dateText}>{dateRange(exp.startDate, exp.endDate)}</Text>
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
          ),

          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="Skills" themeColor={themeColor} />
              <View style={styles.skillPills}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillPill}>
                    <Text style={[styles.skillDot, { color: themeColor }]}>•</Text>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="Education" themeColor={themeColor} />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.plainItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.plainTitle}>{edu.degree}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                  {edu.school ? <Text style={styles.plainSub}>{edu.school}</Text> : null}
                </View>
              ))}
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="Projects" themeColor={themeColor} />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.plainItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.plainTitle}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.customDescription}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="Certifications" themeColor={themeColor} />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.plainItem}>
                  <View style={styles.itemHeaderRow}>
                    <View>
                      <Text style={styles.plainTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.plainSub}>{cert.issuer}</Text> : null}
                    </View>
                    {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="References" themeColor={themeColor} />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View
                    key={ref.id}
                    style={[styles.refCard, { borderLeftColor: themeColor }]}
                  >
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>
                      {ref.title}
                      {ref.company ? ` @ ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHeader title={section.title} themeColor={themeColor} />
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
            ))
        )}
      </Page>
    </Document>
  );
}
