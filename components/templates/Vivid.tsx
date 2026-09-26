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
  },
  header: {
    paddingHorizontal: 48,
    paddingVertical: 36,
    color: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    objectFit: 'cover',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  name: {
    fontSize: 36,
    fontWeight: 'heavy',
    letterSpacing: -1,
    marginBottom: 6,
    color: '#ffffff',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'rgba(255,255,255,0.9)',
  },
  contactLine: {
    fontSize: 9,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 14,
  },
  body: {
    paddingHorizontal: 48,
    paddingVertical: 32,
    flexDirection: 'row',
    gap: 28,
  },
  mainCol: {
    width: '67%',
    flexDirection: 'column',
    gap: 24,
  },
  rail: {
    width: '33%',
    flexDirection: 'column',
    gap: 24,
  },
  fullWidth: {
    paddingHorizontal: 48,
    paddingBottom: 24,
    flexDirection: 'column',
    gap: 24,
  },
  section: {},
  sectionTitleContainer: {
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
  sectionTitleText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  expItem: {
    marginBottom: 16,
  },
  expHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  expDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 14,
  },
  projectName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 8.5,
    color: '#6b7280',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  eduItem: {
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 9,
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
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillTag: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  certItem: {
    marginBottom: 10,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 3,
    paddingLeft: 10,
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

export default function Vivid({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  •  ');

  const sectionTitle = (title: string) => (
    <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
      <Text style={[styles.sectionTitleText, { color: themeColor }]}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Full-bleed accent header block */}
        {orderSections(data, {
          personal: (
            <View style={[styles.header, { backgroundColor: themeColor }]}>
              <View style={styles.headerRow}>
                {p.profilePicture && <Image src={p.profilePicture} style={styles.photo} />}
                <View>
                  <Text style={styles.name}>{p.fullName}</Text>
                  <Text style={styles.jobTitle}>{p.jobTitle}</Text>
                </View>
              </View>
              {contactLine ? <Text style={styles.contactLine}>{contactLine}</Text> : null}
            </View>
          ),
        })}

        <View style={styles.body}>
          {/* Main column */}
          <View style={styles.mainCol}>
            {orderSections(data, {
              personal: data.summary ? (
                <View style={styles.section}>
                  {sectionTitle('Profile')}
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null,

              experience: data.experience && data.experience.length > 0 && (
                <View style={styles.section}>
                  {sectionTitle('Experience')}
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.expItem}>
                      <View style={styles.expHeadRow}>
                        <Text style={styles.expRole}>{exp.role}</Text>
                        <Text style={styles.expDate}>
                          {exp.startDate}
                          {exp.startDate && exp.endDate ? ' — ' : ''}
                          {exp.endDate}
                        </Text>
                      </View>
                      <Text style={[styles.expCompany, { color: themeColor }]}>{exp.company}</Text>
                      {exp.description ? <Text style={styles.bodyText}>{exp.description}</Text> : null}
                    </View>
                  ))}
                </View>
              ),

              projects: data.showProjects && data.projects && data.projects.length > 0 && (
                <View style={styles.section}>
                  {sectionTitle('Projects')}
                  {data.projects.map((proj) => (
                    <View key={proj.id} style={styles.projectItem}>
                      <Text style={[styles.projectName, { color: themeColor }]}>{proj.name}</Text>
                      {proj.link ? <Text style={styles.projectLink}>{proj.link}</Text> : null}
                      {proj.description ? <Text style={styles.projectDesc}>{proj.description}</Text> : null}
                    </View>
                  ))}
                </View>
              ),
            })}
          </View>

          {/* Rail */}
          <View style={styles.rail}>
            {orderSections(data, {
              skills: data.skills && data.skills.length > 0 && (
                <View style={styles.section}>
                  {sectionTitle('Skills')}
                  <View style={styles.skillTags}>
                    {data.skills.map((skill) => (
                      <Text key={skill.id} style={[styles.skillTag, { backgroundColor: themeColor }]}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ),

              education: data.education && data.education.length > 0 && (
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
              ),

              certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
                <View style={styles.section}>
                  {sectionTitle('Certifications')}
                  {data.certifications.map((cert) => (
                    <View key={cert.id} style={styles.certItem}>
                      <Text style={styles.eduDegree}>{cert.name}</Text>
                      <Text style={styles.eduSchool}>{cert.issuer}</Text>
                      {cert.date ? <Text style={styles.eduYear}>{cert.date}</Text> : null}
                    </View>
                  ))}
                </View>
              ),
            })}
          </View>
        </View>

        <View style={styles.fullWidth}>
          {orderSections(data, {
            references: data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                {sectionTitle('References')}
                <View style={styles.refGrid}>
                  {data.references.map((ref) => (
                    <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
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
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
