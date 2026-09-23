import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#ffffff',
    color: '#404040',
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 24,
    marginBottom: 28,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.3,
    color: '#171717',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 6,
  },
  contact: {
    fontSize: 9,
    color: '#737373',
    marginTop: 8,
    lineHeight: 1.6,
  },
  summaryText: {
    fontSize: 10.5,
    lineHeight: 1.8,
    color: '#525252',
    marginTop: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  certCard: {
    width: '48%',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderLeftWidth: 4,
    borderRadius: 6,
    padding: 12,
  },
  certName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
    lineHeight: 1.4,
  },
  certIssuer: {
    fontSize: 9,
    color: '#737373',
    marginTop: 3,
  },
  certDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#a3a3a3',
    marginTop: 5,
  },
  expItem: {
    marginBottom: 20,
  },
  expRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#171717',
  },
  expDates: {
    fontSize: 9,
    color: '#737373',
  },
  expCompany: {
    fontSize: 10.5,
    fontWeight: 'bold',
    marginTop: 3,
  },
  expDesc: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#525252',
    marginTop: 7,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  clinicalTag: {
    fontSize: 9,
    fontWeight: 'bold',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  eduSchool: {
    fontSize: 9,
    color: '#737373',
    marginTop: 2,
  },
  eduYear: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#a3a3a3',
  },
  projName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  projLink: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  projDesc: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#525252',
    marginTop: 6,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    paddingLeft: 10,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  refName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  refDetail: {
    fontSize: 9,
    color: '#737373',
    marginTop: 2,
  },
});

export default function NightShift({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const pi = data.personalInfo;
  const contactLine = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{pi.fullName}</Text>
          {pi.jobTitle ? <Text style={[styles.jobTitle, { color: themeColor }]}>{pi.jobTitle}</Text> : null}
          {contactLine ? <Text style={styles.contact}>{contactLine}</Text> : null}
          {data.summary ? <Text style={styles.summaryText}>{data.summary}</Text> : null}
        </View>

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications &amp; Licenses</Text>
            <View style={styles.certGrid}>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={[styles.certCard, { borderLeftColor: themeColor }]}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
                  {cert.date ? <Text style={styles.certDate}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Work Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expRow}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDates}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                <Text style={[styles.expCompany, { color: themeColor }]}>{exp.company}</Text>
                {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
            <View style={styles.tagsContainer}>
              {data.skills.map((skill) => (
                <Text
                  key={skill.id}
                  style={[styles.clinicalTag, { backgroundColor: themeColor, color: '#ffffff', opacity: 0.85 }]}
                >
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? <Text style={styles.eduYear}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 16 }}>
                <Text style={styles.projName}>{proj.name}</Text>
                {proj.link ? <Text style={[styles.projLink, { color: themeColor }]}>{proj.link}</Text> : null}
                {proj.description ? <Text style={styles.projDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
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
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 14 }}>
                      <View style={styles.expRow}>
                        <Text style={styles.eduDegree}>{item.title}</Text>
                        {item.date ? <Text style={styles.eduYear}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.eduSchool}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.expDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
