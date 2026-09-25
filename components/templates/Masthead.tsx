import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    paddingTop: 46,
    paddingBottom: 56,
    paddingHorizontal: 58,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#000000',
  },
  ruleThick: {
    borderTopWidth: 3,
    borderTopColor: '#000000',
  },
  ruleThin: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    marginTop: 3,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 8,
  },
  dateline: {
    fontSize: 8.5,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#374151',
  },
  headerBlock: {
    marginBottom: 8,
  },
  bottomRuleThick: {
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    marginTop: 22,
  },
  bottomRuleThin: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginTop: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 12,
  },
  sectionRule: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 3.2,
    marginHorizontal: 14,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.7,
    textAlign: 'justify',
  },
  expItem: {
    marginBottom: 12,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  role: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  dates: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  company: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degree: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
  },
  school: {
    fontSize: 9.5,
    fontStyle: 'italic',
  },
  gradYear: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  skillsText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 1.6,
  },
  projectName: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  certText: {
    fontSize: 9.5,
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
    textAlign: 'center',
    marginBottom: 8,
  },
  refName: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
  },
  customTitle: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
  },
  customSubtitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
  },
  customDesc: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginTop: 2,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={styles.sectionRule} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Masthead({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          <View style={styles.ruleThick} />
          <View style={styles.ruleThin} />
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact ? <Text style={styles.dateline}>{contact}</Text> : null}
          <View style={styles.bottomRuleThick} />
          <View style={styles.bottomRuleThin} />
        </View>

        {data.summary ? (
          <View>
            <SectionHeader title="Profile" />
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            <SectionHeader title="Experience" />
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
                <Text style={styles.gradYear}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <SectionHeader title="Projects" />
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
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
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
      </Page>
    </Document>
  );
}
