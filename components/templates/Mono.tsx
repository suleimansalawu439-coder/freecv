import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const SERIF = 'Times-Roman';
const SANS = 'Helvetica';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: SANS,
    color: '#000000',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  masthead: {
    marginBottom: 28,
  },
  name: {
    fontFamily: SERIF,
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#4B5563',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  section: {
    borderTopWidth: 3,
    borderTopColor: '#000000',
    paddingTop: 18,
    marginBottom: 24,
  },
  sectionHeading: {
    fontFamily: SERIF,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  summaryText: {
    fontFamily: SERIF,
    fontSize: 11,
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#111827',
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.9,
    color: '#111827',
  },
  skillName: {
    fontWeight: 'bold',
  },
  skillSep: {
    color: '#9CA3AF',
  },
  experienceItem: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontFamily: SERIF,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  dateText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#4B5563',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletDash: {
    width: 14,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000000',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#1F2937',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  degreeText: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  projTitle: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  projDesc: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#1F2937',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
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
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  refDetail: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#4B5563',
    marginTop: 2,
  },
  itemTitle: {
    fontFamily: SERIF,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  itemDescription: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#1F2937',
    marginTop: 2,
  },
});

export default function Mono({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.masthead}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('   /   ')}</Text>
          ) : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Expertise</Text>
            <Text style={styles.skillsText}>
              {data.skills.map((skill, i) => (
                <React.Fragment key={skill.id}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  {i < data.skills.length - 1 ? (
                    <Text style={styles.skillSep}>  /  </Text>
                  ) : null}
                </React.Fragment>
              ))}
            </Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description ? (
                  <View>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDash}>—</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 12 }}>
                <Text style={styles.projTitle}>
                  {proj.name}
                  {proj.link ? (
                    <Text style={[styles.schoolText, { fontFamily: SANS }]}>
                      {'  '}({proj.link})
                    </Text>
                  ) : null}
                </Text>
                {proj.description ? (
                  <Text style={styles.projDesc}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.projDesc}>
                  <Text style={styles.skillName}>{cert.name}</Text>
                  {cert.issuer ? <Text>, {cert.issuer}</Text> : null}
                </Text>
                {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionHeading}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? ` · ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? (
                    <Text style={[styles.refDetail, { textTransform: 'none', letterSpacing: 0 }]}>
                      {ref.contact}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionHeading}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 12 }}>
                    <View style={styles.headerRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.itemDescription}>{item.description}</Text>
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
