import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const NAVY = '#1f2a44';
const GOLD = '#c9a227';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#111827',
  },
  band: {
    backgroundColor: NAVY,
    paddingTop: 34,
    paddingBottom: 28,
    paddingHorizontal: 58,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 10,
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    marginTop: 8,
  },
  contact: {
    fontSize: 9.5,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 10,
  },
  goldRule: {
    height: 3,
    backgroundColor: GOLD,
  },
  body: {
    paddingTop: 10,
    paddingBottom: 56,
    paddingHorizontal: 58,
  },
  sectionHeaderBlock: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: NAVY,
    marginBottom: 5,
  },
  ruleNavy: {
    borderTopWidth: 2,
    borderTopColor: NAVY,
  },
  ruleGold: {
    borderTopWidth: 1,
    borderTopColor: GOLD,
    marginTop: 2,
  },
  summary: {
    fontSize: 10.5,
    fontStyle: 'italic',
    lineHeight: 1.8,
    textAlign: 'justify',
    borderLeftWidth: 2,
    borderLeftColor: GOLD,
    paddingLeft: 12,
  },
  expItem: {
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  role: {
    fontSize: 11.5,
    fontFamily: 'Times-Bold',
  },
  dates: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
    color: NAVY,
  },
  company: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: GOLD,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.55,
    color: '#1F2937',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  school: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#374151',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.9,
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#1F2937',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  certText: {
    fontSize: 10,
  },
  certName: {
    fontFamily: 'Times-Bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    borderLeftColor: GOLD,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#374151',
  },
  customTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  customSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#374151',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#1F2937',
    marginTop: 2,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeaderBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.ruleNavy} />
      <View style={styles.ruleGold} />
    </View>
  );
}

export default function Flagship({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.band}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        </View>
        <View style={styles.goldRule} />

        <View style={styles.body}>
          {data.summary ? (
            <View>
              <SectionHeader title="Profile" />
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 && (
            <View>
              <SectionHeader title="Professional Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.role}>{exp.role}</Text>
                    <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          )}

          {data.education && data.education.length > 0 && (
            <View>
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.school}>{edu.school}</Text>
                  </View>
                  <Text style={styles.dates}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          )}

          {data.skills && data.skills.length > 0 && (
            <View>
              <SectionHeader title="Areas of Expertise" />
              <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join('  ·  ')}</Text>
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <SectionHeader title="Selected Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.expItem}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.projectName}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.dates}>{proj.link}</Text> : null}
                  </View>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certText}>
                    <Text style={styles.certName}>{cert.name}</Text>
                    {cert.issuer ? `, ${cert.issuer}` : ''}
                  </Text>
                  <Text style={styles.dates}>{cert.date}</Text>
                </View>
              ))}
            </View>
          )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <SectionHeader title="References" />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}
                      {ref.company ? `, ${ref.company}` : ''}
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
                  <View key={section.id}>
                    <SectionHeader title={section.title} />
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.expItem}>
                        <View style={styles.expHeaderRow}>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.date ? <Text style={styles.dates}>{item.date}</Text> : null}
                        </View>
                        {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                        {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                )
            )}
        </View>
      </Page>
    </Document>
  );
}
