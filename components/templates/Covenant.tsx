import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

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
  frame: {
    borderWidth: 2,
    paddingHorizontal: 28,
    paddingVertical: 18,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 20,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 6,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
  sectionHeadWrap: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionPill: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
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
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  companyLine: {
    fontSize: 9,
    color: '#4B5563',
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
    color: '#374151',
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
    textAlign: 'center',
    marginBottom: 4,
  },
  certName: {
    fontWeight: 'bold',
    color: '#111827',
  },
  refItem: {
    marginBottom: 8,
    alignItems: 'center',
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
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customDate: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.4,
  },
});

export default function Covenant({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean).join('  ·  ');

  const sectionHead = (title: string) => (
    <View style={styles.sectionHeadWrap}>
      <View style={[styles.sectionPill, { borderColor: themeColor }]}>
        <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.frame, { borderColor: themeColor }]}>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
            ) : null}
          </View>
          {contact ? (
            <Text style={styles.contactLine}>{contact}</Text>
          ) : null}
        </View>

        {data.summary ? (
          <View>
            {sectionHead('Profile')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            {sectionHead('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                {exp.role ? (
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                ) : null}
                {exp.company ? (
                  <Text style={styles.companyLine}>
                    {exp.company}
                    {exp.startDate || exp.endDate ? (
                      <Text> ({exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate})</Text>
                    ) : null}
                  </Text>
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
            {sectionHead('Education')}
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
            {sectionHead('Skills')}
            <Text style={styles.skillsParagraph}>
              {data.skills.map((s) => s.name).join('  ·  ')}
            </Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            {sectionHead('Projects')}
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
            {sectionHead('Certifications')}
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
            {sectionHead('References')}
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
                {sectionHead(section.title)}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? (
                        <Text style={styles.customDate}>{item.date}</Text>
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
