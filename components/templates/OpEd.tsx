import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';
const INK = '#1a1a1a';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingTop: 44,
    paddingBottom: 44,
    paddingLeft: 52,
    paddingRight: 52,
  },
  header: {
    marginBottom: 8,
  },
  kicker: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3.5,
    marginBottom: 10,
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: INK,
    lineHeight: 1.05,
  },
  contactLine: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 10,
  },
  thickRule: {
    borderBottomWidth: 3,
    borderBottomColor: INK,
    marginTop: 8,
    marginBottom: 4,
  },
  lede: {
    fontSize: 10.5,
    lineHeight: 1.7,
    color: '#374151',
    marginTop: 20,
  },
  section: {
    marginBottom: 6,
  },
  sectionTitleWrap: {
    borderBottomWidth: 1.5,
    borderBottomColor: INK,
    paddingBottom: 5,
    marginBottom: 12,
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: INK,
  },
  experienceItem: {
    marginBottom: 16,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: INK,
  },
  dateText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  companyName: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletDash: {
    width: 12,
    fontSize: 9,
    fontWeight: 'bold',
    color: INK,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  schoolText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  skillsText: {
    fontSize: 9.5,
    lineHeight: 1.9,
    color: '#374151',
  },
  skillName: {
    fontWeight: 'bold',
    color: INK,
  },
  skillSep: {
    color: '#9CA3AF',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  projectLink: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
    marginTop: 3,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 7,
  },
  certName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  certIssuer: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 10,
  },
  refName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  refTitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  refContact: {
    fontSize: 9,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  customSubtitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
    marginTop: 3,
  },
});

export default function OpEd({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Masthead */}
        <View style={styles.header}>
          {data.personalInfo.jobTitle ? (
            <Text style={[styles.kicker, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {contactParts.length > 0 ? (
            <Text style={styles.contactLine}>{contactParts.join('   ·   ')}</Text>
          ) : null}
        </View>
        <View style={styles.thickRule} />

        {/* Summary — the lede */}
        {data.summary ? <Text style={styles.lede}>{data.summary}</Text> : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {lines(exp.description).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDash}>—</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? <Text style={styles.dateText}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills — inline, semicolon separated */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((skill, i) => (
                <React.Fragment key={skill.id}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  {i < data.skills.length - 1 ? <Text style={styles.skillSep}>; </Text> : null}
                </React.Fragment>
              ))}
            </Text>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((project) => (
              <View key={project.id} style={styles.experienceItem}>
                <Text style={styles.projectName}>
                  {project.name}
                  {project.link ? <Text style={styles.projectLink}> — {project.link}</Text> : null}
                </Text>
                {project.description ? (
                  <Text style={styles.projectDesc}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <View>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
                </View>
                {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="References" />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom sections */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <SectionHeader title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.customDesc}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null
          )}
      </Page>
    </Document>
  );
}
