import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';
const DARK = '#111827';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '32%',
    backgroundColor: DARK,
    padding: 28,
    flexDirection: 'column',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactItem: {
    fontSize: 8,
    color: '#D1D5DB',
    marginBottom: 5,
  },
  contactGroup: {
    marginBottom: 24,
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingBottom: 6,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  sidebarBlock: {
    marginBottom: 24,
  },
  skillPill: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sideDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  sideSchool: {
    fontSize: 7.5,
    color: '#9CA3AF',
  },
  sideYear: {
    fontSize: 7.5,
    fontWeight: 'bold',
    marginTop: 3,
  },
  sideItem: {
    marginBottom: 12,
  },
  main: {
    flex: 1,
    padding: 32,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameRule: {
    width: 64,
    height: 4,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  section: {
    marginTop: 22,
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  expItem: {
    marginBottom: 14,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 5,
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
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#4B5563',
  },
});

function SidebarHead({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <Text style={[styles.sidebarTitle, { borderBottomColor: themeColor, color: themeColor }]}>
      {title}
    </Text>
  );
}

export default function Bichrome({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const initial = info.fullName?.charAt(0) || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {initial ? (
            <View style={[styles.avatar, { backgroundColor: themeColor }]}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
          ) : null}

          <View style={styles.contactGroup}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>

          {data.skills && data.skills.length > 0 && (
            <View style={styles.sidebarBlock}>
              <SidebarHead title="Skills" themeColor={themeColor} />
              <View style={styles.skillsWrap}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={[styles.skillPill, { backgroundColor: themeColor }]}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.education && data.education.length > 0 && (
            <View style={styles.sidebarBlock}>
              <SidebarHead title="Education" themeColor={themeColor} />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.sideItem}>
                  <Text style={styles.sideDegree}>{edu.degree}</Text>
                  <Text style={styles.sideSchool}>{edu.school}</Text>
                  {edu.graduationYear ? (
                    <Text style={[styles.sideYear, { color: themeColor }]}>
                      {edu.graduationYear}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.sidebarBlock}>
              <SidebarHead title="Certifications" themeColor={themeColor} />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.sideItem}>
                  <Text style={styles.sideDegree}>{cert.name}</Text>
                  <Text style={styles.sideSchool}>
                    {cert.issuer}
                    {cert.date ? ` · ${cert.date}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.customSections &&
            data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.sidebarBlock}>
                  <SidebarHead title={section.title} themeColor={themeColor} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.sideItem}>
                      <Text style={styles.sideDegree}>{item.title}</Text>
                      {item.subtitle ? (
                        <Text style={[styles.sideSchool, { fontStyle: 'italic' }]}>
                          {item.subtitle}
                        </Text>
                      ) : null}
                      {item.date ? <Text style={styles.sideSchool}>{item.date}</Text> : null}
                    </View>
                  ))}
                </View>
              ) : null
            )}
        </View>

        <View style={styles.main}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          <View style={[styles.nameRule, { backgroundColor: themeColor }]} />

          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.mainTitle}>Profile</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expTop}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                  <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.degreeText}>
                    {proj.name}
                    {proj.link ? ` (${proj.link})` : ''}
                  </Text>
                  <Text style={styles.schoolText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          )}

          {data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.mainTitle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id} style={{ marginBottom: 6 }}>
                  <Text style={styles.degreeText}>{ref.name}</Text>
                  <Text style={styles.schoolText}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.schoolText}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
