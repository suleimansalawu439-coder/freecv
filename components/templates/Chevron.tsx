import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    paddingHorizontal: 36,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 26,
  },
  headerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6B7280',
    marginHorizontal: 7,
    marginBottom: 3,
  },
  headerRule: {
    width: 72,
    height: 4,
    marginTop: 12,
  },
  section: {
    marginBottom: 20,
  },
  ribbonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ribbon: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    paddingRight: 10,
  },
  ribbonText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
  },
  ribbonTip: {
    width: 12,
    height: 12,
    marginLeft: -6,
    transform: 'rotate(45deg)',
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
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
    color: '#4B5563',
    marginBottom: 4,
  },
  experienceItem: {
    marginBottom: 12,
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
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillCell: {
    width: '47%',
    marginBottom: 10,
  },
  skillName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  segmentsRow: {
    flexDirection: 'row',
  },
  segment: {
    width: 26,
    height: 6,
    marginRight: 5,
  },
  segmentEmpty: {
    backgroundColor: '#E5E7EB',
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

export default function Chevron({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const ribbonHeader = (title: string) => (
    <View style={styles.ribbonRow}>
      <View style={[styles.ribbon, { backgroundColor: themeColor }]}>
        <Text style={styles.ribbonText}>{title}</Text>
      </View>
      <View style={[styles.ribbonTip, { backgroundColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.headerName}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.headerTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 && (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          )}
          <View style={[styles.headerRule, { backgroundColor: themeColor }]} />
        </View>

        {data.summary ? (
          <View style={styles.section}>
            {ribbonHeader('Profile')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            {ribbonHeader('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
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
            {ribbonHeader('Education')}
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

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            {ribbonHeader('Skills')}
            <View style={styles.skillsGrid}>
              {data.skills.map((skill, si) => {
                const level = 3 + ((si * 2 + 1) % 3);
                return (
                  <View key={skill.id} style={styles.skillCell}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.segmentsRow}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <View
                          key={i}
                          style={[
                            styles.segment,
                            i < level ? { backgroundColor: themeColor } : styles.segmentEmpty,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            {ribbonHeader('Projects')}
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
            {ribbonHeader('Certifications')}
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
            {ribbonHeader('References')}
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
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                {ribbonHeader(section.title)}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.projectItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.itemDesc}>{item.description}</Text>
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
