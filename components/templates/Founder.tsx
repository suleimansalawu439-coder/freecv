import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#ffffff',
    color: '#141414',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    marginBottom: 6,
    color: '#141414',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 12,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  headerRule: {
    height: 3,
    marginTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 12,
  },
  thesisText: {
    fontSize: 12,
    lineHeight: 1.6,
    borderLeftWidth: 3,
    paddingLeft: 14,
  },
  ventureItem: {
    marginBottom: 12,
  },
  ventureName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#141414',
  },
  ventureLink: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textDecoration: 'none',
    marginTop: 2,
  },
  ventureDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginTop: 3,
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
    fontSize: 11,
    fontWeight: 'bold',
    color: '#141414',
  },
  expDates: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    fontSize: 8,
    fontWeight: 'bold',
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#141414',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 8,
    color: '#9ca3af',
    fontWeight: 'bold',
    marginTop: 2,
  },
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#141414',
  },
  certMeta: {
    fontSize: 8.5,
    color: '#4b5563',
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
    color: '#141414',
  },
  refTitle: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#6b7280',
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
    color: '#141414',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  customDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  customDesc: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.4,
    marginTop: 2,
  },
});

export default function Founder({ data }: TemplateProps) {
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              {data.personalInfo.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
              ) : null}
            </View>
            {data.personalInfo.profilePicture ? (
              <Image src={data.personalInfo.profilePicture} style={styles.profilePicture} />
            ) : null}
          </View>
          {contactItems.length > 0 ? (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          ) : null}
          <View style={[styles.headerRule, { backgroundColor: themeColor }]} />
        </View>

        {/* Thesis */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Thesis</Text>
            <Text style={[styles.thesisText, { borderLeftColor: themeColor }]}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Ventures */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Ventures</Text>
            <View>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.ventureItem}>
                  <Text style={styles.ventureName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={[styles.ventureLink, { color: themeColor }]}>{proj.link}</Link>
                  ) : null}
                  {proj.description ? <Text style={styles.ventureDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 ? (
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
        ) : null}

        {/* Skills */}
        {data.skills && data.skills.length > 0 ? (
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
        ) : null}

        {/* Education */}
        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
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

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications</Text>
            <View>
              {data.certifications.map((cert) => (
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

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 ? (
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
        ) : null}

        {/* Custom sections */}
        {data.customSections && data.customSections.map((section) => (
          section.items && section.items.length > 0 ? (
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
          ) : null
        ))}
      </Page>
    </Document>
  );
}
