import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

// Valor — military-to-civilian transition resume.
// Authoritative, clean and respectful: header with name, "Service Record",
// "Decorations & Certifications" as a prominent list with award markers,
// "Transferable Skills", Education.
// Accent: section titles, rules, award list markers. No gimmicks.

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#ffffff',
    color: '#171717',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#000000',
  },
  name: {
    fontSize: 26,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#171717',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#404040',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#525252',
  },
  contactLink: {
    fontSize: 9,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  doubleRule: {
    marginVertical: 28,
  },
  thickRule: {
    height: 6,
    backgroundColor: '#000000',
  },
  thinRule: {
    height: 2,
    marginTop: 4,
  },
  body: {
    flexDirection: 'column',
    gap: 28,
  },
  section: {},
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  sectionRuleBlack: {
    height: 1.5,
    backgroundColor: '#000000',
  },
  sectionRuleAccent: {
    height: 2,
    width: 80,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#262626',
  },
  recordItem: {
    marginBottom: 18,
  },
  recordTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  recordRole: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  recordDates: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#525252',
  },
  recordOrg: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#404040',
    marginTop: 2,
  },
  awardRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  awardMarker: {
    fontSize: 13,
    fontWeight: 'black',
    lineHeight: 1.4,
  },
  awardBody: {
    flex: 1,
  },
  awardNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  awardName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  awardDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#525252',
  },
  awardIssuer: {
    fontSize: 9,
    color: '#525252',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCell: {
    width: '48%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  skillMarker: {
    width: 8,
    height: 8,
    marginTop: 3,
  },
  skillName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#171717',
    flex: 1,
  },
  workItem: {
    marginBottom: 12,
  },
  workName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  workLink: {
    fontSize: 9,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 3,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  eduMeta: {
    fontSize: 9.5,
    color: '#525252',
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
    color: '#171717',
  },
  refMeta: {
    fontSize: 8.5,
    color: '#525252',
  },
  customItem: {
    marginBottom: 10,
  },
  customHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  customDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#525252',
  },
  customSubtitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#525252',
  },
});

function SectionTitle({ themeColor, children }: { themeColor: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{children}</Text>
      <View style={styles.sectionRuleBlack} />
      <View style={[styles.sectionRuleAccent, { backgroundColor: themeColor }]} />
    </View>
  );
}

export default function Valor({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const { personalInfo } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {personalInfo.profilePicture && (
            <Image src={personalInfo.profilePicture} style={styles.profilePicture} />
          )}
          <View>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.jobTitle && <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>}
            <View style={styles.contactRow}>
              {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
              {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
              {personalInfo.website && (
                <Link src={personalInfo.website} style={[styles.contactLink, { color: themeColor }]}>
                  {personalInfo.website}
                </Link>
              )}
            </View>
          </View>
        </View>

        <View style={styles.doubleRule}>
          <View style={styles.thickRule} />
          <View style={[styles.thinRule, { backgroundColor: themeColor }]} />
        </View>

        <View style={styles.body}>
          {data.summary && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Profile</SectionTitle>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          )}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Service Record</SectionTitle>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.recordItem}>
                  <View style={styles.recordTopRow}>
                    <Text style={styles.recordRole}>{exp.role}</Text>
                    <Text style={styles.recordDates}>
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.recordOrg}>{exp.company}</Text>
                  {exp.description && (
                    <Text style={[styles.bodyText, { marginTop: 4 }]}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Decorations &amp; Certifications</SectionTitle>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.awardRow}>
                  <Text style={[styles.awardMarker, { color: themeColor }]}>{'\u2605'}</Text>
                  <View style={styles.awardBody}>
                    <View style={styles.awardNameRow}>
                      <Text style={styles.awardName}>{cert.name}</Text>
                      {cert.date && <Text style={styles.awardDate}>{cert.date}</Text>}
                    </View>
                    {cert.issuer && <Text style={styles.awardIssuer}>{cert.issuer}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Transferable Skills</SectionTitle>
              <View style={styles.skillsGrid}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillCell}>
                    <View style={[styles.skillMarker, { backgroundColor: themeColor }]} />
                    <Text style={styles.skillName}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Projects</SectionTitle>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.workItem}>
                  <Text style={styles.workName}>{project.name}</Text>
                  {project.description && (
                    <Text style={[styles.bodyText, { fontSize: 9, marginTop: 2 }]}>
                      {project.description}
                    </Text>
                  )}
                  {project.link && (
                    <Link src={project.link} style={[styles.workLink, { color: themeColor }]}>
                      {project.link}
                    </Link>
                  )}
                </View>
              ))}
            </View>
          )}

          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Education</SectionTitle>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduMeta}>
                    {edu.school}
                    {edu.graduationYear ? ` \u00B7 ${edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>References</SectionTitle>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    {(ref.title || ref.company) && (
                      <Text style={styles.refMeta}>
                        {ref.title}
                        {ref.title && ref.company ? ' \u2014 ' : ''}
                        {ref.company}
                      </Text>
                    )}
                    {ref.contact && <Text style={styles.refMeta}>{ref.contact}</Text>}
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
                    <SectionTitle themeColor={themeColor}>{section.title}</SectionTitle>
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.customItem}>
                        <View style={styles.customHeaderRow}>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.date && <Text style={styles.customDate}>{item.date}</Text>}
                        </View>
                        {item.subtitle && <Text style={styles.customSubtitle}>{item.subtitle}</Text>}
                        {item.description && (
                          <Text style={[styles.bodyText, { fontSize: 9, marginTop: 2 }]}>
                            {item.description}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )
            )}
        </View>
      </Page>
    </Document>
  );
}
