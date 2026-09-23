import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#6b7280',
  },
  contactLine: {
    fontSize: 8,
    color: '#4b5563',
    marginTop: 4,
  },
  section: {
    marginBottom: 12,
  },
  sectionLabelContainer: {
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  bodyText: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  expEntry: {
    marginBottom: 6,
  },
  expLineOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  expCompany: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#4b5563',
  },
  expDates: {
    fontSize: 8,
    color: '#6b7280',
  },
  expDesc: {
    fontSize: 8.5,
    lineHeight: 1.35,
    color: '#4b5563',
    marginTop: 2,
  },
  twoColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  smallBold: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  smallGray: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  smallMuted: {
    fontSize: 8,
    color: '#6b7280',
  },
  linkText: {
    fontSize: 8,
    textDecoration: 'none',
  },
});

export default function Condensed({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const renderSectionLabel = (title: string) => (
    <View style={[styles.sectionLabelContainer, { borderBottomColor: themeColor }]}>
      <Text style={[styles.sectionLabel, { color: themeColor }]}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{info.fullName}</Text>
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactBits.length > 0 ? (
            <Text style={styles.contactLine}>{contactBits.join('  ·  ')}</Text>
          ) : null}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            {renderSectionLabel('Summary')}
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience — two-line entries */}
        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            {renderSectionLabel('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expEntry}>
                <View style={styles.expLineOne}>
                  <Text style={styles.expRole}>
                    {exp.role}
                    {exp.company ? <Text style={styles.expCompany}> @ {exp.company}</Text> : null}
                  </Text>
                  <Text style={styles.expDates}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            {renderSectionLabel('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.twoColRow}>
                <Text style={styles.smallBold}>
                  {edu.degree}
                  {edu.school ? <Text style={styles.smallGray}> — {edu.school}</Text> : null}
                </Text>
                {edu.graduationYear ? (
                  <Text style={styles.smallMuted}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills — one comma-separated line */}
        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            {renderSectionLabel('Skills')}
            <Text style={styles.bodyText}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        ) : null}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            {renderSectionLabel('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.twoColRow}>
                <Text style={styles.smallBold}>
                  {proj.name}
                  {proj.description ? (
                    <Text style={styles.smallGray}> — {proj.description}</Text>
                  ) : null}
                </Text>
                {proj.link ? (
                  <Link src={proj.link} style={[styles.linkText, { color: themeColor }]}>
                    Link
                  </Link>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            {renderSectionLabel('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.twoColRow}>
                <Text style={styles.smallBold}>
                  {cert.name}
                  {cert.issuer ? <Text style={styles.smallGray}> — {cert.issuer}</Text> : null}
                </Text>
                {cert.date ? <Text style={styles.smallMuted}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            {renderSectionLabel('References')}
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 4 }}>
                <Text style={styles.smallBold}>
                  {ref.name}
                  {ref.title || ref.company ? (
                    <Text style={styles.smallGray}>
                      {' '}
                      — {ref.title}
                      {ref.title && ref.company ? ' @ ' : ''}
                      {ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.smallMuted}> · {ref.contact}</Text> : null}
                </Text>
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
                    {renderSectionLabel(section.title)}
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.twoColRow}>
                        <Text style={styles.smallBold}>
                          {item.title}
                          {item.subtitle ? (
                            <Text style={styles.smallGray}> — {item.subtitle}</Text>
                          ) : null}
                          {item.description ? (
                            <Text style={styles.smallGray}> · {item.description}</Text>
                          ) : null}
                        </Text>
                        {item.date ? <Text style={styles.smallMuted}>{item.date}</Text> : null}
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
