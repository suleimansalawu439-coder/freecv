import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: 8,
    letterSpacing: 4.5,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 20,
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  jobTitle: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
    marginTop: 6,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#000000',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#000000',
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#000000',
    textAlign: 'center',
  },
  experienceRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  dateColumn: {
    width: 90,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  dateText: {
    fontFamily: 'Times-Bold',
    fontSize: 8.5,
    color: '#000000',
    lineHeight: 1.3,
  },
  experienceBody: {
    flex: 1,
  },
  roleTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    color: '#000000',
  },
  companyText: {
    fontSize: 9.5,
    color: '#000000',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#000000',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: '#000000',
  },
  educationItem: {
    marginBottom: 8,
    alignItems: 'center',
  },
  degreeText: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#000000',
  },
  schoolText: {
    fontSize: 9,
    color: '#000000',
  },
  gradYearText: {
    fontSize: 8,
    color: '#000000',
    marginTop: 1,
  },
  skillsList: {
    alignItems: 'center',
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 4,
    width: 220,
  },
  skillNumber: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    color: '#000000',
    width: 18,
  },
  skillText: {
    fontSize: 9,
    color: '#000000',
    flex: 1,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  projectName: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#000000',
  },
  projectLink: {
    fontSize: 8,
    color: '#000000',
  },
  projectDesc: {
    fontSize: 9,
    color: '#000000',
    lineHeight: 1.4,
  },
  certItem: {
    fontSize: 9,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  certName: {
    fontFamily: 'Times-Bold',
  },
  refItem: {
    marginBottom: 8,
    alignItems: 'center',
  },
  refName: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#000000',
  },
  refDetail: {
    fontSize: 9,
    color: '#000000',
  },
  refContact: {
    fontSize: 8.5,
    color: '#000000',
  },
  customItem: {
    marginBottom: 8,
  },
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  customTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#000000',
  },
  customDate: {
    fontSize: 8.5,
    color: '#000000',
  },
  customSubtitle: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: '#000000',
  },
  customDescription: {
    fontSize: 9,
    color: '#000000',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

export default function Magistrate({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.eyebrow}>CURRICULUM VITAE</Text>
                {data.personalInfo.fullName ? (
                  <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                ) : null}
                {data.personalInfo.jobTitle ? (
                  <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
                ) : null}
                {contact ? (
                  <Text style={styles.contactLine}>{contact}</Text>
                ) : null}
              </View>
              {data.summary ? (
                <View>
                  <Text style={styles.sectionTitle}>Profile</Text>
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceRow}>
                  <View style={styles.dateColumn}>
                    {exp.startDate ? (
                      <Text style={styles.dateText}>{exp.startDate}</Text>
                    ) : null}
                    {exp.endDate ? (
                      <Text style={styles.dateText}>– {exp.endDate}</Text>
                    ) : null}
                  </View>
                  <View style={styles.experienceBody}>
                    {exp.role ? (
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                    ) : null}
                    {exp.company ? (
                      <Text style={styles.companyText}>{exp.company}</Text>
                    ) : null}
                    {exp.description ? (
                      <View>
                        {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                          <View key={i} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>{line}</Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
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

          skills: data.skills && data.skills.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsList}>
                {data.skills.map((skill, i) => (
                  <View key={skill.id} style={styles.skillRow}>
                    <Text style={styles.skillNumber}>{i + 1}.</Text>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <View style={styles.projectRow}>
                    <Text style={styles.projectName}>{proj.name}</Text>
                    {proj.link ? (
                      <Text style={styles.projectLink}>{proj.link}</Text>
                    ) : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.projectDesc}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? <Text> — {cert.issuer}</Text> : null}
                  {cert.date ? <Text>, {cert.date}</Text> : null}
                </Text>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refItem}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  {ref.title || ref.company ? (
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? (
                    <Text style={styles.refContact}>{ref.contact}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? (
                        <Text style={styles.customDate}>{item.date}</Text>
                      ) : null}
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
