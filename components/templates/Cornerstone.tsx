import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
  },
  main: {
    width: '70%',
    padding: 30,
    flexDirection: 'column',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 12.5,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 10,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#FAF5EA',
    padding: 24,
    flexDirection: 'column',
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#4A3F2C',
    marginBottom: 5,
  },
  skillsInline: {
    fontSize: 8.5,
    lineHeight: 1.8,
    color: '#4A3F2C',
  },
  refName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2E2718',
  },
  refDetail: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#6B5D43',
  },
  refItem: {
    marginBottom: 10,
  },
});

export default function Cornerstone({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} — {exp.endDate}
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

            education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                  </View>
                  {edu.graduationYear ? (
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
            ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((c) => (
                <View key={c.id} style={styles.projectItem}>
                  <Text style={styles.eduDegree}>{c.name}</Text>
                  <Text style={styles.eduSchool}>
                    {c.issuer}
                    {c.issuer && c.date ? ' · ' : ''}
                    {c.date}
                  </Text>
                </View>
              ))}
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

        <View style={styles.sidebar}>
          {orderSections(data, {
            personal: (
          <View style={styles.sidebarBlock}>
            <Text style={[styles.sidebarTitle, { color: themeColor }]}>Contact</Text>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>
            ),

            skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>Skills</Text>
              <Text style={styles.skillsInline}>
                {data.skills.map((s) => s.name).join(' · ')}
              </Text>
            </View>
            ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.sidebarBlock}>
              <Text style={[styles.sidebarTitle, { color: themeColor }]}>References</Text>
              {data.references.map((r) => (
                <View key={r.id} style={styles.refItem}>
                  <Text style={styles.refName}>{r.name}</Text>
                  <Text style={styles.refDetail}>
                    {r.title}
                    {r.company ? `, ${r.company}` : ''}
                  </Text>
                  {r.contact ? <Text style={styles.refDetail}>{r.contact}</Text> : null}
                </View>
              ))}
            </View>
            ) : null,
          },
          )}
        </View>
      </Page>
    </Document>
  );
}
