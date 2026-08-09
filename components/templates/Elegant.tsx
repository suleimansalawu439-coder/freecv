import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

export interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#1F2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
    paddingTop: 16,
    paddingBottom: 16,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Roman',
    letterSpacing: 4,
    marginBottom: 6,
    textTransform: 'uppercase',
    color: '#000000',
  },
  jobTitle: {
    fontSize: 9,
    fontFamily: 'Times-Roman',
    letterSpacing: 1.5,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
    fontFamily: 'Helvetica',
    fontSize: 8,
    letterSpacing: 0.5,
    color: '#9CA3AF',
  },
  contactItem: {
    color: '#9CA3AF',
  },
  summaryContainer: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#4B5563',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textAlign: 'center',
    color: '#9CA3AF',
    marginBottom: 16,
  },
  sectionTitleLeft: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: '#9CA3AF',
    marginBottom: 14,
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 10.5,
    fontFamily: 'Times-Roman',
    letterSpacing: 0.5,
    color: '#000000',
  },
  datesText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  companyText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 6,
  },
  bulletList: {
    gap: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bulletDot: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#D1D5DB',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#4B5563',
    lineHeight: 1.4,
  },
  projectLink: {
    fontSize: 7.5,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
  projectDescription: {
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#4B5563',
    lineHeight: 1.4,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
  },
  gridColumn: {
    flex: 1,
  },
  gridItem: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 9,
    fontFamily: 'Times-Roman',
    letterSpacing: 0.5,
    color: '#000000',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
  },
  skillsList: {
    flexDirection: 'column',
    gap: 4,
  },
  skillText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#4B5563',
    letterSpacing: 0.5,
  },
  customItem: {
    marginBottom: 8,
  },
  customTitleBold: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  customSubtitleItalic: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  customDescription: {
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

export default function Elegant({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactRow}>
          {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
          {data.personalInfo.location && <Text style={styles.contactItem}>{data.personalInfo.location}</Text>}
          {data.personalInfo.website && <Text style={styles.contactItem}>{data.personalInfo.website}</Text>}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.itemContainer}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.datesText}>{exp.startDate} — {exp.endDate}</Text>
                </View>
                <Text style={styles.companyText}>{exp.company}</Text>
                <View style={styles.bulletList}>
                  {exp.description
                    .split('\n')
                    .filter((line) => line.trim())
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Projects Section */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={styles.projectLink}>
                      {proj.link}
                    </Link>
                  ) : null}
                </View>
                <Text style={styles.projectDescription}>{proj.description}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0
          ? data.customSections.map(
              (section) =>
                section.items &&
                section.items.length > 0 && (
                  <View key={section.id} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.customItem}>
                        <View style={styles.itemHeaderRow}>
                          <View>
                            <Text style={styles.customTitleBold}>{item.title}</Text>
                            {item.subtitle ? (
                              <Text style={styles.customSubtitleItalic}>{item.subtitle}</Text>
                            ) : null}
                          </View>
                          {item.date ? <Text style={styles.customTitleBold}>{item.date}</Text> : null}
                        </View>
                        {item.description ? (
                          <Text style={styles.customDescription}>{item.description}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                )
            )
          : null}

        {/* Bottom Grid: Education, Certifications/References, Skills */}
        <View style={styles.gridContainer}>
          {/* Education Column */}
          <View style={styles.gridColumn}>
            {data.education && data.education.length > 0 ? (
              <View>
                <Text style={styles.sectionTitleLeft}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.gridItem}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.school}</Text>
                    <Text style={styles.itemDate}>{edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {/* Certifications / References Column */}
          <View style={styles.gridColumn}>
            {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionTitleLeft}>Certifications</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.gridItem}>
                    <Text style={styles.itemTitle}>{cert.name}</Text>
                    <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                    <Text style={styles.itemDate}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {data.showReferences && data.references && data.references.length > 0 ? (
              <View>
                <Text style={styles.sectionTitleLeft}>References</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.gridItem}>
                    <Text style={styles.itemTitle}>{ref.name}</Text>
                    <Text style={styles.itemSubtitle}>{ref.title} at {ref.company}</Text>
                    <Text style={styles.itemDate}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {/* Skills Column */}
          <View style={styles.gridColumn}>
            {data.skills && data.skills.length > 0 ? (
              <View>
                <Text style={styles.sectionTitleLeft}>Skills</Text>
                <View style={styles.skillsList}>
                  {data.skills.map((s) => (
                    <Text key={s.id} style={styles.skillText}>{s.name}</Text>
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