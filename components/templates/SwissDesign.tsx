import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    fontSize: 9,
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    gap: 20,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullName: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginBottom: 10,
    color: '#000000',
  },
  jobTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorBar: {
    width: 40,
    height: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
  },
  profileImage: {
    width: 80,
    height: 80,
    objectFit: 'cover',
  },
  leftColumn: {
    width: '33%',
    flexDirection: 'column',
    gap: 20,
  },
  rightColumn: {
    width: '67%',
    flexDirection: 'column',
  },
  sectionHeader: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  contactGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  contactItem: {
    flexDirection: 'column',
  },
  contactLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  skillsGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillDot: {
    width: 5,
    height: 5,
  },
  skillName: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#111827',
  },
  school: {
    fontSize: 8,
    color: '#4B5563',
    marginTop: 2,
  },
  gradYear: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
  },
  timelineGroup: {
    flexDirection: 'column',
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 16,
    borderLeftWidth: 1.5,
    borderLeftColor: '#E5E7EB',
    paddingBottom: 20,
  },
  timelineDot: {
    position: 'absolute',
    left: -5,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  role: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#111827',
  },
  dateBadge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: '#111827',
  },
  company: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  bulletList: {
    flexDirection: 'column',
    gap: 4,
  },
  bulletText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.4,
  },
  summaryContainer: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#F9FAFB',
  },
  summaryText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.4,
  },
  customSection: {
    marginTop: 16,
  },
});

export default function SwissDesign({ data }: TemplateProps) {
  const c = data.theme?.color || '#dc2626';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
              <View style={styles.jobTitleContainer}>
                <View style={[styles.colorBar, { backgroundColor: c }]} />
                <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
              </View>
            </View>
            {data.personalInfo.profilePicture && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.personalInfo.profilePicture} style={styles.profileImage} />
            )}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.leftColumn}>
            <View>
              <Text style={styles.sectionHeader}>01. Contact</Text>
              <View style={styles.contactGroup}>
                {data.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactValue}>{data.personalInfo.email}</Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Phone</Text>
                    <Text style={styles.contactValue}>{data.personalInfo.phone}</Text>
                  </View>
                )}
                {data.personalInfo.location && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Location</Text>
                    <Text style={styles.contactValue}>{data.personalInfo.location}</Text>
                  </View>
                )}
                {data.personalInfo.website && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Website</Text>
                    <Text style={styles.contactValue}>{data.personalInfo.website}</Text>
                  </View>
                )}
              </View>
            </View>

            {data.skills && data.skills.length > 0 && (
              <View>
                <Text style={styles.sectionHeader}>02. Skills</Text>
                <View style={styles.skillsGroup}>
                  {data.skills.map(s => (
                    <View key={s.id} style={styles.skillRow}>
                      <View style={[styles.skillDot, { backgroundColor: c }]} />
                      <Text style={styles.skillName}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.education && data.education.length > 0 && (
              <View>
                <Text style={styles.sectionHeader}>03. Education</Text>
                {data.education.map(edu => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.school}>{edu.school}</Text>
                    <Text style={[styles.gradYear, { color: c }]}>{edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {data.experience && data.experience.length > 0 && (
              <View>
                <Text style={styles.sectionHeader}>04. Experience</Text>
                <View style={styles.timelineGroup}>
                  {data.experience.map(exp => (
                    <View key={exp.id} style={styles.timelineItem}>
                      <View style={[styles.timelineDot, { borderColor: c }]} />
                      <View style={styles.expHeader}>
                        <Text style={styles.role}>{exp.role}</Text>
                        <Text style={styles.dateBadge}>{exp.startDate} - {exp.endDate}</Text>
                      </View>
                      <Text style={styles.company}>{exp.company}</Text>
                      <View style={styles.bulletList}>
                        {exp.description
                          .split('\n')
                          .filter(l => l.trim())
                          .map((line, j) => (
                            <Text key={j} style={styles.bulletText}>{line}</Text>
                          ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.summary && (
              <View style={styles.summaryContainer}>
                <Text style={styles.sectionHeader}>Profile</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            )}

            {data.customSections &&
              data.customSections.map(
                section =>
                  section.items &&
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.customSection}>
                      <Text style={styles.sectionHeader}>{section.title}</Text>
                      <View style={styles.timelineGroup}>
                        {section.items.map(item => (
                          <View key={item.id} style={styles.timelineItem}>
                            <View style={[styles.timelineDot, { borderColor: c }]} />
                            <View style={styles.expHeader}>
                              <Text style={styles.role}>{item.title}</Text>
                              {item.date && <Text style={styles.dateBadge}>{item.date}</Text>}
                            </View>
                            {item.subtitle && <Text style={styles.company}>{item.subtitle}</Text>}
                            {item.description && (
                              <Text style={styles.bulletText}>{item.description}</Text>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )
              )}
          </View>
        </View>
      </Page>
    </Document>
  );
}