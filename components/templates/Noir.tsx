import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 56,
    backgroundColor: '#111111',
    color: '#f5f5f5',
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 36,
  },
  name: {
    fontSize: 44,
    fontWeight: 'light',
    color: '#f5f5f5',
    lineHeight: 1.05,
  },
  accentRule: {
    width: 48,
    height: 3,
    marginTop: 20,
    marginBottom: 14,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#d4d4d4',
  },
  contactLine: {
    fontSize: 9,
    color: '#a3a3a3',
    marginTop: 10,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 8,
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: 'light',
    lineHeight: 1.6,
    color: '#e5e5e5',
  },
  expDates: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#a3a3a3',
    marginBottom: 4,
  },
  expRole: {
    fontSize: 16,
    fontWeight: 'light',
    color: '#f5f5f5',
  },
  expCompany: {
    fontSize: 10,
    color: '#d4d4d4',
    marginTop: 2,
  },
  expDesc: {
    fontSize: 9.5,
    fontWeight: 'light',
    lineHeight: 1.5,
    color: '#d4d4d4',
    marginTop: 6,
  },
  expItem: {
    marginBottom: 18,
  },
  bigTitle: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#f5f5f5',
  },
  subText: {
    fontSize: 10,
    color: '#d4d4d4',
    marginTop: 2,
  },
  mutedMeta: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#a3a3a3',
    marginTop: 3,
  },
  mutedLine: {
    fontSize: 9,
    color: '#a3a3a3',
    marginTop: 2,
  },
  skillsLine: {
    fontSize: 11,
    fontWeight: 'light',
    lineHeight: 2,
    color: '#e5e5e5',
  },
  linkText: {
    fontSize: 8,
    marginTop: 4,
    textDecoration: 'none',
  },
});

export default function Noir({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const sectionLabel = (title: string) => (
    <Text style={[styles.sectionLabel, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Editorial header */}
        <View style={styles.header}>
          <Text style={styles.name}>{info.fullName}</Text>
          <View style={[styles.accentRule, { backgroundColor: themeColor }]} />
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactBits.length > 0 ? (
            <Text style={styles.contactLine}>{contactBits.join('  ·  ')}</Text>
          ) : null}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            {sectionLabel('Profile')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            {sectionLabel('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                {(exp.startDate || exp.endDate) && (
                  <Text style={styles.expDates}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' — ' : ''}
                    {exp.endDate}
                  </Text>
                )}
                <Text style={styles.expRole}>{exp.role}</Text>
                {exp.company ? <Text style={styles.expCompany}>{exp.company}</Text> : null}
                {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            {sectionLabel('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 14 }}>
                <Text style={styles.bigTitle}>{edu.degree}</Text>
                {edu.school ? <Text style={styles.subText}>{edu.school}</Text> : null}
                {edu.graduationYear ? (
                  <Text style={styles.mutedMeta}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            {sectionLabel('Skills')}
            <Text style={styles.skillsLine}>{data.skills.map((s) => s.name).join('  ·  ')}</Text>
          </View>
        ) : null}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            {sectionLabel('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 14 }}>
                <Text style={styles.bigTitle}>{proj.name}</Text>
                {proj.description ? (
                  <Text style={[styles.expDesc, { marginTop: 3 }]}>{proj.description}</Text>
                ) : null}
                {proj.link ? (
                  <Link src={proj.link} style={[styles.linkText, { color: themeColor }]}>
                    {proj.link}
                  </Link>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            {sectionLabel('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 10 }}>
                <Text style={[styles.bigTitle, { fontSize: 11 }]}>{cert.name}</Text>
                {cert.issuer || cert.date ? (
                  <Text style={styles.mutedLine}>
                    {cert.issuer}
                    {cert.issuer && cert.date ? ' · ' : ''}
                    {cert.date}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            {sectionLabel('References')}
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 10 }}>
                <Text style={[styles.bigTitle, { fontSize: 11 }]}>{ref.name}</Text>
                {ref.title || ref.company ? (
                  <Text style={styles.mutedLine}>
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </Text>
                ) : null}
                {ref.contact ? (
                  <Text style={[styles.mutedLine, { color: '#737373' }]}>{ref.contact}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Custom sections */}
        {data.customSections && data.customSections.length > 0
          ? data.customSections.map(
              (section) =>
                section.items &&
                section.items.length > 0 && (
                  <View key={section.id} style={styles.section}>
                    {sectionLabel(section.title)}
                    {section.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 12 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                          }}
                        >
                          <Text style={[styles.bigTitle, { fontSize: 11 }]}>{item.title}</Text>
                          {item.date ? (
                            <Text style={[styles.mutedLine, { marginTop: 0 }]}>{item.date}</Text>
                          ) : null}
                        </View>
                        {item.subtitle ? (
                          <Text style={[styles.mutedLine, { fontStyle: 'italic' }]}>
                            {item.subtitle}
                          </Text>
                        ) : null}
                        {item.description ? (
                          <Text style={[styles.expDesc, { marginTop: 3 }]}>
                            {item.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                )
            )
          : null}
      </Page>
    </Document>
  );
}
