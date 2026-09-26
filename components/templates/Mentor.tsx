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
    color: '#33302b',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33302b',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 12,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 10,
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#57534e',
  },
  eduItem: {
    marginBottom: 12,
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  eduDegree: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#33302b',
  },
  eduSchool: {
    fontSize: 9,
    color: '#57534e',
  },
  eduYear: {
    fontSize: 8,
    color: '#9ca3af',
    fontWeight: 'bold',
    marginTop: 2,
  },
  credentialCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  credentialDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 3,
  },
  credentialName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#33302b',
  },
  credentialMeta: {
    fontSize: 8.5,
    color: '#57534e',
    marginTop: 2,
  },
  expItem: {
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#33302b',
  },
  expDates: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 9,
    color: '#57534e',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    fontSize: 8.5,
    fontWeight: 'bold',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  projItem: {
    marginBottom: 12,
  },
  projName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#33302b',
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
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 3,
    paddingLeft: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#33302b',
  },
  refTitle: {
    fontSize: 8,
    color: '#57534e',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#9ca3af',
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
    color: '#33302b',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#57534e',
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

export default function Mentor({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header */}
              <View style={[styles.header, { borderBottomColor: themeColor }]}>
                <View style={styles.headerRow}>
                  {data.personalInfo.profilePicture ? (
                    <Image src={data.personalInfo.profilePicture} style={styles.profilePicture} />
                  ) : null}
                  <View>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                    {data.personalInfo.jobTitle ? (
                      <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
                    ) : null}
                  </View>
                </View>
                {contactItems.length > 0 ? (
                  <View style={styles.contactRow}>
                    {contactItems.map((item, i) => (
                      <Text key={i} style={styles.contactItem}>{item}</Text>
                    ))}
                  </View>
                ) : null}
              </View>
              //Profile
                      {data.summary ? (
                        <View style={styles.section}>
                          <Text style={[styles.sectionTitle, { color: themeColor }]}>Profile</Text>
                          <Text style={styles.summaryText}>{data.summary}</Text>
                        </View>
                      ) : null}
            </>
          ),

          //Education — first major section
          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
              <View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={[styles.eduItem, { borderLeftColor: themeColor }]}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    {edu.graduationYear ? <Text style={styles.eduYear}>{edu.graduationYear}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null,

          //Credentials
          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Credentials</Text>
              <View>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.credentialCard}>
                    <View style={[styles.credentialDot, { backgroundColor: themeColor }]} />
                    <View>
                      <Text style={styles.credentialName}>{cert.name}</Text>
                      <Text style={styles.credentialMeta}>
                        {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null,

          //Experience
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
                          {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
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

          //Skills
          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
              <View style={styles.skillsContainer}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={[styles.skillTag, { borderColor: themeColor, color: themeColor }]}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null,

          //Projects
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

          //References
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
          //Custom sections
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
