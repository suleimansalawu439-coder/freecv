import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 48,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Courier',
    color: '#111827',
  },
  headerWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nameBox: {
    borderWidth: 2,
    borderColor: '#111827',
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#111827',
  },
  jobTitle: {
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 8,
  },
  contactLine: {
    fontFamily: 'Courier',
    fontSize: 8.5,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderBox: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#111827',
    paddingVertical: 7,
    marginBottom: 12,
    marginTop: 6,
  },
  sectionHeader: {
    fontFamily: 'Courier',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    color: '#111827',
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#1F2937',
  },
  borderedBox: {
    borderWidth: 2,
    borderColor: '#111827',
  },
  borderedRow: {
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
  },
  borderedRowLast: {
    padding: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#1F2937',
    marginBottom: 3,
  },
  bulletPrefix: {
    color: '#9CA3AF',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#111827',
  },
  skillCell: {
    width: '33.33%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRightWidth: 2,
    borderRightColor: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
  },
  skillCellNoRight: {
    width: '33.33%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
  },
  skillText: {
    fontSize: 9,
    color: '#111827',
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#111827',
  },
  eduMeta: {
    fontSize: 9.5,
    color: '#374151',
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#374151',
  },
});

export default function Mainframe({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const header = (title: string) => (
    <View style={styles.sectionHeaderBox}>
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>
  );

  const borderedRows = (items: React.ReactNode[]) => (
    <View style={styles.borderedBox}>
      {items.map((node, i) => (
        <View key={i} style={i < items.length - 1 ? styles.borderedRow : styles.borderedRowLast}>
          {node}
        </View>
      ))}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.headerWrap}>
                <View style={styles.nameBox}>
                  <Text style={styles.name}>{info.fullName}</Text>
                  {info.jobTitle ? (
                    <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
                  ) : null}
                </View>
                {contactItems.length > 0 ? (
                  <Text style={styles.contactLine}>{contactItems.join('  |  ')}</Text>
                ) : null}
              </View>
              {data.summary ? (
                <View style={styles.section}>
                  {header('Profile')}
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0
            ? (() => {
                const rows = data.experience.map((exp) => (
                  <View key={exp.id}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        [{exp.startDate} -- {exp.endDate}]
                      </Text>
                    </View>
                    <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                    {exp.description
                      ? exp.description
                          .split(/\n|\r?\n/)
                          .filter((l) => l.trim())
                          .map((line, i) => (
                            <Text key={i} style={styles.bulletText}>
                              <Text style={styles.bulletPrefix}>&gt; </Text>
                              {line}
                            </Text>
                          ))
                      : null}
                  </View>
                ));
                return (
                  <View style={styles.section}>
                    {header('Experience')}
                    {borderedRows(rows)}
                  </View>
                );
              })()
          : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              {header('Skills')}
              <View style={styles.skillsGrid}>
                {data.skills.map((skill, i) => (
                  <View
                    key={skill.id}
                    style={(i + 1) % 3 === 0 ? styles.skillCellNoRight : styles.skillCell}
                  >
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null,

          education: data.education && data.education.length > 0
            ? (() => {
                const rows = data.education.map((edu) => (
                  <View key={edu.id} style={styles.itemHeaderRow}>
                    <View>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduMeta}>{edu.school}</Text>
                    </View>
                    <Text style={styles.dateText}>[{edu.graduationYear}]</Text>
                  </View>
                ));
                return (
                  <View style={styles.section}>
                    {header('Education')}
                    {borderedRows(rows)}
                  </View>
                );
              })()
          : null,

          projects: data.showProjects && data.projects && data.projects.length > 0
            ? (() => {
                const rows = data.projects.map((proj) => (
                  <View key={proj.id}>
                    <Text style={styles.roleTitle}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                    <Text style={styles.bodyText}>{proj.description}</Text>
                  </View>
                ));
                return (
                  <View style={styles.section}>
                    {header('Projects')}
                    {borderedRows(rows)}
                  </View>
                );
              })()
          : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0
            ? (() => {
                const rows = data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.itemHeaderRow}>
                    <Text style={styles.bodyText}>
                      <Text style={styles.roleTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.eduMeta}> :: {cert.issuer}</Text> : null}
                    </Text>
                    <Text style={styles.dateText}>[{cert.date}]</Text>
                  </View>
                ));
                return (
                  <View style={styles.section}>
                    {header('Certifications')}
                    {borderedRows(rows)}
                  </View>
                );
              })()
          : null,

          references: data.showReferences && data.references && data.references.length > 0
            ? (() => {
                const rows = data.references.map((ref) => (
                  <View key={ref.id}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}
                      {ref.company ? ` :: ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.dateText}>{ref.contact}</Text> : null}
                  </View>
                ));
                return (
                  <View style={styles.section}>
                    {header('References')}
                    {borderedRows(rows)}
                  </View>
                );
              })()
          : null,
        },
          (data.customSections || [])
            .map((section) => {
            const rows = section.items.map((item) => (
              <View key={item.id}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{item.title}</Text>
                  {item.date ? <Text style={styles.dateText}>[{item.date}]</Text> : null}
                </View>
                {item.subtitle ? <Text style={styles.eduMeta}>{item.subtitle}</Text> : null}
                {item.description ? (
                  <Text style={styles.bodyText}>{item.description}</Text>
                ) : null}
              </View>
            ));
            return (
              <View key={section.id} style={styles.section}>
                {header(section.title)}
                {borderedRows(rows)}
              </View>
            );
            })
        )}
      </Page>
    </Document>
  );
}
