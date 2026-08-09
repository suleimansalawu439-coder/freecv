import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: '#f4f4f4',
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
  },
  topBorder: {
    height: 12,
    marginTop: -36,
    marginHorizontal: -36,
    marginBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -1,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#6b7280',
  },
  mainGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  leftCol: {
    width: '33%',
    flexDirection: 'column',
    gap: 20,
  },
  rightCol: {
    width: '67%',
    flexDirection: 'column',
    gap: 20,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  contactList: {
    flexDirection: 'column',
    gap: 4,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#1a1a1a',
  },
  eduList: {
    flexDirection: 'column',
    gap: 10,
  },
  eduItem: {
    flexDirection: 'column',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 8,
    color: '#9ca3af',
    fontWeight: 'bold',
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    fontWeight: 'medium',
    color: '#1a1a1a',
  },
  expList: {
    flexDirection: 'column',
    gap: 14,
  },
  expItem: {
    flexDirection: 'row',
    gap: 10,
  },
  expDateCol: {
    width: '25%',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6b7280',
    paddingTop: 1,
  },
  expContentCol: {
    width: '75%',
  },
  expRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#374151',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    paddingLeft: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  refTitle: {
    fontSize: 8,
    color: '#4b5563',
    fontWeight: 'medium',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#6b7280',
  },
  customSectionItem: {
    marginBottom: 8,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  customDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  customDesc: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
    marginTop: 2,
  },
});

export default function SwissGrid({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.topBorder, { backgroundColor: themeColor }]} />

        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
        </View>

        <View style={styles.mainGrid}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Contact</Text>
              <View style={styles.contactList}>
                {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
                {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
                {data.personalInfo.location && <Text style={styles.contactItem}>{data.personalInfo.location}</Text>}
              </View>
            </View>

            {data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
                <View style={styles.eduList}>
                  {data.education.map((edu) => (
                    <View key={edu.id} style={styles.eduItem}>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      {edu.graduationYear && <Text style={styles.eduYear}>{edu.graduationYear}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
                <View style={styles.skillsContainer}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillBadge}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {data.summary && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Profile</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            )}

            {data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
                <View style={styles.expList}>
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.expItem}>
                      <View style={styles.expDateCol}>
                        <Text>{exp.startDate}</Text>
                        <Text>{exp.endDate}</Text>
                      </View>
                      <View style={styles.expContentCol}>
                        <Text style={styles.expRole}>{exp.role}</Text>
                        <Text style={styles.expCompany}>{exp.company}</Text>
                        {exp.description && <Text style={styles.expDesc}>{exp.description}</Text>}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
                <View style={styles.refGrid}>
                  {data.references.map((ref) => (
                    <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                      <Text style={styles.refName}>{ref.name}</Text>
                      <Text style={styles.refTitle}>{ref.title} {ref.company ? `@ ${ref.company}` : ''}</Text>
                      {ref.contact && <Text style={styles.refContact}>{ref.contact}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.customSections &&
              data.customSections.map(
                (section) =>
                  section.items &&
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.section}>
                      <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
                      <View style={{ gap: 8 }}>
                        {section.items.map((item) => (
                          <View key={item.id} style={styles.customSectionItem}>
                            <View style={styles.customHeader}>
                              <View>
                                <Text style={styles.customTitle}>{item.title}</Text>
                                {item.subtitle && <Text style={styles.customSubtitle}>{item.subtitle}</Text>}
                              </View>
                              {item.date && <Text style={styles.customDate}>{item.date}</Text>}
                            </View>
                            {item.description && <Text style={styles.customDesc}>{item.description}</Text>}
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