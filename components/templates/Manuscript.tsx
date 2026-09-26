import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const SEPIA = '#4a3728';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 56,
    paddingRight: 56,
  },
  header: {
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    color: SEPIA,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 11.5,
    fontStyle: 'italic',
    color: SEPIA,
    marginTop: 6,
    textAlign: 'center',
    opacity: 0.85,
  },
  contactLine: {
    fontSize: 9,
    color: SEPIA,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.75,
  },
  summary: {
    fontSize: 10,
    fontStyle: 'italic',
    lineHeight: 1.85,
    color: SEPIA,
    textAlign: 'justify',
    marginTop: 26,
  },
  sectionHeaderWrap: {
    marginTop: 26,
    marginBottom: 14,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 10.5,
    color: SEPIA,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
  },
  sectionRule: {
    width: '70%',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: SEPIA,
    opacity: 0.5,
  },
  experienceItem: {
    marginBottom: 14,
  },
  roleTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: SEPIA,
  },
  subLine: {
    fontSize: 10,
    color: SEPIA,
    marginTop: 2,
  },
  subItalic: {
    fontStyle: 'italic',
  },
  subFaded: {
    fontStyle: 'italic',
    opacity: 0.8,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDash: {
    width: 12,
    fontSize: 9,
    color: SEPIA,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.8,
    color: SEPIA,
    textAlign: 'justify',
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.8,
    color: SEPIA,
    textAlign: 'justify',
  },
  eduItem: {
    marginBottom: 10,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.9,
    color: SEPIA,
    textAlign: 'justify',
  },
  skillSep: {
    opacity: 0.5,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: SEPIA,
  },
  projectLink: {
    fontSize: 9,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  certItem: {
    marginBottom: 8,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 10,
  },
  refName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: SEPIA,
  },
  refTitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: SEPIA,
  },
  refContact: {
    fontSize: 9,
    color: SEPIA,
    opacity: 0.8,
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: SEPIA,
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.8,
    color: SEPIA,
    textAlign: 'justify',
    marginTop: 3,
  },
});

export default function Manuscript({ data }: { data: ResumeData }) {
  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeaderWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header */}
              <View style={styles.header}>
                {data.personalInfo.fullName ? <Text style={styles.name}>{data.personalInfo.fullName}</Text> : null}
                {data.personalInfo.jobTitle ? (
                  <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
                ) : null}
                {contactParts.length > 0 ? (
                  <Text style={styles.contactLine}>{contactParts.join('  ·  ')}</Text>
                ) : null}
              </View>
              //Summary
                      {data.summary ? <Text style={styles.summary}>{data.summary}</Text> : null}
            </>
          ),

          //Experience
          experience: data.experience && data.experience.length > 0 && (
            <View>
              <SectionHeader title="Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.subLine}>
                    <Text style={styles.subItalic}>{exp.company}</Text>
                    {'  —  '}
                    <Text style={styles.subFaded}>
                      {exp.startDate} to {exp.endDate}
                    </Text>
                  </Text>
                  {exp.description ? (
                    <View style={styles.bulletList}>
                      {lines(exp.description).map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDash}>–</Text>
                          <Text style={styles.bulletText}>{line.trim()}</Text>
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
            <View>
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.roleTitle}>{edu.degree}</Text>
                  <Text style={styles.subLine}>
                    <Text style={styles.subItalic}>{edu.school}</Text>
                    {edu.graduationYear ? (
                      <React.Fragment>
                        {'  —  '}
                        <Text style={styles.subFaded}>{edu.graduationYear}</Text>
                      </React.Fragment>
                    ) : null}
                  </Text>
                </View>
              ))}
            </View>
          ),

          //Skills — inline, middot separated
          skills: data.skills && data.skills.length > 0 && (
            <View>
              <SectionHeader title="Skills" />
              <Text style={styles.skillsText}>
                {data.skills.map((skill, i) => (
                  <React.Fragment key={skill.id}>
                    <Text>{skill.name}</Text>
                    {i < data.skills.length - 1 ? <Text style={styles.skillSep}> · </Text> : null}
                  </React.Fragment>
                ))}
              </Text>
            </View>
          ),

          //Projects
          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <SectionHeader title="Projects" />
              {data.projects.map((project) => (
                <View key={project.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>
                    {project.name}
                    {project.link ? <Text style={styles.projectLink}> — {project.link}</Text> : null}
                  </Text>
                  {project.description ? (
                    <Text style={styles.bodyText}>{project.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          //Certifications
          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.projectName}>{cert.name}</Text>
                  <Text style={styles.subLine}>
                    {cert.issuer ? <Text style={styles.subItalic}>{cert.issuer}</Text> : null}
                    {cert.issuer && cert.date ? '  —  ' : ''}
                    {cert.date ? <Text style={styles.subFaded}>{cert.date}</Text> : null}
                  </Text>
                </View>
              ))}
            </View>
          ),

          //References
          references: data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <SectionHeader title="References" />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>
                      {ref.title}
                      {ref.company ? `, ${ref.company}` : ''}
                    </Text>
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
              <View key={section.id}>
                <SectionHeader title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    <Text style={styles.subLine}>
                      {item.subtitle ? <Text style={styles.subItalic}>{item.subtitle}</Text> : null}
                      {item.subtitle && item.date ? '  —  ' : ''}
                      {item.date ? <Text style={styles.subFaded}>{item.date}</Text> : null}
                    </Text>
                    {item.description ? (
                      <Text style={styles.customDesc}>{item.description}</Text>
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
