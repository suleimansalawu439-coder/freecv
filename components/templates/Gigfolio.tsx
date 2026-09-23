import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

// Gigfolio — gig / freelance hybrid resume.
// Order: header, Profile, Client Engagements, Selected Work (projects with
// prominent links), Services (skills as tags), Education, Certifications.
// Accent: section titles, tags, rules.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    color: '#171717',
    fontFamily: 'Helvetica',
  },
  topBar: {
    height: 8,
    marginTop: -40,
    marginHorizontal: -40,
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  name: {
    fontSize: 34,
    fontWeight: 'black',
    letterSpacing: -1,
    color: '#171717',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
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
  body: {
    marginTop: 32,
    flexDirection: 'column',
    gap: 28,
  },
  section: {},
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  sectionRule: {
    height: 1.5,
    marginBottom: 14,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#262626',
  },
  engItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  engDates: {
    width: '25%',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#737373',
  },
  engClientLabel: {
    fontSize: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#a3a3a3',
    marginTop: 6,
  },
  engClientName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#171717',
  },
  engBody: {
    width: '75%',
  },
  engRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#171717',
  },
  workItem: {
    marginBottom: 16,
  },
  workName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#171717',
  },
  workLink: {
    fontSize: 9,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#171717',
  },
  eduMeta: {
    fontSize: 9,
    color: '#525252',
  },
  certItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  certName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#171717',
  },
  certIssuer: {
    fontSize: 9,
    color: '#525252',
  },
  certDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#737373',
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
    fontSize: 10,
    fontWeight: 'bold',
    color: '#171717',
  },
  customDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#737373',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#525252',
  },
});

function SectionTitle({ themeColor, children }: { themeColor: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{children}</Text>
      <View style={[styles.sectionRule, { backgroundColor: themeColor }]} />
    </View>
  );
}

export default function Gigfolio({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const { personalInfo } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.topBar, { backgroundColor: themeColor }]} />

        <View style={styles.header}>
          {personalInfo.profilePicture && (
            <Image src={personalInfo.profilePicture} style={styles.profilePicture} />
          )}
          <View>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.jobTitle && (
              <Text style={[styles.jobTitle, { color: themeColor }]}>{personalInfo.jobTitle}</Text>
            )}
          </View>
        </View>

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

        <View style={styles.body}>
          {data.summary && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Profile</SectionTitle>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          )}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Client Engagements</SectionTitle>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.engItem}>
                  <View style={styles.engDates}>
                    <Text>
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </Text>
                    <Text style={styles.engClientLabel}>Client</Text>
                    <Text style={styles.engClientName}>{exp.company}</Text>
                  </View>
                  <View style={styles.engBody}>
                    <Text style={styles.engRole}>{exp.role}</Text>
                    {exp.description && <Text style={styles.bodyText}>{exp.description}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Selected Work</SectionTitle>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.workItem}>
                  <Text style={styles.workName}>{project.name}</Text>
                  {project.description && (
                    <Text style={[styles.bodyText, { marginTop: 2 }]}>{project.description}</Text>
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

          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Services</SectionTitle>
              <View style={styles.tagsContainer}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={[styles.tag, { backgroundColor: themeColor }]}>
                    {skill.name}
                  </Text>
                ))}
              </View>
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

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Certifications</SectionTitle>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <View>
                    <Text style={styles.certName}>{cert.name}</Text>
                    {cert.issuer && <Text style={styles.certIssuer}>{cert.issuer}</Text>}
                  </View>
                  {cert.date && <Text style={styles.certDate}>{cert.date}</Text>}
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
                        {ref.title && ref.company ? ' @ ' : ''}
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
