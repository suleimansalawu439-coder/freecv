import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 72,
    paddingVertical: 80,
    backgroundColor: '#ffffff',
    color: '#1c1c1c',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 56,
  },
  profilePicture: {
    width: 64,
    height: 64,
    marginBottom: 28,
  },
  name: {
    fontSize: 40,
    fontWeight: 'light',
    letterSpacing: 2,
    color: '#1c1c1c',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 4.5,
    color: '#6b7280',
  },
  contactList: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 3,
  },
  contactItem: {
    fontSize: 8,
    letterSpacing: 1.5,
    color: '#9ca3af',
  },
  hairline: {
    height: 1,
    marginTop: 36,
    opacity: 0.3,
  },
  section: {
    marginBottom: 52,
  },
  sectionLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 5,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 10.5,
    lineHeight: 2,
    color: '#1c1c1c',
  },
  expItem: {
    marginBottom: 28,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 14,
    fontWeight: 'light',
    letterSpacing: 1,
    color: '#1c1c1c',
  },
  expDates: {
    fontSize: 7.5,
    letterSpacing: 2.5,
    color: '#9ca3af',
  },
  expCompany: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#6b7280',
    marginTop: 6,
  },
  expDesc: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.9,
    marginTop: 8,
  },
  blockItem: {
    marginBottom: 24,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: 'light',
    letterSpacing: 1,
    color: '#1c1c1c',
  },
  blockLink: {
    fontSize: 8,
    letterSpacing: 1.5,
    textDecoration: 'none',
    marginTop: 4,
  },
  blockMeta: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#9ca3af',
    marginTop: 6,
  },
  blockDesc: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.9,
    marginTop: 8,
  },
  skillsText: {
    fontSize: 9.5,
    letterSpacing: 2,
    lineHeight: 2.2,
    color: '#1c1c1c',
  },
  customItem: {
    marginBottom: 24,
  },
  customHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 14,
    fontWeight: 'light',
    letterSpacing: 1,
    color: '#1c1c1c',
  },
  customDate: {
    fontSize: 7.5,
    letterSpacing: 2.5,
    color: '#9ca3af',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 6,
  },
  customDesc: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.9,
    marginTop: 8,
  },
});

export default function Atelier({ data }: TemplateProps) {
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
          {data.personalInfo.profilePicture ? (
            <Image src={data.personalInfo.profilePicture} style={styles.profilePicture} />
          ) : null}
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.jobTitle ? <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <View style={styles.contactList}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          ) : null}
          <View style={[styles.hairline, { backgroundColor: themeColor }]} />
        </View>

        {/* Profile */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>Profile</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>Experience</Text>
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
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>Projects</Text>
            <View>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.blockItem}>
                  <Text style={styles.blockTitle}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={[styles.blockLink, { color: themeColor }]}>{proj.link}</Link>
                  ) : null}
                  {proj.description ? <Text style={styles.blockDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* Education */}
        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>Education</Text>
            <View>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.blockItem}>
                  <Text style={styles.blockTitle}>{edu.degree}</Text>
                  <Text style={styles.blockMeta}>
                    {edu.school}{edu.school && edu.graduationYear ? ' — ' : ''}{edu.graduationYear}
                  </Text>
                </View>
              ))}
            </View>
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* Skills */}
        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>Skills</Text>
            <Text style={styles.skillsText}>
              {data.skills.map((skill) => skill.name).join(' · ')}
            </Text>
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>Certifications</Text>
            <View>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.blockItem}>
                  <Text style={styles.blockTitle}>{cert.name}</Text>
                  <Text style={styles.blockMeta}>
                    {cert.issuer}{cert.issuer && cert.date ? ' — ' : ''}{cert.date}
                  </Text>
                </View>
              ))}
            </View>
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColor }]}>References</Text>
            <View>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.blockItem}>
                  <Text style={styles.blockTitle}>{ref.name}</Text>
                  {(ref.title || ref.company) ? (
                    <Text style={styles.blockMeta}>
                      {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.blockLink}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
            <View style={[styles.hairline, { backgroundColor: themeColor }]} />
          </View>
        ) : null}

        {/* Custom sections */}
        {data.customSections && data.customSections.map((section) => (
          section.items && section.items.length > 0 ? (
            <View key={section.id} style={styles.section}>
              <Text style={[styles.sectionLabel, { color: themeColor }]}>{section.title}</Text>
              <View>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.customDate}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
              <View style={[styles.hairline, { backgroundColor: themeColor }]} />
            </View>
          ) : null
        ))}
      </Page>
    </Document>
  );
}
