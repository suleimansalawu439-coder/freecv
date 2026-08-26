import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    color: '#1A2A3A',
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#1A3A5A',
    paddingHorizontal: 40,
    paddingTop: 32,
    paddingBottom: 20,
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    flex: 1,
    marginRight: 16,
  },
  fullName: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 12,
    color: '#C8A86A',
    marginTop: 4,
  },
  headerRight: {
    textAlign: 'right',
  },
  contactText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#B0C0D0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  body: {
    paddingHorizontal: 40,
  },
  summaryContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#C8A86A',
    paddingLeft: 12,
    marginBottom: 16,
    marginHorizontal: 40,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#3A4A5A',
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 40,
  },
  sectionBorderTop: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E0E5EC',
    paddingTop: 14,
  },
  sectionTitleContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E5EC',
    paddingBottom: 4,
  },
  sectionTitleText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#8A9AAB',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  expItem: {
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
  },
  expDates: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#C8A86A',
  },
  expCompany: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#8A9AAB',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 1,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2.5,
  },
  bulletDot: {
    fontSize: 9,
    color: '#C8A86A',
    marginRight: 6,
    lineHeight: 1.35,
  },
  bulletText: {
    fontSize: 9,
    color: '#3A4A5A',
    lineHeight: 1.35,
    flex: 1,
  },
  twoColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E5EC',
    paddingTop: 14,
    marginBottom: 16,
    paddingHorizontal: 40,
  },
  colHalf: {
    width: '48%',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
  },
  eduSub: {
    fontSize: 8.5,
    color: '#8A9AAB',
    marginTop: 2,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E0E5EC',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  skillText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gridTwo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  projCard: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E0E5EC',
    borderRadius: 4,
    padding: 8,
    width: '48%',
    marginBottom: 10,
  },
  projName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
  },
  projLink: {
    fontSize: 8,
    color: '#C8A86A',
  },
  projDesc: {
    fontSize: 8.5,
    color: '#3A4A5A',
    marginTop: 4,
  },
  refCard: {
    width: '48%',
    marginBottom: 10,
  },
  refName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
  },
  refTitle: {
    fontSize: 8.5,
    color: '#C8A86A',
    marginTop: 1,
  },
  refContact: {
    fontSize: 8,
    color: '#8A9AAB',
    marginTop: 1,
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
  },
  customSubtitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Oblique',
    color: '#3A4A5A',
  },
  customDate: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1A3A5A',
  },
  customDesc: {
    fontSize: 9,
    color: '#3A4A5A',
    marginTop: 2,
  },
});

export default function CorporateBlue({ data }: TemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} wrap={false}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
              {data.personalInfo.jobTitle && (
                <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
              )}
            </View>
            <View style={styles.headerRight}>
              {data.personalInfo.email && (
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              )}
              {data.personalInfo.phone && (
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              )}
              {data.personalInfo.location && (
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              )}
              {data.personalInfo.website && (
                <Text style={styles.contactText}>{data.personalInfo.website}</Text>
              )}
            </View>
          </View>
        </View>

        {data.summary && (
          <View style={styles.summaryContainer} wrap={false}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>Professional Experience</Text>
            </View>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem} wrap={false}>
                <View style={styles.rowBetween}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDates}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                {exp.description &&
                  exp.description
                    .split('\n')
                    .filter((l) => l.trim())
                    .map((l, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{l}</Text>
                      </View>
                    ))}
              </View>
            ))}
          </View>
        )}

        {(data.education?.length > 0 || data.skills?.length > 0) && (
          <View style={styles.twoColRow} wrap={false}>
            {data.education && data.education.length > 0 && (
              <View style={styles.colHalf}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>Education</Text>
                </View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSub}>{edu.school}, {edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.skills && data.skills.length > 0 && (
              <View style={styles.colHalf}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>Core Skills</Text>
                </View>
                <View style={styles.skillsWrap}>
                  {data.skills.map((s) => (
                    <View key={s.id} style={styles.skillBadge}>
                      <Text style={styles.skillText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={[styles.section, styles.sectionBorderTop]} wrap={false}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>Projects</Text>
            </View>
            <View style={styles.gridTwo}>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.projName}>{proj.name}</Text>
                    {proj.link && (
                      <Link src={proj.link} style={styles.projLink}>
                        <Text>{proj.link}</Text>
                      </Link>
                    )}
                  </View>
                  {proj.description && (
                    <Text style={styles.projDesc}>{proj.description}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={[styles.section, styles.sectionBorderTop]} wrap={false}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>References</Text>
            </View>
            <View style={styles.gridTwo}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                  <Text style={styles.refContact}>{ref.contact}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id} style={[styles.section, styles.sectionBorderTop]} wrap={false}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                  </View>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.customItem}>
                      <View style={styles.rowBetween}>
                        <View>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.subtitle && (
                            <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                          )}
                        </View>
                        {item.date && <Text style={styles.customDate}>{item.date}</Text>}
                      </View>
                      {item.description && (
                        <Text style={styles.customDesc}>{item.description}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}