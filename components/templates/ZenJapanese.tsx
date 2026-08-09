import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts for React-PDF
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FDF8F0',
    color: '#2C2A24',
    fontFamily: 'Open Sans',
    padding: '0.75in',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4C8B8',
    paddingBottom: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 36,
    fontWeight: 'light',
    letterSpacing: 2,
    lineHeight: 0.9,
    color: '#2C2A24',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'light',
    color: '#6A5A4A',
    marginTop: 8,
  },
  contactInfo: {
    fontSize: 8,
    fontWeight: 'light',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8A7A6A',
    textAlign: 'right',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#4A3A2A',
    borderLeftWidth: 2,
    borderLeftColor: '#8A7A6A',
    paddingLeft: 16,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'light',
    color: '#8A7A6A',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
  },
  expItem: {
    marginBottom: 16,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  expRole: {
    fontSize: 12,
    fontWeight: 'light',
    color: '#2C2A24',
  },
  expDates: {
    fontSize: 8,
    fontWeight: 'light',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8A7A6A',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'light',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8A7A6A',
    marginBottom: 8,
  },
  expDesc: {
    fontSize: 10,
    color: '#4A3A2A',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#D4C8B8',
    paddingTop: 24,
  },
  column: {
    flex: 1,
    paddingRight: 16,
  },
  eduItem: {
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 12,
    fontWeight: 'light',
    color: '#2C2A24',
    marginBottom: 2,
  },
  eduSchool: {
    fontSize: 9,
    color: '#8A7A6A',
    fontWeight: 'light',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    fontSize: 9,
    fontWeight: 'light',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6A5A4A',
    marginRight: 8,
    marginBottom: 4,
  },
  customSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#D4C8B8',
    paddingTop: 24,
  },
  customItem: {
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#D4C8B8',
    marginBottom: 16,
  },
  customItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  customItemTitle: {
    fontSize: 12,
    fontWeight: 'light',
    color: '#2C2A24',
  },
  customItemDate: {
    fontSize: 9,
    fontWeight: 'light',
    color: '#8A7A6A',
    letterSpacing: 1,
  },
  customItemSubtitle: {
    fontSize: 10,
    color: '#6A5A4A',
    marginBottom: 4,
    fontWeight: 'light',
  },
  customItemDesc: {
    fontSize: 10,
    color: '#4A3A2A',
    fontWeight: 'light',
    lineHeight: 1.5,
  }
});

export default function ZenJapanese({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          </View>
          <View style={styles.contactInfo}>
            {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
            {data.personalInfo.website && <Text>{data.personalInfo.website}</Text>}
          </View>
        </View>

        {data.summary && (
          <Text style={styles.summary}>{data.summary}</Text>
        )}

        {data.experience.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>experience</Text>
            <View>
              {data.experience.map(exp => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expDates}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <View>
                    {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                      <Text key={i} style={styles.expDesc}>{l}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.grid}>
          {data.education.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>education</Text>
              {data.education.map(edu => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}, {edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          )}

          {data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>skills</Text>
              <View style={styles.skillsContainer}>
                {data.skills.map(s => (
                  <Text key={s.id} style={styles.skillItem}>{s.name}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
          section.items.length > 0 && (
            <View key={section.id} style={styles.customSection}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View>
                {section.items.map(item => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customItemHeader}>
                      <Text style={styles.customItemTitle}>{item.title}</Text>
                      {item.date && <Text style={styles.customItemDate}>{item.date}</Text>}
                    </View>
                    {item.subtitle && <Text style={styles.customItemSubtitle}>{item.subtitle}</Text>}
                    {item.description && <Text style={styles.customItemDesc}>{item.description}</Text>}
                  </View>
                ))}
              </View>
            </View>
          )
        ))}
      </Page>
    </Document>
  );
}