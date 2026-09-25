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
  header: {
    alignItems: 'center',
    marginBottom: 28,
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
    marginBottom: 6,
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 12,
  },
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ornamentBar: {
    width: 34,
    height: 3,
    borderRadius: 2,
  },
  ornamentDiamond: {
    width: 9,
    height: 9,
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderRowRight: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTick: {
    width: 26,
    height: 3,
    marginRight: 10,
  },
  headerTickRight: {
    width: 26,
    height: 3,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
  },
  summaryTextRight: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'right',
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
  itemHeaderRowRight: {
    flexDirection: 'row-reverse',
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
    marginBottom: 4,
  },
  companyNameRight: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  bulletText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 2,
  },
  bulletTextRight: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 2,
    textAlign: 'right',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillsRowRight: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  skillChip: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillChipRight: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  eduRowRight: {
    flexDirection: 'row-reverse',
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
  projectDescRight: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
    textAlign: 'right',
  },
  certText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  certDetail: {
    fontSize: 9,
    color: '#4B5563',
    fontWeight: 'normal',
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
    fontSize: 10,
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

export default function Zigzag({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Alternate: even = left, odd = right
  let zagIndex = 0;
  const zag = () => {
    const right = zagIndex % 2 === 1;
    zagIndex += 1;
    return right;
  };
  const rightSummary = data.summary ? zag() : false;
  const rightExp = data.experience && data.experience.length > 0 ? zag() : false;
  const rightSkills = data.skills && data.skills.length > 0 ? zag() : false;
  const rightEdu = data.education && data.education.length > 0 ? zag() : false;
  const rightProj = data.showProjects && data.projects.length > 0 ? zag() : false;
  const rightCert = data.showCertifications && data.certifications.length > 0 ? zag() : false;
  const rightRef = data.showReferences && data.references.length > 0 ? zag() : false;

  const SectionHeader = ({ title, right }: { title: string; right: boolean }) => (
    <View style={right ? styles.sectionHeaderRowRight : styles.sectionHeaderRow}>
      <View style={[right ? styles.headerTickRight : styles.headerTick, { backgroundColor: themeColor }]} />
      <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
            ) : null}
            {contactItems.length > 0 ? (
              <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
            ) : null}
            <View style={styles.ornamentRow}>
              <View style={[styles.ornamentBar, { backgroundColor: themeColor }]} />
              <View style={[styles.ornamentDiamond, { backgroundColor: themeColor, transform: 'rotate(45deg)' }]} />
              <View style={[styles.ornamentBar, { backgroundColor: themeColor }]} />
            </View>
          </View>

          {data.summary ? (
            <View style={styles.section}>
              <SectionHeader title="Profile" right={rightSummary} />
              <Text style={rightSummary ? styles.summaryTextRight : styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Experience" right={rightExp} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={rightExp ? styles.itemHeaderRowRight : styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={[rightExp ? styles.companyNameRight : styles.companyName, { color: themeColor }]}>
                    {exp.company}
                  </Text>
                  {exp.description ? (
                    <View>
                      {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <Text key={i} style={rightExp ? styles.bulletTextRight : styles.bulletText}>
                          {line}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Skills" right={rightSkills} />
              <View style={rightSkills ? styles.skillsRowRight : styles.skillsRow}>
                {data.skills.map((skill) => (
                  <View
                    key={skill.id}
                    style={[rightSkills ? styles.skillChipRight : styles.skillChip, { backgroundColor: themeColor }]}
                  >
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Education" right={rightEdu} />
              {data.education.map((edu) => (
                <View key={edu.id} style={rightEdu ? styles.eduRowRight : styles.eduRow}>
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
              <SectionHeader title="Projects" right={rightProj} />
              {data.projects.map((proj) => (
                <View key={proj.id}>
                  <Text style={styles.projectName}>
                    {proj.name}{proj.link ? <Text style={styles.certDetail}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={rightProj ? styles.projectDescRight : styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {data.showCertifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Certifications" right={rightCert} />
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={styles.certText}>
                  {cert.name} <Text style={styles.certDetail}>— {cert.issuer} · {cert.date}</Text>
                </Text>
              ))}
            </View>
          ) : null}

          {data.showReferences && data.references.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="References" right={rightRef} />
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

          {data.customSections.map((section, si) => {
            const right = (zagIndex + si) % 2 === 1;
            return (
              <View key={section.id} style={styles.section}>
                <SectionHeader title={section.title} right={right} />
                {section.items.map((item) => (
                  <View key={item.id}>
                    <View style={right ? styles.itemHeaderRowRight : styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
