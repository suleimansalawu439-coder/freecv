import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '32%',
    padding: 22,
    flexDirection: 'column',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 10,
    color: '#E2E8F0',
    marginBottom: 16,
  },
  contactGroup: {
    marginBottom: 18,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#E2E8F0',
    marginBottom: 5,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.65)',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 20,
  },
  skillItem: {
    marginBottom: 8,
  },
  skillName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  barTrack: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  barFill: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
  },
  customItemTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 1,
  },
  customItemSub: {
    fontSize: 8,
    color: '#E2E8F0',
    marginBottom: 6,
  },
  mainContent: {
    width: '68%',
    padding: 24,
    flexDirection: 'column',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
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
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#4B5563',
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
    fontSize: 8.5,
    color: '#4B5563',
  },
  projectItem: {
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemSub: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  itemDesc: {
    fontSize: 8.5,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.4,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8,
    color: '#6B7280',
  },
});

export default function Gauge({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const initial = info.fullName?.charAt(0) || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: themeColor }]}>
          {orderSections(data, {
            personal: (
              <>
          <View>
            {initial ? (
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
            ) : null}
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          </View>

          <View style={styles.contactGroup}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? (
              <Link style={styles.contactItem} src={info.website}>{info.website}</Link>
            ) : null}
          </View>
              </>
            ),

            skills: data.skills && data.skills.length > 0 && (
            <View style={styles.sidebarBlock}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {data.skills.map((skill, i) => {
                const level = 60 + ((i * 37) % 36);
                return (
                  <View key={skill.id} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${level}%` }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          ),
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id} style={styles.sidebarBlock}>
                  <Text style={styles.sidebarSectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id}>
                      <Text style={styles.customItemTitle}>{item.title}</Text>
                      {item.subtitle ? (
                        <Text style={styles.customItemSub}>{item.subtitle}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ))
          )}
        </View>

        {/* Main column */}
        <View style={styles.mainContent}>
          {orderSections(data, {
            personal: data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null,

            experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                  </View>
                  <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                  {exp.description ? (
                    <View>
                      {exp.description.split(/\n|\r\n/).filter((l) => l.trim()).map((line, i) => (
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
              ))}
            </View>
          ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.itemDesc}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.projectItem}>
                  <View style={styles.itemHeaderRow}>
                    <View>
                      <Text style={styles.itemTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.itemSub}>{cert.issuer}</Text> : null}
                    </View>
                    {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                    {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ),
          })}
        </View>
      </Page>
    </Document>
  );
}
