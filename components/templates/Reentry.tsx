import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#ffffff',
    color: '#2d2a26',
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
    color: '#2d2a26',
    marginBottom: 6,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
    gap: 10,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 14,
  },
  profileText: {
    fontSize: 11.5,
    lineHeight: 1.7,
    color: '#2d2a26',
  },
  profileRule: {
    width: 72,
    height: 3,
    marginTop: 16,
  },
  strengthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  strengthTag: {
    fontSize: 9,
    backgroundColor: '#faf9f7',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    color: '#2d2a26',
  },
  expItem: {
    marginBottom: 16,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#2d2a26',
  },
  expDates: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  expCompany: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 4,
  },
  expDesc: {
    fontSize: 9,
    color: '#57534e',
    lineHeight: 1.6,
  },
  projItem: {
    marginBottom: 12,
  },
  projName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#2d2a26',
  },
  projLink: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textDecoration: 'none',
    marginTop: 2,
  },
  projDesc: {
    fontSize: 9,
    color: '#57534e',
    lineHeight: 1.5,
    marginTop: 3,
  },
  twoColGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  twoColItem: {
    flex: 1,
  },
  subLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#a8a29e',
    marginBottom: 10,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#2d2a26',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  eduYear: {
    fontSize: 8,
    color: '#a8a29e',
    fontWeight: 'bold',
    marginTop: 2,
  },
  certItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#2d2a26',
  },
  certMeta: {
    fontSize: 8.5,
    color: '#6b7280',
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
    color: '#2d2a26',
  },
  refTitle: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#a8a29e',
  },
  customItem: {
    marginBottom: 10,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#2d2a26',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  customDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  customDesc: {
    fontSize: 8.5,
    color: '#57534e',
    lineHeight: 1.5,
    marginTop: 2,
  },
});

export default function Reentry({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);
  const hasEducation = data.education && data.education.length > 0;
  const hasCertifications = data.showCertifications && data.certifications && data.certifications.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.profilePicture ? (
            <Image src={data.personalInfo.profilePicture} style={styles.profilePicture} />
          ) : null}
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.jobTitle ? <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          ) : null}
        </View>

        {/* Profile — the lead section */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Profile</Text>
            <Text style={styles.profileText}>{data.summary}</Text>
            <View style={[styles.profileRule, { backgroundColor: themeColor }]} />
          </View>
        ) : null}
            </>
          ),

        // Strengths
          skills: data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Strengths</Text>
            <View style={styles.strengthContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.strengthTag}>{skill.name}</Text>
              ))}
            </View>
          </View>
        ) : null,

        // Experience
          experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            <View>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    {(exp.startDate || exp.endDate) ? (
                      <Text style={styles.expDates}>
                        {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                      </Text>
                    ) : null}
                  </View>
                  {exp.company ? <Text style={styles.expCompany}>{exp.company}</Text> : null}
                  {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // Projects
          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
            <View>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projItem}>
                  <Text style={styles.projName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={[styles.projLink, { color: themeColor }]}>{proj.link}</Link>
                  ) : null}
                  {proj.description ? <Text style={styles.projDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // Education & Certifications
          education: hasEducation || hasCertifications ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education & Certifications</Text>
            <View style={styles.twoColGrid}>
              {hasEducation ? (
                <View style={styles.twoColItem}>
                  <Text style={styles.subLabel}>Education</Text>
                  <View>
                    {data.education.map((edu) => (
                      <View key={edu.id} style={styles.eduItem}>
                        <Text style={styles.eduDegree}>{edu.degree}</Text>
                        <Text style={styles.eduSchool}>{edu.school}</Text>
                        {edu.graduationYear ? <Text style={styles.eduYear}>{edu.graduationYear}</Text> : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
              {hasCertifications ? (
                <View style={styles.twoColItem}>
                  <Text style={styles.subLabel}>Certifications</Text>
                  <View>
                    {data.certifications!.map((cert) => (
                      <View key={cert.id} style={styles.certItem}>
                        <Text style={styles.certName}>{cert.name}</Text>
                        <Text style={styles.certMeta}>
                          {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        ) : null,

        // References
          references: data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  {(ref.title || ref.company) ? (
                    <Text style={styles.refTitle}>{ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}</Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null,
          },
          // Custom sections
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
              <View>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customHeader}>
                      <View>
                        <Text style={styles.customTitle}>{item.title}</Text>
                        {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                      </View>
                      {item.date ? <Text style={styles.customDate}>{item.date}</Text> : null}
                    </View>
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
            ))
        )}
      </Page>
    </Document>
  );
}
