import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const INK = '#111111';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 64,
    paddingRight: 64,
  },
  header: {
    alignItems: 'center',
  },
  rule: {
    borderTopWidth: 1,
    borderTopColor: INK,
    width: '100%',
  },
  ruleSpacer: {
    height: 3,
  },
  headerInner: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  name: {
    fontSize: 26,
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 6,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 9.5,
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 3.5,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.8,
  },
  contactLine: {
    fontSize: 9,
    color: INK,
    letterSpacing: 1,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.7,
  },
  summary: {
    fontSize: 10.5,
    fontStyle: 'italic',
    lineHeight: 1.85,
    color: INK,
    textAlign: 'center',
    marginTop: 28,
    opacity: 0.9,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  sideRule: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: INK,
  },
  sectionTitle: {
    fontSize: 9,
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    marginHorizontal: 18,
  },
  experienceItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 14,
    marginBottom: 14,
  },
  experienceItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: INK,
  },
  dateText: {
    fontSize: 8,
    color: INK,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.7,
  },
  companyName: {
    fontSize: 10,
    fontStyle: 'italic',
    color: INK,
    marginTop: 3,
    marginBottom: 6,
    opacity: 0.8,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: INK,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.7,
    color: INK,
    opacity: 0.85,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  degreeText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  schoolText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: INK,
    opacity: 0.8,
  },
  skillsText: {
    fontSize: 9.5,
    color: INK,
    letterSpacing: 1,
    lineHeight: 1.9,
    textAlign: 'center',
    opacity: 0.9,
  },
  projectWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
    textAlign: 'center',
  },
  projectLink: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK,
    textAlign: 'center',
    opacity: 0.7,
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: INK,
    textAlign: 'center',
    marginTop: 3,
    opacity: 0.85,
  },
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  certIssuer: {
    fontSize: 10,
    fontStyle: 'italic',
    color: INK,
    opacity: 0.8,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  refName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
    textAlign: 'center',
  },
  refTitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: INK,
    textAlign: 'center',
    opacity: 0.8,
  },
  refContact: {
    fontSize: 9,
    color: INK,
    textAlign: 'center',
    opacity: 0.7,
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
    fontSize: 10,
    fontStyle: 'italic',
    color: INK,
    opacity: 0.8,
  },
  customDesc: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: INK,
    marginTop: 3,
    opacity: 0.85,
  },
});

export default function Vellum({ data }: { data: ResumeData }) {
  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const DoubleRule = () => (
    <View>
      <View style={styles.rule} />
      <View style={styles.ruleSpacer} />
      <View style={styles.rule} />
    </View>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeaderRow}>
      <View style={styles.sideRule} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sideRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header — engraved title block */}
        <View style={styles.header}>
          <DoubleRule />
          <View style={styles.headerInner}>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
            ) : null}
            {contactParts.length > 0 ? (
              <Text style={styles.contactLine}>{contactParts.join('  ·  ')}</Text>
            ) : null}
          </View>
          <DoubleRule />
        </View>

        {/* Summary */}
        {data.summary ? <Text style={styles.summary}>{data.summary}</Text> : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View>
            <SectionHeader title="Experience" />
            {data.experience.map((exp, idx) => (
              <View
                key={exp.id}
                style={[
                  styles.experienceItem,
                  idx === data.experience.length - 1 ? styles.experienceItemLast : {},
                ]}
              >
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
                        <Text style={styles.bulletDot}>·</Text>
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
          <View>
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <View style={styles.eduRow}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  {edu.graduationYear ? <Text style={styles.dateText}>{edu.graduationYear}</Text> : null}
                </View>
                <Text style={styles.schoolText}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills — fine inline comma list */}
        {data.skills && data.skills.length > 0 && (
          <View>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((skill) => skill.name).join(', ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <SectionHeader title="Projects" />
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectWrap}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.link ? <Text style={styles.projectLink}>{project.link}</Text> : null}
                {project.description ? (
                  <Text style={styles.projectDesc}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certItem}>
                <View style={styles.eduRow}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                </View>
                {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View>
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
              <View key={section.id}>
                <SectionHeader title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.eduRow}>
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
