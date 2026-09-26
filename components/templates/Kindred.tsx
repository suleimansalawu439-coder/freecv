import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const WARM = '#B45309';
const WARM_DARK = '#78350F';
const WARM_TINT = '#FFFBEB';
const WARM_PILL = '#FEF3C7';
const WARM_BORDER = '#FDE68A';
const WARM_RULE = '#FCD34D';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 56,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: WARM_DARK,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: WARM,
    marginBottom: 8,
  },
  contactRow: {
    fontSize: 8.5,
    color: '#64748B',
  },
  contactLink: {
    fontSize: 8.5,
    color: WARM,
    textDecoration: 'none',
  },
  section: {
    marginBottom: 20,
  },
  sectionPill: {
    alignSelf: 'flex-start',
    backgroundColor: WARM_PILL,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  sectionPillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: WARM_DARK,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summaryBox: {
    borderLeftWidth: 3,
    borderLeftColor: WARM_RULE,
    backgroundColor: WARM_TINT,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    backgroundColor: WARM_TINT,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: WARM,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 8,
    color: '#6B7280',
  },
  bulletList: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#D97706',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    backgroundColor: WARM_TINT,
    borderWidth: 1,
    borderColor: WARM_BORDER,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: WARM_DARK,
  },
  certItem: {
    borderLeftWidth: 2,
    borderLeftColor: WARM_RULE,
    paddingLeft: 12,
    marginBottom: 8,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  certIssuer: {
    fontSize: 9,
    color: '#4B5563',
  },
  certDate: {
    fontSize: 8,
    color: '#6B7280',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9,
    color: '#4B5563',
  },
  gradYearText: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 1,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 8.5,
    color: WARM,
    textDecoration: 'none',
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    backgroundColor: WARM_TINT,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.45,
  },
});

export default function Kindred({ data }: { data: ResumeData }) {
  const contactItems = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header */}
              <View style={styles.header}>
                {data.personalInfo.fullName ? (
                  <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                ) : null}
                {data.personalInfo.jobTitle ? (
                  <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
                ) : null}
                {(contactItems.length > 0 || data.personalInfo.website) && (
                  <Text style={styles.contactRow}>
                    {contactItems.join('  •  ')}
                    {data.personalInfo.website ? (
                      <Link style={styles.contactLink} src={data.personalInfo.website}>
                        {contactItems.length > 0 ? '  •  ' : ''}{data.personalInfo.website}
                      </Link>
                    ) : null}
                  </Text>
                )}
              </View>
              //Summary
                      {data.summary ? (
                        <View style={styles.section}>
                          <View style={styles.sectionPill}>
                            <Text style={styles.sectionPillText}>Summary</Text>
                          </View>
                          <View style={styles.summaryBox}>
                            <Text style={styles.summaryText}>{data.summary}</Text>
                          </View>
                        </View>
                      ) : null}
            </>
          ),

          //Experience
          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionPill}>
                <Text style={styles.sectionPillText}>Experience</Text>
              </View>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description ? (
                    <View style={styles.bulletList}>
                      {exp.description
                        .split(/\n|\r?\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>{line}</Text>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          //Education
          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionPill}>
                <Text style={styles.sectionPillText}>Education</Text>
              </View>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          //Skills
          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionPill}>
                <Text style={styles.sectionPillText}>Skills</Text>
              </View>
              <View style={styles.skillsRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillPill}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          //Certifications
          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionPill}>
                <Text style={styles.sectionPillText}>Certifications</Text>
              </View>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
                  {cert.date ? <Text style={styles.certDate}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ),

          //Projects
          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionPill}>
                <Text style={styles.sectionPillText}>Projects</Text>
              </View>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link style={styles.projectLink} src={proj.link}>
                      {proj.link}
                    </Link>
                  ) : null}
                  {proj.description ? (
                    <Text style={styles.projectDescription}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          //References
          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section} wrap={false}>
              <View style={styles.sectionPill}>
                <Text style={styles.sectionPillText}>References</Text>
              </View>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>{ref.title}{ref.company ? `, ${ref.company}` : ''}</Text>
                    {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ),
        },
          //Custom sections
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <View style={styles.sectionPill}>
                  <Text style={styles.sectionPillText}>{section.title}</Text>
                </View>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
