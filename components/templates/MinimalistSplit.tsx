import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const PRIMARY_COLOR = '#2563EB';
const SIDEBAR_BG = '#1E293B';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '35%',
    backgroundColor: SIDEBAR_BG,
    padding: 24,
    color: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sidebarMain: {
    flexDirection: 'column',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 10,
    color: '#E2E8F0',
    marginBottom: 20,
  },
  contactGroup: {
    marginBottom: 20,
    gap: 6,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#E2E8F0',
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginTop: 10,
  },
  skillsList: {
    flexDirection: 'column',
    gap: 6,
  },
  skillCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 8.5,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mainContent: {
    width: '65%',
    padding: 24,
    flexDirection: 'column',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  educationItem: {
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
  gradYearText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginTop: 1,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    borderLeftColor: PRIMARY_COLOR,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
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
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 8.5,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

export default function MinimalistSplit({ data }: { data: ResumeData }) {
  const initial = data.personalInfo.fullName?.charAt(0) || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarMain}>
            <View>
              {initial ? (
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>{initial}</Text>
                </View>
              ) : null}
              {data.personalInfo.fullName ? (
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              ) : null}
              {data.personalInfo.jobTitle ? (
                <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
              ) : null}
            </View>

            <View style={styles.contactGroup}>
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
                <Link style={styles.contactItem} src={data.personalInfo.website}>
                  {data.personalInfo.website}
                </Link>
              ) : null}
            </View>

            {data.skills && data.skills.length > 0 && (
              <View>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                <View style={styles.skillsList}>
                  {data.skills.map((skill) => (
                    <View key={skill.id} style={styles.skillCard}>
                      <Text style={styles.skillText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Right Main Content */}
        <View style={styles.mainContent}>
          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} - {exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description ? (
                    <View style={styles.bulletList}>
                      {exp.description
                        .split('\n')
                        .filter(Boolean)
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

          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>
                      {ref.title} @ {ref.company}
                    </Text>
                    {ref.contact ? (
                      <Text style={styles.refContact}>{ref.contact}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.customSections &&
            data.customSections.length > 0 &&
            data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.customItem}>
                      <View style={styles.itemHeaderRow}>
                        <View>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.subtitle ? (
                            <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                          ) : null}
                        </View>
                        {item.date ? (
                          <Text style={styles.dateText}>{item.date}</Text>
                        ) : null}
                      </View>
                      {item.description ? (
                        <Text style={styles.customDescription}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null
            )}
        </View>
      </Page>
    </Document>
  );
}