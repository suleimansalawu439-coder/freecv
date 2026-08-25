import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 54,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 24,
    marginBottom: 24,
  },
  fullName: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    color: '#111827',
    lineHeight: 1.0,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginTop: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 10,
  },
  contactItem: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#9CA3AF',
  },
  summaryContainer: {
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 16,
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4B5563',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    color: '#D1D5DB',
    marginBottom: 14,
  },
  experienceItem: {
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  role: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  date: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#9CA3AF',
  },
  company: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 8,
    fontSize: 9,
    color: '#D1D5DB',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#4B5563',
    lineHeight: 1.4,
  },
  gridTwoCol: {
    flexDirection: 'row',
    gap: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 24,
  },
  col: {
    flex: 1,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSub: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 2,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#6B7280',
    marginRight: 6,
    marginBottom: 4,
  },
  dividerSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 24,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    borderRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardLink: {
    fontSize: 7.5,
    color: '#9CA3AF',
  },
  cardDesc: {
    fontSize: 8.5,
    color: '#4B5563',
    lineHeight: 1.3,
  },
  refCard: {
    width: '48%',
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
    marginTop: 1,
  },
  refContact: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 1,
  },
  customItem: {
    marginBottom: 10,
  },
  customSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

export default function SwissMinimal({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.jobTitle ? (
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          <View style={styles.contactRow}>
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
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            ) : null}
          </View>
        </View>

        {data.summary && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.rowBetween}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.date}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split('\n')
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.gridTwoCol}>
          {data.education && data.education.length > 0 ? (
            <View style={styles.col}>
              <Text style={styles.sectionHeader}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSub}>{edu.school}, {edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.col}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map((s) => (
                  <Text key={s.id} style={styles.skillTag}>{s.name}</Text>
                ))}
              </View>
            </View>
          ) : null}
        </View>

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.dividerSection}>
            <Text style={styles.sectionHeader}>Projects</Text>
            <View style={styles.cardsGrid}>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{proj.name}</Text>
                    {proj.link ? (
                      <Text style={styles.cardLink}>{proj.link}</Text>
                    ) : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.cardDesc}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.dividerSection}>
            <Text style={styles.sectionHeader}>References</Text>
            <View style={styles.cardsGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                  <Text style={styles.refContact}>{ref.contact}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.customSections && data.customSections.length > 0
          ? data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.dividerSection}>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                  <View>
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.customItem}>
                        <View style={styles.rowBetween}>
                          <View>
                            <Text style={styles.role}>{item.title}</Text>
                            {item.subtitle ? (
                              <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                            ) : null}
                          </View>
                          {item.date ? (
                            <Text style={styles.date}>{item.date}</Text>
                          ) : null}
                        </View>
                        {item.description ? (
                          <Text style={styles.customDesc}>{item.description}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null
            )
          : null}
      </Page>
    </Document>
  );
}