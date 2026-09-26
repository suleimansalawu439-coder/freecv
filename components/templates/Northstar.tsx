import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
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
    width: '30%',
    backgroundColor: '#23272F',
    padding: 24,
    flexDirection: 'column',
  },
  sidebarLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 5,
  },
  skillBlock: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
  },
  eduRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    width: 12,
    fontSize: 9,
    marginTop: 1,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduSchool: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.7)',
  },
  eduYear: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 1,
  },
  main: {
    width: '70%',
    padding: 28,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.55,
    color: '#4B5563',
  },
  rail: {
    borderLeftWidth: 2,
    paddingLeft: 18,
  },
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#6B7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 9,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#6B7280',
  },
});

export default function Northstar({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {orderSections(data, {
            personal: (
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarLabel}>•  Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
            </View>
          ),

            skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarLabel, { color: themeColor }]}>Skills</Text>
              {data.skills.map((s) => (
                <View key={s.id} style={styles.skillBlock}>
                  <Text style={styles.skillText}>• {s.name}</Text>
                </View>
              ))}
            </View>
          ) : null,

            education: data.education && data.education.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarLabel, { color: themeColor }]}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <Text style={[styles.star, { color: themeColor }]}>•</Text>
                  <View>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.eduYear}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarLabel, { color: themeColor }]}>Certifications</Text>
              {data.certifications.map((c) => (
                <View key={c.id} style={styles.eduRow}>
                  <Text style={[styles.star, { color: themeColor }]}>•</Text>
                  <View>
                    <Text style={styles.eduDegree}>{c.name}</Text>
                    {c.issuer ? <Text style={styles.eduSchool}>{c.issuer}</Text> : null}
                  </View>
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
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={[styles.rail, { borderLeftColor: themeColor }]}>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <View style={styles.expHeader}>
                      <Text style={styles.roleText}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.companyText}>{exp.company}</Text>
                    {exp.description ? (
                      <View>
                        {exp.description
                          .split(/\n|\r?\n/)
                          .filter(Boolean)
                          .map((line, i) => (
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
            </View>
          ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((p) => (
                <View key={p.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{p.name}</Text>
                  <Text style={styles.projectDesc}>{p.description}</Text>
                </View>
              ))}
            </View>
          ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={styles.refGrid}>
                {data.references.map((r) => (
                  <View key={r.id} style={styles.refCard}>
                    <Text style={styles.refName}>{r.name}</Text>
                    <Text style={styles.refDetail}>
                      {r.title}
                      {r.company ? ` · ${r.company}` : ''}
                    </Text>
                    {r.contact ? <Text style={styles.refDetail}>{r.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null,
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.companyText}>{item.subtitle}</Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.summaryText}>{item.description}</Text>
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
