import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 44,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 36,
    objectFit: 'cover',
    marginBottom: 10,
    borderWidth: 3,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'medium',
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  sectionRule: {
    width: 32,
    height: 2,
    marginTop: 5,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'center',
  },
  /* Timeline rail */
  railContainer: {
    position: 'relative',
    paddingLeft: 30,
  },
  rail: {
    position: 'absolute',
    left: 7,
    top: 2,
    bottom: 2,
    width: 2,
  },
  tlEntry: {
    position: 'relative',
    marginBottom: 16,
  },
  tlDot: {
    position: 'absolute',
    left: -25,
    top: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  tlDates: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  tlRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 1,
  },
  tlCompany: {
    fontSize: 9.5,
    fontWeight: 'medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  tlDesc: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
  },
  centeredBlock: {
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 1,
  },
  itemMeta: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
  },
  itemDesc: {
    fontSize: 9,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 1.4,
  },
  linkText: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: 2,
    textDecoration: 'none',
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  tag: {
    fontSize: 8.5,
    fontWeight: 'medium',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export default function Timeline({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const sectionTitle = (title: string) => (
    <View style={styles.sectionTitleWrap}>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      <View style={[styles.sectionRule, { backgroundColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Centered header */}
        <View style={styles.header}>
          {info.profilePicture ? (
            <Image
              src={info.profilePicture}
              style={[styles.profilePic, { borderColor: themeColor }]}
            />
          ) : null}
          <Text style={styles.name}>{info.fullName}</Text>
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactBits.length > 0 ? (
            <Text style={styles.contactLine}>{contactBits.join('  ·  ')}</Text>
          ) : null}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            {sectionTitle('Summary')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience timeline */}
        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Experience')}
            <View style={styles.railContainer}>
              <View style={[styles.rail, { backgroundColor: themeColor }]} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.tlEntry}>
                  <View style={[styles.tlDot, { backgroundColor: themeColor }]} />
                  {(exp.startDate || exp.endDate) && (
                    <Text style={[styles.tlDates, { color: themeColor }]}>
                      {exp.startDate}
                      {exp.startDate && exp.endDate ? ' – ' : ''}
                      {exp.endDate}
                    </Text>
                  )}
                  <Text style={styles.tlRole}>{exp.role}</Text>
                  {exp.company ? <Text style={styles.tlCompany}>{exp.company}</Text> : null}
                  {exp.description ? <Text style={styles.tlDesc}>{exp.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Education */}
        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.centeredBlock}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                {edu.school ? <Text style={styles.itemSubtitle}>{edu.school}</Text> : null}
                {edu.graduationYear ? (
                  <Text style={[styles.itemMeta, { color: themeColor }]}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills as tags */}
        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Skills')}
            <View style={styles.tagsWrap}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={[styles.tag, { borderColor: themeColor, color: themeColor }]}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            {sectionTitle('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.centeredBlock}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.description ? <Text style={styles.itemDesc}>{proj.description}</Text> : null}
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
            {sectionTitle('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.centeredBlock}>
                <Text style={[styles.itemTitle, { fontSize: 10 }]}>{cert.name}</Text>
                {cert.issuer || cert.date ? (
                  <Text style={styles.itemSubtitle}>
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
            {sectionTitle('References')}
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.centeredBlock}>
                <Text style={[styles.itemTitle, { fontSize: 10 }]}>{ref.name}</Text>
                {ref.title || ref.company ? (
                  <Text style={styles.itemSubtitle}>
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </Text>
                ) : null}
                {ref.contact ? (
                  <Text style={[styles.itemSubtitle, { color: '#9ca3af' }]}>{ref.contact}</Text>
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
                    {sectionTitle(section.title)}
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.centeredBlock}>
                        <Text style={[styles.itemTitle, { fontSize: 10 }]}>{item.title}</Text>
                        {item.subtitle ? (
                          <Text style={[styles.itemSubtitle, { fontStyle: 'italic' }]}>
                            {item.subtitle}
                          </Text>
                        ) : null}
                        {item.date ? (
                          <Text style={[styles.itemMeta, { color: themeColor }]}>{item.date}</Text>
                        ) : null}
                        {item.description ? (
                          <Text style={styles.itemDesc}>{item.description}</Text>
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
