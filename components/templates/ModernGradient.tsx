import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#374151',
    backgroundColor: '#ffffff',
  },
  header: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  summaryCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionIconText: {
    color: '#ffffff',
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  experienceSection: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  role: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  company: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  dateBadge: {
    fontSize: 8,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: 'bold',
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
    fontSize: 9,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.3,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  skillCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  skillName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  skillTrack: {
    height: 5,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillBar: {
    height: '100%',
    borderRadius: 3,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  eduDate: {
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 8.5,
    color: '#4b5563',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.3,
  },
  contactCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
  },
  contactRow: {
    fontSize: 8.5,
    marginBottom: 4,
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#374151',
  },
  contactValue: {
    color: '#4b5563',
  },
});

export default function ModernGradient({ data }: TemplateProps) {
  const c = data.theme?.color || '#4f46e5';

  const initials = data.personalInfo.fullName
    ? data.personalInfo.fullName.split(' ').map((n) => n[0]).join('')
    : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: c }]}>
          <View style={styles.avatarContainer}>
            {data.personalInfo.profilePicture ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.personalInfo.profilePicture} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>{initials}</Text>
              </View>
            )}
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          </View>
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={[styles.summaryCard, { borderLeftColor: c }]}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience Section (Full Width) */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.experienceSection}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIcon, { backgroundColor: c }]}>
                <Text style={styles.sectionIconText}>💼</Text>
              </View>
              <Text style={styles.sectionTitle}>Work Experience</Text>
            </View>

            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.role}>{exp.role}</Text>
                    <Text style={[styles.company, { color: c }]}>{exp.company}</Text>
                  </View>
                  <Text style={[styles.dateBadge, { color: c }]}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <View style={styles.bulletList}>
                  {exp.description
                    .split('\n')
                    .filter((l) => l.trim())
                    .map((line, j) => (
                      <View key={j} style={styles.bulletRow}>
                        <Text style={[styles.bulletDot, { color: c }]}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Two-Column Grid: Left (Skills) & Right (Education, Custom, Contact) */}
        <View style={styles.twoColumnLayout}>
          {/* Left Column */}
          <View style={styles.column}>
            {data.skills && data.skills.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionIcon, { backgroundColor: c }]}>
                    <Text style={styles.sectionIconText}>🛠</Text>
                  </View>
                  <Text style={styles.sectionTitle}>Skills</Text>
                </View>
                {data.skills.map((s, i) => (
                  <View key={s.id} style={styles.skillCard}>
                    <Text style={styles.skillName}>{s.name}</Text>
                    <View style={styles.skillTrack}>
                      <View
                        style={[
                          styles.skillBar,
                          {
                            width: `${Math.max(50, 80 + (i % 3) * 7)}%`,
                            backgroundColor: c,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.column}>
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionIcon, { backgroundColor: c }]}>
                    <Text style={styles.sectionIconText}>🎓</Text>
                  </View>
                  <Text style={styles.sectionTitle}>Education</Text>
                </View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.card}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={[styles.eduDate, { color: c }]}>{edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Custom Sections */}
            {data.customSections &&
              data.customSections.map(
                (section) =>
                  section.items &&
                  section.items.length > 0 && (
                    <View key={section.id} style={{ marginBottom: 16 }}>
                      <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: c }]}>
                          <Text style={styles.sectionIconText}>✨</Text>
                        </View>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                      </View>
                      {section.items.map((item) => (
                        <View key={item.id} style={styles.card}>
                          <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            {item.date && (
                              <Text style={[styles.eduDate, { color: c }]}>{item.date}</Text>
                            )}
                          </View>
                          {item.subtitle && (
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                          )}
                          {item.description && (
                            <Text style={styles.itemDescription}>{item.description}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )
              )}

            {/* Contact */}
            <View>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: c }]}>
                  <Text style={styles.sectionIconText}>📬</Text>
                </View>
                <Text style={styles.sectionTitle}>Contact</Text>
              </View>
              <View style={styles.contactCard}>
                {data.personalInfo.email && (
                  <Text style={styles.contactRow}>
                    <Text style={styles.contactLabel}>Email: </Text>
                    <Text style={styles.contactValue}>{data.personalInfo.email}</Text>
                  </Text>
                )}
                {data.personalInfo.phone && (
                  <Text style={styles.contactRow}>
                    <Text style={styles.contactLabel}>Phone: </Text>
                    <Text style={styles.contactValue}>{data.personalInfo.phone}</Text>
                  </Text>
                )}
                {data.personalInfo.location && (
                  <Text style={styles.contactRow}>
                    <Text style={styles.contactLabel}>Location: </Text>
                    <Text style={styles.contactValue}>{data.personalInfo.location}</Text>
                  </Text>
                )}
                {data.personalInfo.website && (
                  <Text style={styles.contactRow}>
                    <Text style={styles.contactLabel}>Website: </Text>
                    <Text style={styles.contactValue}>{data.personalInfo.website}</Text>
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}