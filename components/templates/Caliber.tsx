import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 32,
  },
  name: {
    fontSize: 32,
    fontWeight: 'heavy',
    letterSpacing: -1,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#6b7280',
  },
  summaryLead: {
    fontSize: 13,
    lineHeight: 1.6,
    fontWeight: 'medium',
    color: '#1f2937',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCell: {
    width: '48%',
    marginBottom: 10,
  },
  skillName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  skillTrack: {
    height: 5,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  skillFill: {
    height: 5,
    width: '100%',
    borderRadius: 3,
  },
  expItem: {
    marginBottom: 24,
  },
  expRole: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  expHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  expCompany: {
    fontSize: 10.5,
    fontWeight: 'bold',
  },
  expDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  eduItem: {
    marginBottom: 14,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eduSchool: {
    fontSize: 9.5,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 14,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 8.5,
    color: '#6b7280',
    marginBottom: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  refCard: {
    width: '48%',
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  refTitle: {
    fontSize: 8,
    color: '#4b5563',
    fontWeight: 'medium',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#6b7280',
  },
  customSectionItem: {
    marginBottom: 8,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  customDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  customDesc: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
    marginTop: 2,
  },
});

export default function Caliber({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  •  ');

  const sectionTitle = (title: string) => (
    <Text style={[styles.sectionTitleText, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: themeColor }]}>{p.fullName}</Text>
          <Text style={styles.jobTitle}>{p.jobTitle}</Text>
          {contactLine ? <Text style={styles.contactLine}>{contactLine}</Text> : null}
        </View>

        {data.summary ? <Text style={styles.summaryLead}>{data.summary}</Text> : null}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Skills')}
            <View style={styles.skillGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  {/* Uniform bars: visual rhythm only, not a proficiency rating */}
                  <View style={styles.skillTrack}>
                    <View style={[styles.skillFill, { backgroundColor: themeColor }]} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <View style={styles.expHeadRow}>
                  <Text style={[styles.expCompany, { color: themeColor }]}>{exp.company}</Text>
                  <Text style={styles.expDate}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' — ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                {exp.description ? <Text style={styles.bodyText}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>{edu.school}</Text>
                {edu.graduationYear ? <Text style={styles.eduYear}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.link ? <Text style={styles.projectLink}>{proj.link}</Text> : null}
                {proj.description ? <Text style={styles.bodyText}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{cert.name}</Text>
                <Text style={styles.eduSchool}>{cert.issuer}</Text>
                {cert.date ? <Text style={styles.eduYear}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('References')}
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
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
                <View key={section.id} style={styles.section}>
                  {sectionTitle(section.title)}
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.customSectionItem}>
                      <View style={styles.customHeader}>
                        <View>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.subtitle ? (
                            <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                          ) : null}
                        </View>
                        {item.date ? <Text style={styles.customDate}>{item.date}</Text> : null}
                      </View>
                      {item.description ? (
                        <Text style={styles.customDesc}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
