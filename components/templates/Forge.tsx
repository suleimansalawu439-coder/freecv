import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#ffffff',
    color: '#171717',
    fontFamily: 'Helvetica',
  },
  topBar: {
    width: 64,
    height: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#525252',
    marginTop: 6,
  },
  contact: {
    fontSize: 9,
    color: '#525252',
    marginTop: 6,
  },
  summaryBox: {
    borderLeftWidth: 4,
    paddingLeft: 10,
    marginTop: 16,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#171717',
  },
  certStrip: {
    position: 'relative',
    marginHorizontal: -44,
    paddingHorizontal: 44,
    paddingVertical: 20,
    marginBottom: 20,
    marginTop: 4,
  },
  certStripTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.12,
  },
  certStripTitle: {
    fontSize: 15,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  certCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    padding: 10,
  },
  certName: {
    fontSize: 10,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
    lineHeight: 1.3,
  },
  certIssuer: {
    fontSize: 9,
    color: '#525252',
    marginTop: 3,
  },
  certDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#737373',
    marginTop: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    borderBottomWidth: 4,
    paddingBottom: 4,
    marginBottom: 14,
  },
  sectionTitleText: {
    fontSize: 15,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.3,
  },
  expItem: {
    marginBottom: 16,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expRole: {
    fontSize: 11,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
  },
  expDates: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#737373',
  },
  expCompany: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#404040',
    marginTop: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  ticketTag: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
  },
  eduSchool: {
    fontSize: 9,
    color: '#525252',
    marginTop: 2,
  },
  eduYear: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#737373',
  },
  projName: {
    fontSize: 10,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
  },
  projLink: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  projDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#404040',
    marginTop: 4,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 4,
    paddingLeft: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'black',
    textTransform: 'uppercase',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#525252',
    marginTop: 2,
  },
});

export default function Forge({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const pi = data.personalInfo;
  const contactLine = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');
  const hasCerts = data.showCertifications && data.certifications && data.certifications.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.topBar, { backgroundColor: themeColor }]} />
        <Text style={styles.name}>{pi.fullName}</Text>
        {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
        {contactLine ? <Text style={styles.contact}>{contactLine}</Text> : null}
        {data.summary ? (
          <View style={[styles.summaryBox, { borderLeftColor: themeColor }]}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {hasCerts && (
          <View style={styles.certStrip}>
            <View style={[styles.certStripTint, { backgroundColor: themeColor }]} />
            <Text style={styles.certStripTitle}>Certifications &amp; Licenses</Text>
            <View style={styles.certGrid}>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={[styles.certCard, { borderColor: themeColor }]}>
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
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={styles.sectionTitleText}>Work Experience</Text>
            </View>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
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
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={styles.sectionTitleText}>Skills</Text>
            </View>
            <View style={styles.tagsContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={[styles.ticketTag, { borderColor: themeColor }]}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={styles.sectionTitleText}>Education</Text>
            </View>
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
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={styles.sectionTitleText}>Projects</Text>
            </View>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 12 }}>
                <Text style={styles.projName}>{proj.name}</Text>
                {proj.link ? <Text style={[styles.projLink, { color: themeColor }]}>{proj.link}</Text> : null}
                {proj.description ? <Text style={styles.projDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={styles.sectionTitleText}>References</Text>
            </View>
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
                  <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                  </View>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <View style={styles.expHeaderRow}>
                        <Text style={styles.expRole}>{item.title}</Text>
                        {item.date ? <Text style={styles.expDates}>{item.date}</Text> : null}
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
