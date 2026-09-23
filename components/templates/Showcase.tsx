import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 48,
    paddingVertical: 48,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
  },
  name: {
    fontSize: 42,
    fontWeight: 'heavy',
    letterSpacing: -2,
    lineHeight: 1,
    marginBottom: 8,
    color: '#1a1a1a',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: 'medium',
    color: '#4b5563',
  },
  photo: {
    width: 96,
    height: 96,
    borderRadius: 12,
    objectFit: 'cover',
  },
  contactLine: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#6b7280',
    marginTop: 14,
  },
  accentBar: {
    width: 48,
    height: 3,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  // Asymmetric offset label: accent dash + uppercase label
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  labelDash: {
    width: 28,
    height: 3,
  },
  labelText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  projectItem: {
    marginBottom: 20,
    borderLeftWidth: 3,
    paddingLeft: 16,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'heavy',
    letterSpacing: -0.5,
    marginBottom: 3,
  },
  projectLink: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  expItem: {
    marginBottom: 18,
    flexDirection: 'row',
    gap: 14,
  },
  expDateCol: {
    width: '22%',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingTop: 2,
  },
  expContentCol: {
    width: '78%',
  },
  expRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eduItem: {
    marginBottom: 12,
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
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    fontSize: 9,
    fontWeight: 'bold',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
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

export default function Showcase({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  •  ');

  const offsetLabel = (title: string) => (
    <View style={styles.labelRow}>
      <View style={[styles.labelDash, { backgroundColor: themeColor }]} />
      <Text style={[styles.labelText, { color: themeColor }]}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.name}>{p.fullName}</Text>
              <Text style={styles.jobTitle}>{p.jobTitle}</Text>
            </View>
            {p.profilePicture ? <Image src={p.profilePicture} style={styles.photo} /> : null}
          </View>
          {contactLine ? <Text style={styles.contactLine}>{contactLine}</Text> : null}
        </View>

        <View style={[styles.accentBar, { backgroundColor: themeColor }]} />

        {/* Projects FIRST */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            {offsetLabel('Selected Work')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={[styles.projectItem, { borderLeftColor: themeColor }]}>
                <Text style={[styles.projectName, { color: themeColor }]}>{proj.name}</Text>
                {proj.link ? (
                  <Link src={proj.link} style={styles.projectLink}>
                    {proj.link}
                  </Link>
                ) : null}
                {proj.description ? <Text style={styles.projectDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.summary ? (
          <View style={styles.section}>
            {offsetLabel('Profile')}
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            {offsetLabel('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expDateCol}>
                  <Text>{exp.startDate}</Text>
                  <Text>{exp.endDate}</Text>
                </View>
                <View style={styles.expContentCol}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={[styles.expCompany, { color: themeColor }]}>{exp.company}</Text>
                  {exp.description ? <Text style={styles.bodyText}>{exp.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            {offsetLabel('Skills')}
            <View style={styles.skillTags}>
              {data.skills.map((skill) => (
                <Text
                  key={skill.id}
                  style={[styles.skillTag, { borderColor: themeColor, color: themeColor }]}
                >
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            {offsetLabel('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>{edu.school}</Text>
                {edu.graduationYear ? <Text style={styles.eduYear}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            {offsetLabel('Certifications')}
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
            {offsetLabel('References')}
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
                  {offsetLabel(section.title)}
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
