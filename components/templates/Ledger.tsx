import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#1E293B',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  photoWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  photo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  initialsCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  contactItem: {
    fontSize: 9,
    color: '#CBD5E1',
    marginBottom: 6,
  },
  contactGroup: {
    marginBottom: 32,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#94A3B8',
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 28,
  },
  skillName: {
    fontSize: 9.5,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  skillRow: {
    marginBottom: 10,
  },
  barTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
  },
  barFill: {
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduMeta: {
    fontSize: 9,
    color: '#94A3B8',
    marginBottom: 10,
  },
  main: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  name: {
    fontFamily: 'Times-Roman',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontFamily: 'Times-Italic',
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 28,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontFamily: 'Times-Roman',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    paddingBottom: 8,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  bodyText: {
    fontSize: 9.5,
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
    fontFamily: 'Times-Roman',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyName: {
    fontFamily: 'Times-Italic',
    fontSize: 10.5,
    color: '#4B5563',
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
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
});

export default function Ledger({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName
        .split(' ')
        .map((w) => w.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {orderSections(data, {
            personal: (
              <>
                <View style={styles.photoWrap}>
                  {info.profilePicture ? (
                    <Image style={styles.photo} src={info.profilePicture} />
                  ) : initials ? (
                    <View style={styles.initialsCircle}>
                      <Text style={styles.initialsText}>{initials}</Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.contactGroup}>
                  {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
                  {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
                  {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
                  {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
                </View>
              </>
            ),

            skills: data.skills && data.skills.length > 0 ? (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                {data.skills.map((skill, i) => (
                  <View key={skill.id} style={styles.skillRow}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${62 + ((i * 37) % 34)}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            ) : null,

            education: data.education && data.education.length > 0 ? (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.id}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduMeta}>
                      {edu.school}
                      {edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null,
          })}
        </View>

        <View style={styles.main}>
          {orderSections(data, {
            personal: (
              <>
                <Text style={styles.name}>{info.fullName}</Text>
                {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
                {data.summary ? (
                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Profile</Text>
                    <Text style={styles.bodyText}>{data.summary}</Text>
                  </View>
                ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} — {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.companyName}>{exp.company}</Text>
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

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Projects</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={styles.projectItem}>
                    <Text style={styles.roleTitle}>
                      {proj.name}
                      {proj.link ? <Text style={styles.certMeta}> ({proj.link})</Text> : null}
                    </Text>
                    <Text style={styles.bodyText}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>Certifications</Text>
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

            references: data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>References</Text>
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
              .map((section) => (
                <View key={section.id} style={styles.section}>
                  <Text style={[styles.sectionTitle, { borderBottomColor: themeColor }]}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.projectItem}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.companyName}>{item.subtitle}</Text> : null}
                      {item.description ? (
                        <Text style={styles.bodyText}>{item.description}</Text>
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
