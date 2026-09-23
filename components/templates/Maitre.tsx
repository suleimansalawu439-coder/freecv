import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

// Maitre — hospitality / service resume.
// Warm, elegant and welcoming: centered header, hairline rules,
// venues shown prominently with the role beneath, certifications as
// a visible badge row, skills as service tags.
// Accent: headings, badges, hairline rules.

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#fdfbf7',
    color: '#1c1917',
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 14,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    color: '#1c1917',
  },
  jobTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#57534e',
    marginTop: 6,
  },
  hairline: {
    height: 1,
    marginVertical: 18,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#57534e',
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
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  ruleSide: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#d6d3d1',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    fontStyle: 'italic',
    color: '#44403c',
    textAlign: 'center',
  },
  expItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
  },
  venue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1c1917',
  },
  expDates: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#78716c',
  },
  expRole: {
    fontSize: 11,
    fontWeight: 'medium',
    color: '#1c1917',
    marginTop: 3,
  },
  accentDash: {
    width: 24,
    height: 2,
    marginVertical: 8,
  },
  expDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#44403c',
    textAlign: 'left',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  badge: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  badgeName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  badgeMeta: {
    fontSize: 7.5,
    color: '#78716c',
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  tag: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#44403c',
    backgroundColor: '#f5f5f4',
    borderWidth: 1,
    borderColor: '#d6d3d1',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  workItem: {
    marginBottom: 14,
  },
  workName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1c1917',
  },
  workDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#44403c',
    marginTop: 2,
  },
  workLink: {
    fontSize: 9,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 3,
  },
  eduItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1c1917',
  },
  eduMeta: {
    fontSize: 9.5,
    color: '#57534e',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  refCard: {
    width: '48%',
    alignItems: 'center',
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1c1917',
  },
  refMeta: {
    fontSize: 9,
    color: '#57534e',
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
    color: '#1c1917',
  },
  customDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#78716c',
  },
  customSubtitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#57534e',
  },
});

function SectionTitle({ themeColor, children }: { themeColor: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.ruleSide} />
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{children}</Text>
      <View style={styles.ruleSide} />
    </View>
  );
}

export default function Maitre({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const { personalInfo } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {personalInfo.profilePicture && (
            <Image
              src={personalInfo.profilePicture}
              style={[styles.profilePicture, { borderWidth: 3, borderColor: themeColor }]}
            />
          )}
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {personalInfo.jobTitle && <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>}
          <View style={[styles.hairline, { backgroundColor: themeColor, width: '100%' }]} />
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

        <View style={styles.body}>
          {data.summary && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Profile</SectionTitle>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          )}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Experience</SectionTitle>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expTopRow}>
                    <Text style={styles.venue}>{exp.company}</Text>
                    <Text style={styles.expDates}>
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <View style={[styles.accentDash, { backgroundColor: themeColor }]} />
                  {exp.description && <Text style={styles.expDesc}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Certifications</SectionTitle>
              <View style={styles.badgeRow}>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={[styles.badge, { borderColor: themeColor }]}>
                    <Text style={[styles.badgeName, { color: themeColor }]}>{cert.name}</Text>
                    {(cert.issuer || cert.date) && (
                      <Text style={styles.badgeMeta}>
                        {cert.issuer}
                        {cert.issuer && cert.date ? ' \u00B7 ' : ''}
                        {cert.date}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Skills</SectionTitle>
              <View style={styles.tagsContainer}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.tag}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Selected Work</SectionTitle>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.workItem}>
                  <Text style={styles.workName}>{project.name}</Text>
                  {project.description && (
                    <Text style={styles.workDesc}>{project.description}</Text>
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
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    {(ref.title || ref.company) && (
                      <Text style={styles.refMeta}>
                        {ref.title}
                        {ref.title && ref.company ? ', ' : ''}
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
                          <Text style={[styles.workDesc, { marginTop: 2 }]}>{item.description}</Text>
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
