import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#FDFDFC',
    fontFamily: 'Times-Roman',
    color: '#1C1C1C',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    objectFit: 'cover',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times-Roman',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#777777',
  },
  contactSeparator: {
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  summaryContainer: {
    marginBottom: 24,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 10.5,
    fontFamily: 'Times-Italic',
    leading: 1.6,
    color: '#555555',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionDivider: {
    width: 40,
    height: 1,
    alignSelf: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  itemRole: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    color: '#1C1C1C',
  },
  itemDate: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#999999',
  },
  companyName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    marginTop: 4.5,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    lineHeight: 1.5,
    color: '#444444',
  },
  projectName: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
  },
  projectLink: {
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#999999',
    textDecoration: 'none',
  },
  projectDesc: {
    fontSize: 9.5,
    fontFamily: 'Times-Roman',
    color: '#555555',
    lineHeight: 1.5,
  },
  bottomGrid: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
    paddingTop: 24,
    borderTopWidth: 1,
  },
  column: {
    flex: 1,
  },
  colTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
    lineHeight: 1.2,
  },
  eduSchool: {
    fontSize: 9,
    fontFamily: 'Times-Roman',
    color: '#777777',
    marginTop: 2,
  },
  eduYear: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 4,
  },
  subItem: {
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  subMeta: {
    fontSize: 8.5,
    fontFamily: 'Times-Roman',
    color: '#777777',
    marginTop: 1,
  },
  subContact: {
    fontSize: 8.5,
    fontFamily: 'Times-Roman',
    color: '#999999',
    marginTop: 1,
  },
});

export default function Diplomat({ data }: TemplateProps) {
  const c = data?.theme?.color || '#1e3a5f';
  const lightBorder = `${c}30`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: lightBorder }]}>
          {data.personalInfo.profilePicture && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              src={data.personalInfo.profilePicture}
              style={[styles.profilePic, { borderColor: c, borderWidth: 3 }]}
            />
          )}
          <Text style={[styles.name, { color: c }]}>
            {data.personalInfo.fullName}
          </Text>
          <Text style={styles.jobTitle}>
            {data.personalInfo.jobTitle}
          </Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && (
              <Text style={styles.contactText}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.email && data.personalInfo.phone && (
              <Text style={[styles.contactSeparator, { color: c }]}>|</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.phone && data.personalInfo.location && (
              <Text style={[styles.contactSeparator, { color: c }]}>|</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactText}>{data.personalInfo.location}</Text>
            )}
            {data.personalInfo.location && data.personalInfo.website && (
              <Text style={[styles.contactSeparator, { color: c }]}>|</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactText}>{data.personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: c }]}>
              Professional Experience
            </Text>
            <View style={[styles.sectionDivider, { backgroundColor: c }]} />
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemRole}>{exp.role}</Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={[styles.companyName, { color: c }]}>
                  {exp.company}
                </Text>
                {exp.description
                  .split('\n')
                  .filter(l => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <View style={[styles.bulletDot, { backgroundColor: c }]} />
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: c }]}>
              Notable Projects
            </Text>
            <View style={[styles.sectionDivider, { backgroundColor: c }]} />
            {data.projects.map(proj => (
              <View key={proj.id} style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link && (
                    <Link src={proj.link} style={styles.projectLink}>
                      {proj.link}
                    </Link>
                  )}
                </View>
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Grid: Education, Skills, Certifications / References / Custom */}
        <View style={[styles.bottomGrid, { borderTopColor: lightBorder }]}>
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <View style={styles.column}>
              <Text style={[styles.colTitle, { color: c }]}>Education</Text>
              {data.education.map(edu => (
                <View key={edu.id} style={styles.subItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={[styles.eduYear, { color: c }]}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Core Expertise / Skills */}
          {data.skills && data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={[styles.colTitle, { color: c }]}>Core Expertise</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map(s => (
                  <Text
                    key={s.id}
                    style={[
                      styles.skillTag,
                      { borderColor: lightBorder, color: c }
                    ]}
                  >
                    {s.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Certifications / References / Custom Sections */}
          <View style={styles.column}>
            {data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={[styles.colTitle, { color: c }]}>Certifications</Text>
                {data.certifications.map(cert => (
                  <View key={cert.id} style={styles.subItem}>
                    <Text style={styles.subTitle}>{cert.name}</Text>
                    <Text style={styles.subMeta}>{cert.issuer} · {cert.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={[styles.colTitle, { color: c }]}>References</Text>
                {data.references.map(ref => (
                  <View key={ref.id} style={styles.subItem}>
                    <Text style={styles.subTitle}>{ref.name}</Text>
                    <Text style={styles.subMeta}>{ref.title} at {ref.company}</Text>
                    <Text style={styles.subContact}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
              section.items && section.items.length > 0 && (
                <View key={section.id} style={{ marginBottom: 12 }}>
                  <Text style={[styles.colTitle, { color: c }]}>{section.title}</Text>
                  {section.items.map(item => (
                    <View key={item.id} style={styles.subItem}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Text style={styles.subTitle}>{item.title}</Text>
                        {item.date && <Text style={styles.subMeta}>{item.date}</Text>}
                      </View>
                      {item.subtitle && <Text style={styles.subMeta}>{item.subtitle}</Text>}
                      {item.description && (
                        <Text style={[styles.subMeta, { marginTop: 2 }]}>{item.description}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}