import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEEP_GRAY = '#374151';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 22,
    color: DEEP_GRAY,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 11,
    marginTop: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 8,
  },
  topRule: {
    height: 3,
    width: '100%',
    marginTop: 14,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: DEEP_GRAY,
    marginTop: 20,
  },
  sectionBar: {
    width: 40,
    height: 4,
    marginTop: 5,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
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
  roleCompany: {
    fontSize: 10,
    color: '#111827',
    flex: 1,
  },
  roleBold: {
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
    marginLeft: 12,
  },
  bulletList: {
    marginTop: 3,
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
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 9,
    color: '#374151',
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

export default function Senate({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean).join('  ·  ');

  const sectionHead = (title: string) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {/* Header */}
        <View>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contact ? (
            <Text style={styles.contactLine}>{contact}</Text>
          ) : null}
          <View style={[styles.topRule, { backgroundColor: themeColor }]} />
        </View>

        {data.summary ? (
          <View>
            {sectionHead('Profile')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View>
            {sectionHead('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleCompany}>
                    <Text style={styles.roleBold}>{exp.role}</Text>
                    {exp.role && exp.company ? <Text> — </Text> : null}
                    <Text>{exp.company}</Text>
                  </Text>
                  <Text style={styles.dateText}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </Text>
                </View>
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
        ),

          education: data.education && data.education.length > 0 && (
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
        ),

          skills: data.skills && data.skills.length > 0 && (
          <View>
            {sectionHead('Skills')}
            <View style={styles.skillsWrap}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.pill}>
                  <Text style={styles.pillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
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
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
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
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
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
        ),
          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id}>
                {sectionHead(section.title)}
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
            ))
        )}
      </Page>
    </Document>
  );
}
