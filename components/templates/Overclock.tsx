import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  name: {
    fontSize: 38,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 26,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    lineHeight: 1.55,
    color: '#374151',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 10,
  },
  bulletDot: {
    fontSize: 9.5,
    color: '#9CA3AF',
    width: 10,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
    flex: 1,
  },
  experienceItem: {
    marginBottom: 16,
  },
  staggered: {
    marginLeft: 28,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  italicPill: {
    fontSize: 8.5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  projectItem: {
    marginBottom: 12,
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
    fontStyle: 'italic',
    color: '#1F2937',
  },
  certMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
});

export default function Overclock({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const headerStyle = [styles.sectionHeader, { color: themeColor }];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <Text style={styles.name}>{info.fullName}</Text>
        {info.jobTitle ? (
          <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
        ) : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <Text style={headerStyle}>Profile</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          // Experience
          experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={headerStyle}>Experience</Text>
            {data.experience.map((exp, ei) => (
              <View key={exp.id} style={ei % 2 === 1 ? [styles.experienceItem, styles.staggered] : styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                {exp.description
                  ? exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))
                  : null}
              </View>
            ))}
          </View>
        ) : null,

        // Skills
        skills: data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={headerStyle}>Skills</Text>
            <View style={styles.pillsWrap}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={[styles.italicPill, { backgroundColor: themeColor }]}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        ) : null,

        // Education
        education: data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={headerStyle}>Education</Text>
            {data.education.map((edu, ei) => (
              <View key={edu.id} style={ei % 2 === 1 ? [styles.eduRow, styles.staggered] : styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        ) : null,

        // Projects
        projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={headerStyle}>Projects</Text>
            {data.projects.map((proj, pi) => (
              <View key={proj.id} style={pi % 2 === 1 ? [styles.projectItem, styles.staggered] : styles.projectItem}>
                <Text style={styles.roleTitle}>
                  {proj.name}
                  {proj.link ? <Text style={styles.certMeta}> ({proj.link})</Text> : null}
                </Text>
                <Text style={styles.bodyText}>{proj.description}</Text>
              </View>
            ))}
          </View>
        ) : null,

        // Certifications
        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={headerStyle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.certName}>
                  {cert.name}
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
            <Text style={headerStyle}>References</Text>
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.refItem}>
                <Text style={styles.refName}>{ref.name}</Text>
                <Text style={styles.refDetail}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={headerStyle}>{section.title}</Text>
                {section.items.map((item, ii) => (
                  <View key={item.id} style={ii % 2 === 1 ? [styles.projectItem, styles.staggered] : styles.projectItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.schoolText}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.bodyText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
