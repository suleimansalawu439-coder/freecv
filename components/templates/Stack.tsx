import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F9FAFB',
    fontFamily: 'Helvetica',
  },
  container: {
    paddingTop: 28,
    paddingHorizontal: 36,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 18,
    marginBottom: 14,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderTopWidth: 4,
    padding: 18,
    marginBottom: 14,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  contact: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 12,
  },
  sectionTitlePad: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
  },
  expCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateBadge: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  dateBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: '#6B7280',
    width: 9,
  },
  bulletText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    flex: 1,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4B5563',
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
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
    color: '#111827',
  },
  certDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCard: {
    width: '50%',
    paddingRight: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  customSubtitle: {
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 2,
  },
  customDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
});

export default function Stack({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionTitle, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {orderSections(data, {
            personal: (
              <>
          <View style={[styles.headerCard, { borderTopColor: themeColor }]}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
            ) : null}
            {contactItems.length > 0 ? (
              <Text style={styles.contact}>{contactItems.join('  •  ')}</Text>
            ) : null}
          </View>

          {data.summary ? (
            <View style={styles.card}>
              <SectionHeader title="Profile" />
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 ? (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.sectionTitlePad, { color: themeColor }]}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expCard}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <View style={[styles.dateBadge, { backgroundColor: themeColor }]}>
                      <Text style={styles.dateBadgeText}>{exp.startDate} – {exp.endDate}</Text>
                    </View>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description ? (
                    <View>
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
          ) : null,

            skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.card}>
              <SectionHeader title="Skills" />
              <View style={styles.skillsRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={[styles.skillChip, { backgroundColor: themeColor }]}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null,

            education: data.education && data.education.length > 0 ? (
            <View style={styles.card}>
              <SectionHeader title="Education" />
              {data.education.map((edu, idx) => (
                <View
                  key={edu.id}
                  style={[
                    styles.eduRow,
                    idx === data.education.length - 1
                      ? { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }
                      : {},
                  ]}
                >
                  <View>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                  </View>
                  <Text style={[styles.eduYear, { color: themeColor }]}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null,

            projects: data.showProjects && data.projects.length > 0 ? (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.sectionTitlePad, { color: themeColor }]}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.expCard}>
                  <Text style={styles.projectName}>
                    {proj.name}{proj.link ? <Text style={styles.certDetail}> ({proj.link})</Text> : null}
                  </Text>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null,

            certifications: data.showCertifications && data.certifications.length > 0 ? (
            <View style={styles.card}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certName}>
                    {cert.name} <Text style={styles.certDetail}>— {cert.issuer}</Text>
                  </Text>
                  <Text style={styles.certDetail}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null,

            references: data.showReferences && data.references.length > 0 ? (
            <View style={styles.card}>
              <SectionHeader title="References" />
              <View style={styles.refRow}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    <Text style={styles.refDetail}>{ref.contact}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null,
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
            <View key={section.id} style={{ marginBottom: 4 }}>
              <Text style={[styles.sectionTitlePad, { color: themeColor }]}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item.id} style={styles.expCard}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.customTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.certDetail}>{item.date}</Text> : null}
                  </View>
                  {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                  {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
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
