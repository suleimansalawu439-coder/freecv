import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';
const DARK = '#1E293B';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 44,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  headerDark: {
    flex: 1,
    backgroundColor: DARK,
    paddingVertical: 22,
    paddingHorizontal: 24,
  },
  headerTheme: {
    width: 130,
    paddingVertical: 22,
    paddingHorizontal: 14,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 6,
  },
  contactItem: {
    fontSize: 7.5,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionLine: {
    flex: 1,
    height: 2,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  expItem: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginBottom: 14,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateBadge: {
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  dateBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletMark: {
    width: 12,
    fontSize: 8,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#334155',
  },
  skillBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#475569',
  },
  yearBadge: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: DARK,
  },
  yearBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({
  title,
  dark,
  themeColor,
}: {
  title: string;
  dark?: boolean;
  themeColor: string;
}) {
  const bg = dark ? DARK : themeColor;
  return (
    <View style={styles.sectionHead}>
      <View style={[styles.sectionBadge, { backgroundColor: bg }]}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={[styles.sectionLine, { backgroundColor: bg }]} />
    </View>
  );
}

export default function Duotone({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerDark}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
            ) : null}
          </View>
          <View style={[styles.headerTheme, { backgroundColor: themeColor }]}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="Profile" themeColor={themeColor} />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Experience" dark themeColor={themeColor} />
            {data.experience.map((exp, i) => {
              const accent = i % 2 === 0 ? themeColor : DARK;
              return (
                <View key={exp.id} style={[styles.expItem, { borderLeftColor: accent }]}>
                  <View style={styles.expTop}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <View style={[styles.dateBadge, { backgroundColor: accent }]}>
                      <Text style={styles.dateBadgeText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, j) => (
                      <View key={j} style={styles.bulletRow}>
                        <Text style={[styles.bulletMark, { color: accent }]}>›</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              );
            })}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Skills" themeColor={themeColor} />
            <View style={styles.skillsWrap}>
              {data.skills.map((skill, i) => (
                <View
                  key={skill.id}
                  style={[styles.skillBadge, { backgroundColor: i % 2 === 0 ? themeColor : DARK }]}
                >
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Education" dark themeColor={themeColor} />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <View style={styles.yearBadge}>
                    <Text style={styles.yearBadgeText}>{edu.graduationYear}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Projects" themeColor={themeColor} />
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

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Certifications" dark themeColor={themeColor} />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.eduRow}>
                <Text style={styles.degreeText}>
                  {cert.name}
                  {cert.issuer ? ` · ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.schoolText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.map((section, si) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <SectionHead
                  title={section.title}
                  dark={si % 2 === 1}
                  themeColor={themeColor}
                />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View style={styles.eduRow}>
                      <Text style={styles.degreeText}>{item.title}</Text>
                      {item.date ? <Text style={styles.schoolText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={[styles.schoolText, { fontStyle: 'italic' }]}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.schoolText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null
          )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="References" themeColor={themeColor} />
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
      </Page>
    </Document>
  );
}
