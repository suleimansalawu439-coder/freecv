import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    flexDirection: 'row',
  },
  rail: {
    width: '34%',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 24,
    paddingVertical: 32,
    flexDirection: 'column',
    gap: 24,
  },
  main: {
    width: '66%',
    paddingHorizontal: 36,
    paddingVertical: 32,
    flexDirection: 'column',
    gap: 22,
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    objectFit: 'cover',
    borderRadius: 8,
  },
  sectionTitleText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#374151',
    marginBottom: 5,
  },
  skillItem: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  eduItem: {
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginTop: 2,
  },
  name: {
    fontSize: 30,
    fontWeight: 'heavy',
    letterSpacing: -1,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'medium',
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  expItem: {
    marginBottom: 16,
  },
  expRole: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  expHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  expCompany: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  expDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6b7280',
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
    gap: 12,
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

export default function Portrait({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const p = data.personalInfo;

  const sectionTitle = (title: string) => (
    <Text style={[styles.sectionTitleText, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left rail */}
        <View style={styles.rail}>
          {orderSections(data, {
            personal: (
              <>
          {p.profilePicture ? <Image src={p.profilePicture} style={styles.photo} /> : null}

          <View>
            {sectionTitle('Contact')}
            {p.email ? <Text style={styles.contactItem}>{p.email}</Text> : null}
            {p.phone ? <Text style={styles.contactItem}>{p.phone}</Text> : null}
            {p.location ? <Text style={styles.contactItem}>{p.location}</Text> : null}
            {p.website ? <Text style={styles.contactItem}>{p.website}</Text> : null}
          </View>
              </>
            ),

            // Skills
            skills: data.skills && data.skills.length > 0 && (
            <View>
              {sectionTitle('Skills')}
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          ),

            // Education
            education: data.education && data.education.length > 0 && (
            <View>
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
          )}
        </View>

        {/* Main column */}
        <View style={styles.main}>
          {orderSections(data, {
            personal: (
              <>
          <View>
            <Text style={styles.name}>{p.fullName}</Text>
            <Text style={[styles.jobTitle, { color: themeColor }]}>{p.jobTitle}</Text>
          </View>

          {data.summary ? (
            <View>
              {sectionTitle('Profile')}
              <Text style={styles.bodyText}>{data.summary}</Text>
            </View>
          ) : null}
              </>
            ),

            // Experience
            experience: data.experience && data.experience.length > 0 && (
            <View>
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
          ),

            // Projects
            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              {sectionTitle('Projects')}
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.projectLink}>{proj.link}</Text> : null}
                  {proj.description ? <Text style={styles.bodyText}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ),

            // Certifications
            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              {sectionTitle('Certifications')}
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{cert.name}</Text>
                  <Text style={styles.eduSchool}>{cert.issuer}</Text>
                  {cert.date ? <Text style={styles.eduYear}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ),

            // References
            references: data.showReferences && data.references && data.references.length > 0 && (
            <View>
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
          ),
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id}>
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
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
