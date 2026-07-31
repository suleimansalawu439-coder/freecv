import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const DEFAULT_THEME_COLOR = '#2563eb';

export default function Marketing({ data }: TemplateProps) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;

  const dynamicStyles = {
    headerBorder: {
      borderBottomColor: themeColor,
    },
    avatarBg: {
      backgroundColor: themeColor,
    },
    jobTitle: {
      color: themeColor,
    },
    accentText: {
      color: themeColor,
    },
    dateBadge: {
      color: themeColor,
    },
    bullet: {
      color: themeColor,
    },
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, dynamicStyles.headerBorder]}>
          <View style={[styles.avatar, dynamicStyles.avatarBg]}>
            <Text style={styles.avatarText}>
              {data.personalInfo.fullName
                ? data.personalInfo.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : ''}
            </Text>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
            <Text style={[styles.jobTitle, dynamicStyles.jobTitle]}>
              {data.personalInfo.jobTitle}
            </Text>
            <View style={styles.contactRow}>
              {data.personalInfo.email ? (
                <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
              ) : null}
              {data.personalInfo.phone ? (
                <Text style={styles.contactItem}>
                  {data.personalInfo.email ? ' • ' : ''}
                  {data.personalInfo.phone}
                </Text>
              ) : null}
              {data.personalInfo.location ? (
                <Text style={styles.contactItem}>
                  {data.personalInfo.email || data.personalInfo.phone ? ' • ' : ''}
                  {data.personalInfo.location}
                </Text>
              ) : null}
              {data.personalInfo.website ? (
                <Text style={styles.contactItem}>
                  {data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location
                    ? ' • '
                    : ''}
                  {data.personalInfo.website}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionSlash, dynamicStyles.accentText]}>/</Text>
              <Text style={styles.sectionTitle}> Experience</Text>
            </View>
            <View style={styles.experienceList}>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={[styles.expDate, dynamicStyles.dateBadge]}>
                      {exp.startDate} — {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  {exp.description
                    ? exp.description
                        .split('\n')
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <Text style={[styles.bulletPoint, dynamicStyles.bullet]}>›</Text>
                            <Text style={styles.bulletText}>{line}</Text>
                          </View>
                        ))
                    : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Projects / Campaigns */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionSlash, dynamicStyles.accentText]}>/</Text>
              <Text style={styles.sectionTitle}> Campaigns & Projects</Text>
            </View>
            <View style={styles.projectsGrid}>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectCard}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={[styles.projectLink, dynamicStyles.accentText]}>
                      {proj.link}
                    </Link>
                  ) : null}
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Bottom Columns Section */}
        <View style={styles.bottomGrid}>
          {/* Column 1: Education */}
          <View style={styles.bottomCol}>
            {data.education && data.education.length > 0 ? (
              <View>
                <Text style={styles.bottomSectionTitle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.bottomItem}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.school}</Text>
                    <Text style={[styles.itemMeta, dynamicStyles.accentText]}>
                      {edu.graduationYear}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {/* Column 2: Certifications / References / Custom */}
          <View style={styles.bottomCol}>
            {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={styles.bottomGroup}>
                <Text style={styles.bottomSectionTitle}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.bottomItem}>
                    <Text style={styles.itemTitle}>{cert.name}</Text>
                    <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                    <Text style={[styles.itemMeta, dynamicStyles.accentText]}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.bottomGroup}>
                <Text style={styles.bottomSectionTitle}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.bottomItem}>
                    <Text style={styles.itemTitle}>{ref.name}</Text>
                    <Text style={styles.itemSubtitle}>
                      {ref.title} at {ref.company}
                    </Text>
                    <Text style={[styles.itemMeta, dynamicStyles.accentText]}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.customSections && data.customSections.length > 0
              ? data.customSections.map(
                  (sec) =>
                    sec.items &&
                    sec.items.length > 0 && (
                      <View key={sec.id} style={styles.bottomGroup}>
                        <Text style={styles.bottomSectionTitle}>{sec.title}</Text>
                        {sec.items.map((item) => (
                          <View key={item.id} style={styles.bottomItem}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            {item.subtitle ? (
                              <Text style={styles.itemSubtitleItalic}>{item.subtitle}</Text>
                            ) : null}
                            {item.date ? (
                              <Text style={[styles.itemMeta, dynamicStyles.accentText]}>
                                {item.date}
                              </Text>
                            ) : null}
                            {item.description ? (
                              <Text style={styles.itemDesc}>{item.description}</Text>
                            ) : null}
                          </View>
                        ))}
                      </View>
                    )
                )
              : null}
          </View>

          {/* Column 3: Core Skills */}
          <View style={styles.bottomCol}>
            {data.skills && data.skills.length > 0 ? (
              <View>
                <Text style={styles.bottomSectionTitle}>Core Skills</Text>
                <View style={styles.skillsList}>
                  {data.skills.map((s) => (
                    <Text key={s.id} style={styles.skillText}>
                      {s.name}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    fontSize: 10,
    color: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 4,
    paddingBottom: 20,
    marginBottom: 20,
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
  },
  headerContent: {
    flex: 1,
  },
  fullName: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  contactItem: {
    fontSize: 8,
    color: '#6B7280',
    fontFamily: 'Helvetica-Bold',
  },
  summaryContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionSlash: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  experienceList: {
    gap: 12,
  },
  expItem: {
    marginBottom: 8,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  expDate: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#F9FAFB',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  expCompany: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
    gap: 6,
  },
  bulletPoint: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  bulletText: {
    fontSize: 9,
    color: '#4B5563',
    flex: 1,
    lineHeight: 1.3,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  projectCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 7.5,
    marginBottom: 4,
    textDecoration: 'none',
  },
  projectDesc: {
    fontSize: 8.5,
    color: '#4B5563',
    lineHeight: 1.3,
  },
  bottomGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 'auto',
    gap: 12,
  },
  bottomCol: {
    flex: 1,
  },
  bottomGroup: {
    marginBottom: 12,
  },
  bottomSectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  bottomItem: {
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 8,
    color: '#4B5563',
    marginTop: 1,
  },
  itemSubtitleItalic: {
    fontSize: 8,
    fontFamily: 'Helvetica-Oblique',
    color: '#4B5563',
    marginTop: 1,
  },
  itemMeta: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
  },
  itemDesc: {
    fontSize: 8,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.2,
  },
  skillsList: {
    gap: 4,
  },
  skillText: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
  },
});