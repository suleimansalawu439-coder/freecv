import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const INK = '#5b4632';
const INK_SOFT = '#7a6549';
const CREAM = '#faf5ea';
const RULE = '#d8c9a8';

const styles = StyleSheet.create({
  page: {
    backgroundColor: CREAM,
    fontFamily: 'Times-Roman',
    color: INK,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 60,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    color: INK_SOFT,
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    textAlign: 'center',
    color: INK_SOFT,
    marginBottom: 16,
  },
  doubleRule: {
    marginBottom: 24,
  },
  ruleThin: {
    height: 1,
    backgroundColor: RULE,
  },
  ruleThick: {
    height: 3,
    backgroundColor: RULE,
    marginTop: 3,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  sectionRules: {
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    lineHeight: 1.5,
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
  },
  dateText: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: INK_SOFT,
  },
  companyText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: INK_SOFT,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletMark: {
    width: 12,
    fontSize: 9,
    color: INK_SOFT,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  experienceItem: {
    marginBottom: 12,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  schoolText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK_SOFT,
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.8,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.45,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  certMeta: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK_SOFT,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 1,
    borderLeftColor: RULE,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 8,
    fontStyle: 'italic',
    color: INK_SOFT,
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK_SOFT,
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 9,
    lineHeight: 1.45,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionRules}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.ruleThin} />
      <View style={[styles.ruleThin, { marginTop: 1 }]} />
    </View>
  );
}

export default function Parchment({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
        ) : null}
        <View style={styles.doubleRule}>
          <View style={styles.ruleThin} />
          <View style={styles.ruleThick} />
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Profile" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          // Experience
          experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>–</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))
                  : null}
              </View>
            ))}
          </View>
        ) : null,

        // Education
        education: data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        ) : null,

        // Skills
        skills: data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((s) => s.name).join('  ·  ')}
            </Text>
          </View>
        ) : null,

        // Projects
        projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.description ? <Text style={styles.projectDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null,

        // Certifications
        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? <Text style={styles.certMeta}> — {cert.issuer}</Text> : null}
                </Text>
                <Text style={styles.dateText}>{cert.date}</Text>
              </View>
            ))}
          </View>
        ) : null,

        // References
        references: data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="References" />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}{ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHeader title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.experienceItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
