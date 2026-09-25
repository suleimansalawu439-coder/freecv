import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const CHARCOAL = '#1F2937';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 24,
    color: CHARCOAL,
    textAlign: 'center',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 6,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    textAlign: 'center',
  },
  ruleLine: {
    borderBottomWidth: 1,
    borderBottomColor: CHARCOAL,
  },
  ruleGap: {
    height: 3,
  },
  sectionHeadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionRule: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    letterSpacing: 2.5,
    color: CHARCOAL,
    textTransform: 'uppercase',
    marginHorizontal: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyName: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: '#374151',
    marginBottom: 3,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9,
    color: '#4B5563',
  },
  gradYearText: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 1,
  },
  skillsParagraph: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  projectName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 8,
  },
  projectDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  certItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
  },
  certName: {
    fontWeight: 'bold',
    color: '#111827',
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeadWrap}>
      <View style={styles.sectionRule} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Regent({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contact ? (
            <Text style={styles.contactLine}>{contact}</Text>
          ) : null}
          <View style={{ marginTop: 14, width: '100%' }}>
            <View style={styles.ruleLine} />
            <View style={styles.ruleGap} />
            <View style={styles.ruleLine} />
          </View>
        </View>

        {data.summary ? (
          <View>
            <SectionHead title="Profile" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            <SectionHead title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                  </Text>
                </View>
                {exp.company ? (
                  <Text style={styles.companyName}>{exp.company}</Text>
                ) : null}
                {exp.description ? (
                  <View style={styles.bulletList}>
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
        )}

        {data.education && data.education.length > 0 && (
          <View>
            <SectionHead title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>{edu.school}</Text>
                {edu.graduationYear ? (
                  <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View>
            <SectionHead title="Skills" />
            <Text style={styles.skillsParagraph}>
              {data.skills.map((s) => s.name).join(', ')}
            </Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <SectionHead title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <View style={styles.projectRow}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link style={[styles.projectLink, { color: themeColor }]} src={proj.link}>
                      {proj.link}
                    </Link>
                  ) : null}
                </View>
                {proj.description ? (
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <SectionHead title="Certifications" />
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={styles.certItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                {cert.issuer ? <Text> — {cert.issuer}</Text> : null}
                {cert.date ? <Text>, {cert.date}</Text> : null}
              </Text>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View wrap={false}>
            <SectionHead title="References" />
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.refItem}>
                <Text style={styles.refName}>{ref.name}</Text>
                {ref.title || ref.company ? (
                  <Text style={styles.refDetail}>
                    {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                  </Text>
                ) : null}
                {ref.contact ? (
                  <Text style={styles.refContact}>{ref.contact}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id}>
                <SectionHead title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? (
                        <Text style={styles.dateText}>{item.date}</Text>
                      ) : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
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
