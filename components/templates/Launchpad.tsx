import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  band: {
    paddingTop: 30,
    paddingBottom: 26,
    paddingHorizontal: 44,
    marginBottom: 20,
  },
  profilePic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    objectFit: 'cover',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  bandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  bandJobTitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  bandContact: {
    fontSize: 8.5,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 6,
  },
  body: {
    paddingHorizontal: 44,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sectionRule: {
    flex: 1,
    height: 2,
    opacity: 0.25,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  eduCard: {
    borderLeftWidth: 3,
    paddingLeft: 10,
    paddingVertical: 2,
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 1,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'medium',
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 3,
  },
  projectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  projectCard: {
    width: '48%',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 6,
    padding: 10,
    marginBottom: 4,
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  projectDesc: {
    fontSize: 8.5,
    lineHeight: 1.35,
    color: '#4b5563',
  },
  projectLink: {
    fontSize: 8,
    marginTop: 4,
    textDecoration: 'none',
  },
  expItem: {
    marginBottom: 12,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  expDates: {
    fontSize: 8,
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 9.5,
    fontWeight: 'medium',
    marginTop: 1,
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#4b5563',
    marginTop: 3,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    fontSize: 8.5,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  twoColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  smallBold: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  smallGray: {
    fontSize: 9.5,
    color: '#4b5563',
  },
  smallMuted: {
    fontSize: 8,
    color: '#6b7280',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  refCard: {
    width: '48%',
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  refMeta: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 1,
  },
  customItem: {
    marginBottom: 8,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

export default function Launchpad({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const sectionTitle = (title: string) => (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      <View style={[styles.sectionRule, { backgroundColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Accent header band */}
        <View style={[styles.band, { backgroundColor: themeColor }]}>
          {info.profilePicture ? (
            <Image src={info.profilePicture} style={styles.profilePic} />
          ) : null}
          <Text style={styles.bandName}>{info.fullName}</Text>
          {info.jobTitle ? <Text style={styles.bandJobTitle}>{info.jobTitle}</Text> : null}
          {contactBits.length > 0 ? (
            <Text style={styles.bandContact}>{contactBits.join('  ·  ')}</Text>
          ) : null}
        </View>

        <View style={styles.body}>
          {/* Summary */}
          {data.summary ? (
            <View style={styles.section}>
              {sectionTitle('About Me')}
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          ) : null}

          {/* Education FIRST — hero section */}
          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              {sectionTitle('Education')}
              {data.education.map((edu) => (
                <View key={edu.id} style={[styles.eduCard, { borderLeftColor: themeColor }]}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  {edu.school ? <Text style={styles.eduSchool}>{edu.school}</Text> : null}
                  {edu.graduationYear ? (
                    <Text style={[styles.eduYear, { color: themeColor }]}>
                      {edu.graduationYear}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Projects */}
          {data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              {sectionTitle('Projects')}
              <View style={styles.projectGrid}>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={styles.projectCard}>
                    <Text style={styles.projectName}>{proj.name}</Text>
                    {proj.description ? (
                      <Text style={styles.projectDesc}>{proj.description}</Text>
                    ) : null}
                    {proj.link ? (
                      <Link src={proj.link} style={[styles.projectLink, { color: themeColor }]}>
                        View project
                      </Link>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Experience */}
          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              {sectionTitle('Experience')}
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
                  {exp.company ? (
                    <Text style={[styles.expCompany, { color: themeColor }]}>{exp.company}</Text>
                  ) : null}
                  {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              {sectionTitle('Skills')}
              <View style={styles.skillsWrap}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillPill}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Certifications */}
          {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              {sectionTitle('Certifications')}
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
              {sectionTitle('References')}
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    {ref.title || ref.company ? (
                      <Text style={styles.refMeta}>
                        {ref.title}
                        {ref.title && ref.company ? ' @ ' : ''}
                        {ref.company}
                      </Text>
                    ) : null}
                    {ref.contact ? <Text style={styles.refMeta}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
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
                        <View key={item.id} style={styles.customItem}>
                          <View style={styles.customHeader}>
                            <Text style={styles.smallBold}>{item.title}</Text>
                            {item.date ? <Text style={styles.smallMuted}>{item.date}</Text> : null}
                          </View>
                          {item.subtitle ? (
                            <Text style={[styles.smallMuted, { fontStyle: 'italic' }]}>
                              {item.subtitle}
                            </Text>
                          ) : null}
                          {item.description ? (
                            <Text style={[styles.bodyText, { fontSize: 9, marginTop: 3 }]}>
                              {item.description}
                            </Text>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  )
              )
            : null}
        </View>
      </Page>
    </Document>
  );
}
