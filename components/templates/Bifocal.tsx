import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  container: {
    paddingTop: 32,
    paddingHorizontal: 40,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  contactCol: {
    alignItems: 'flex-end',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 2,
  },
  duoTop: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  duoSummary: {
    width: '58%',
    paddingRight: 16,
  },
  duoSkills: {
    width: '42%',
    paddingLeft: 16,
  },
  duoFull: {
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginRight: 10,
  },
  hairline: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  summaryText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  expItem: {
    marginBottom: 14,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: '#6B7280',
    width: 9,
  },
  bulletText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  certDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCard: {
    width: '50%',
    paddingRight: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  customSubtitle: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
  },
});

export default function Bifocal({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const hasSummary = Boolean(data.summary);
  const hasSkills = data.skills && data.skills.length > 0;

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      <View style={styles.hairline} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <View>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
              ) : null}
            </View>
            {contactItems.length > 0 ? (
              <View style={styles.contactCol}>
                {contactItems.map((item, i) => (
                  <Text key={i} style={styles.contactItem}>{item}</Text>
                ))}
              </View>
            ) : null}
          </View>

          {hasSummary || hasSkills ? (
            <View style={styles.duoTop}>
              {hasSummary ? (
                <View style={hasSkills ? styles.duoSummary : styles.duoFull}>
                  <SectionHeader title="Profile" />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
              {hasSkills ? (
                <View style={hasSummary ? styles.duoSkills : styles.duoFull}>
                  <SectionHeader title="Skills" />
                  <View style={styles.skillsRow}>
                    {data.skills.map((skill) => (
                      <View key={skill.id} style={[styles.skillChip, { backgroundColor: themeColor }]}>
                        <Text style={styles.skillText}>{skill.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description ? (
                    <View>
                      {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
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
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                  </View>
                  <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showProjects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id}>
                  <Text style={styles.projectName}>
                    {proj.name}{proj.link ? <Text style={styles.certDetail}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name} <Text style={styles.certDetail}>— {cert.issuer}</Text>
                  </Text>
                  <Text style={styles.certDetail}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="References" />
              <View style={styles.refRow}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    <Text style={styles.refDetail}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.customSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <SectionHeader title={section.title} />
              {section.items.map((item) => (
                <View key={item.id}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                  </View>
                  {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                  {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
