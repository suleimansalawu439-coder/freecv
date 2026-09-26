import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

// Clarity — accessibility-first, high-contrast resume.
// Black text on white, large base type (11pt+), extra section spacing,
// bold clear headings, underlined links. The accent color is used ONLY
// decoratively (rules/markers) — all information readable in grayscale.

const styles = StyleSheet.create({
  page: {
    padding: 54,
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#000000',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
  },
  decorativeRule: {
    height: 5,
    width: 80,
    marginVertical: 16,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 11.5,
    fontWeight: 'medium',
    color: '#000000',
  },
  contactLink: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#000000',
    textDecoration: 'underline',
  },
  body: {
    marginTop: 30,
    flexDirection: 'column',
    gap: 32,
  },
  section: {},
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionMarker: {
    width: 9,
    height: 9,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#000000',
  },
  bodyText: {
    fontSize: 11.5,
    lineHeight: 1.6,
    color: '#000000',
  },
  expItem: {
    marginBottom: 20,
  },
  expRoleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  expDates: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#000000',
  },
  expCompany: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#000000',
    borderWidth: 1.5,
    borderColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  projectItem: {
    marginBottom: 16,
  },
  projectName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  projectLink: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#000000',
    textDecoration: 'underline',
    marginTop: 4,
  },
  eduItem: {
    marginBottom: 16,
  },
  eduDegree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  eduSchool: {
    fontSize: 11.5,
    color: '#000000',
  },
  eduYear: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 2,
  },
  certItem: {
    marginBottom: 10,
  },
  certText: {
    fontSize: 11.5,
    color: '#000000',
  },
  certBold: {
    fontWeight: 'bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 3,
    borderLeftColor: '#000000',
    paddingLeft: 10,
  },
  refName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  refMeta: {
    fontSize: 11.5,
    fontWeight: 'medium',
    color: '#000000',
  },
  customItem: {
    marginBottom: 12,
  },
  customHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  customDate: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#000000',
  },
  customSubtitle: {
    fontSize: 11.5,
    fontStyle: 'italic',
    color: '#000000',
  },
});

function SectionTitle({ themeColor, children }: { themeColor: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionMarker, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

export default function Clarity({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const { personalInfo } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.header}>
          {personalInfo.profilePicture && (
            <Image src={personalInfo.profilePicture} style={styles.profilePicture} />
          )}
          <View>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.jobTitle && <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>}
          </View>
        </View>

        {/* Decorative accent rule — purely decorative, no meaning carried by color */}
        <View style={[styles.decorativeRule, { backgroundColor: themeColor }]} />

        <View style={styles.contactRow}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          {personalInfo.website && (
            <Link src={personalInfo.website} style={styles.contactLink}>
              {personalInfo.website}
            </Link>
          )}
        </View>
            </>
          ),
        },
        )}

        <View style={styles.body}>
          {orderSections(data, {
            personal: (
              <>
          {data.summary && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Profile</SectionTitle>
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          )}
              </>
            ),

            experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Experience</SectionTitle>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expRoleRow}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expDates}>
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  {exp.description && <Text style={styles.bodyText}>{exp.description}</Text>}
                </View>
              ))}
            </View>
            ),

            skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Skills</SectionTitle>
              <View style={styles.skillsContainer}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillBadge}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
            ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Projects</SectionTitle>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  {project.description && (
                    <Text style={styles.bodyText}>{project.description}</Text>
                  )}
                  {project.link && (
                    <Link src={project.link} style={styles.projectLink}>
                      {project.link}
                    </Link>
                  )}
                </View>
              ))}
            </View>
            ),

            education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Education</SectionTitle>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  {edu.graduationYear && <Text style={styles.eduYear}>{edu.graduationYear}</Text>}
                </View>
              ))}
            </View>
            ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>Certifications</SectionTitle>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certText}>
                    <Text style={styles.certBold}>{cert.name}</Text>
                    {cert.issuer && ` \u2014 ${cert.issuer}`}
                    {cert.date && ` (${cert.date})`}
                  </Text>
                </View>
              ))}
            </View>
            ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionTitle themeColor={themeColor}>References</SectionTitle>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
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
            ),
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
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
                          <Text style={[styles.bodyText, { marginTop: 4 }]}>{item.description}</Text>
                        )}
                      </View>
                    ))}
                  </View>
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
