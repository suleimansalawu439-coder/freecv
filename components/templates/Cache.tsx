import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 44,
    paddingHorizontal: 48,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 10.5,
    color: '#4B5563',
  },
  contactCol: {
    alignItems: 'flex-end',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 3,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderWrap: {
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#111827',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  expRow: {
    marginBottom: 10,
  },
  expHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  roleCompany: {
    fontSize: 10,
    color: '#4B5563',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
    marginTop: 3,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    fontSize: 8.5,
    color: '#1F2937',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  eduMain: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  eduMeta: {
    fontSize: 9.5,
    color: '#6B7280',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  projectItem: {
    marginBottom: 10,
  },
  refLine: {
    fontSize: 9.5,
    color: '#1F2937',
    marginBottom: 4,
  },
  refName: {
    fontWeight: 'bold',
  },
});

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Cache({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const highlight = hexToRgba(themeColor, 0.16);

  const header = (title: string) => (
    <View style={styles.sectionHeaderWrap}>
      <Text style={[styles.sectionHeader, { backgroundColor: highlight }]}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.header}>
                <View>
                  <Text style={styles.name}>{info.fullName}</Text>
                  {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
                </View>
                <View style={styles.contactCol}>
                  {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
                  {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
                  {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
                  {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
                </View>
              </View>

              {data.summary ? (
                <View style={styles.section}>
                  {header('Profile')}
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              {header('Experience')}
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expRow}>
                  <View style={styles.expHeadRow}>
                    <Text style={styles.roleTitle}>
                      {exp.role}
                      <Text style={styles.roleCompany}> · {exp.company}</Text>
                    </Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} — {exp.endDate}
                    </Text>
                  </View>
                  {exp.description ? (
                    <Text style={styles.expDesc}>
                      {exp.description
                        .split(/\n|\r?\n/)
                        .filter((l) => l.trim())
                        .join(' · ')}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              {header('Skills')}
              <View style={styles.chipsWrap}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={[styles.chip, { backgroundColor: highlight }]}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null,

          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              {header('Education')}
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <Text style={styles.eduMain}>
                    {edu.degree}
                    <Text style={styles.eduMeta}> · {edu.school}</Text>
                  </Text>
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              {header('Projects')}
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>
                    {proj.name}
                    {proj.link ? <Text style={styles.dateText}> · {proj.link}</Text> : null}
                  </Text>
                  <Text style={styles.bodyText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              {header('Certifications')}
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.eduRow}>
                  <Text style={styles.eduMain}>
                    {cert.name}
                    {cert.issuer ? <Text style={styles.eduMeta}> · {cert.issuer}</Text> : null}
                  </Text>
                  <Text style={styles.dateText}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              {header('References')}
              {data.references.map((ref) => (
                <Text key={ref.id} style={styles.refLine}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.eduMeta}>
                    {' '}
                    · {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                </Text>
              ))}
            </View>
          ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                {header(section.title)}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.projectItem}>
                    <View style={styles.expHeadRow}>
                      <Text style={styles.projectName}>
                        {item.title}
                        {item.subtitle ? <Text style={styles.eduMeta}> · {item.subtitle}</Text> : null}
                      </Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.description ? (
                      <Text style={styles.bodyText}>{item.description}</Text>
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
