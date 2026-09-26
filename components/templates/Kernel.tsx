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
  headerBar: {
    backgroundColor: '#1F2937',
    borderRadius: 6,
    paddingVertical: 26,
    paddingHorizontal: 30,
    marginBottom: 22,
  },
  headerName: {
    fontFamily: 'Courier-Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 6,
  },
  headerContact: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 5,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  sectionTitle: {
    fontFamily: 'Courier-Bold',
    fontSize: 10,
    color: '#111827',
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
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
  commentDate: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9.5,
    color: '#374151',
    marginBottom: 3,
  },
  experienceItem: {
    marginBottom: 12,
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
  skillChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    fontFamily: 'Courier',
    fontSize: 7.5,
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
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
    fontFamily: 'Courier',
    fontSize: 7.5,
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
    color: '#374151',
    marginTop: 2,
  },
});

function SectionHeader({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>
        <Text style={{ fontFamily: 'Courier-Bold', color: themeColor }}>$ </Text>
        {title}
      </Text>
    </View>
  );
}

function dateRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(' – ');
}

export default function Kernel({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header — dark slate terminal bar */}
              <View style={styles.headerBar}>
                <Text style={styles.headerName}>
                  <Text style={{ fontFamily: 'Courier-Bold', color: themeColor }}>&gt; </Text>
                  {info.fullName}
                </Text>
                {info.jobTitle ? <Text style={styles.headerTitle}>{info.jobTitle}</Text> : null}
                {contactItems.length > 0 ? (
                  <Text style={styles.headerContact}>{contactItems.join('  ·  ')}</Text>
                ) : null}
              </View>
              {data.summary ? (
                <View style={styles.section}>
                  <SectionHeader title="profile" themeColor={themeColor} />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="experience" themeColor={themeColor} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {dateRange(exp.startDate, exp.endDate) ? (
                      <Text style={styles.commentDate}>
                        {'// '}
                        {dateRange(exp.startDate, exp.endDate)}
                      </Text>
                    ) : null}
                  </View>
                  {exp.company ? (
                    <Text style={styles.companyName}>{exp.company}</Text>
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
              <SectionHeader title="skills" themeColor={themeColor} />
              <View style={styles.skillChips}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillChip}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="education" themeColor={themeColor} />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.plainItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.plainTitle}>{edu.degree}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.commentDate}>
                        {'// '}
                        {edu.graduationYear}
                      </Text>
                    ) : null}
                  </View>
                  {edu.school ? <Text style={styles.plainSub}>{edu.school}</Text> : null}
                </View>
              ))}
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="projects" themeColor={themeColor} />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.plainItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.plainTitle}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.commentDate}>{proj.link}</Text> : null}
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
              <SectionHeader title="certifications" themeColor={themeColor} />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.plainItem}>
                  <View style={styles.itemHeaderRow}>
                    <View>
                      <Text style={styles.plainTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.plainSub}>{cert.issuer}</Text> : null}
                    </View>
                    {cert.date ? (
                      <Text style={styles.commentDate}>
                        {'// '}
                        {cert.date}
                      </Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="references" themeColor={themeColor} />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
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
                <SectionHeader title={section.title.toLowerCase()} themeColor={themeColor} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? (
                        <Text style={styles.commentDate}>
                          {'// '}
                          {item.date}
                        </Text>
                      ) : null}
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
