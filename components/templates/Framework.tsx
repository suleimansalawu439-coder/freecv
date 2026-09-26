import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F9FAFB',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 48,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  grid: {
    paddingHorizontal: 40,
    paddingBottom: 36,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 18,
  },
  cardFull: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingBottom: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 10,
  },
  bulletDot: {
    fontSize: 9,
    color: '#9CA3AF',
    width: 10,
  },
  bulletText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
    flex: 1,
  },
  groupLabel: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#9CA3AF',
    marginBottom: 6,
    marginTop: 8,
  },
  skillPill: {
    fontSize: 8.5,
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eduItem: {
    marginBottom: 10,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  certMeta: {
    fontSize: 8.5,
    color: '#6B7280',
  },
});

function pair<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}

export default function Framework({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const skillGroups: { label: string; items: typeof data.skills }[] = [];
  for (let i = 0; i < data.skills.length; i += 4) {
    skillGroups.push({
      label: `Group ${String.fromCharCode(65 + i / 4)}`,
      items: data.skills.slice(i, i + 4),
    });
  }

  const cardTitleStyle = [styles.cardTitle, { color: themeColor, borderBottomColor: themeColor }];

  const expCards =
    data.experience && data.experience.length > 0
      ? pair(data.experience).map((rowItems, ri) => (
          <View key={ri} style={styles.row}>
            {rowItems.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                <Text style={styles.dateText}>
                  {exp.startDate} — {exp.endDate}
                </Text>
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
            {rowItems.length === 1 ? <View style={styles.card} /> : null}
          </View>
        ))
      : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
        <View style={styles.header}>
          <Text style={styles.name}>{info.fullName}</Text>
          {info.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
          ) : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
          ) : null}
        </View>
          ),
        })}

        <View style={styles.grid}>
          {data.summary || (data.skills && data.skills.length > 0) ? (
            <View style={styles.row}>
              {orderSections(data, {
                personal: data.summary ? (
                <View style={styles.card}>
                  <Text style={cardTitleStyle}>Profile</Text>
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null,

                skills: data.skills && data.skills.length > 0 ? (
                <View style={styles.card}>
                  <Text style={cardTitleStyle}>Skills</Text>
                  {skillGroups.map((group, gi) => (
                    <View key={gi}>
                      <Text style={styles.groupLabel}>{group.label}</Text>
                      <View style={styles.pillsWrap}>
                        {group.items.map((skill) => (
                          <Text key={skill.id} style={styles.skillPill}>
                            {skill.name}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null,
              })}
            </View>
          ) : null}

          {orderSections(data, {
            experience: expCards,

            education: data.education && data.education.length > 0 ? (
            <View style={styles.cardFull}>
              <Text style={cardTitleStyle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>
                    {edu.school}
                    {edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.cardFull}>
              <Text style={cardTitleStyle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.eduItem}>
                  <Text style={styles.degreeText}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.certMeta}>{proj.link}</Text> : null}
                  <Text style={styles.bodyText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.cardFull}>
              <Text style={cardTitleStyle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.eduItem}>
                  <Text style={styles.degreeText}>{cert.name}</Text>
                  <Text style={styles.certMeta}>
                    {cert.issuer}
                    {cert.date ? ` · ${cert.date}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.cardFull}>
              <Text style={cardTitleStyle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.eduItem}>
                  <Text style={styles.degreeText}>{ref.name}</Text>
                  <Text style={styles.certMeta}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                    {ref.contact ? ` · ${ref.contact}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null,
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
              <View key={section.id} style={styles.cardFull}>
                <Text style={cardTitleStyle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.eduItem}>
                    <Text style={styles.degreeText}>{item.title}</Text>
                    {item.subtitle ? <Text style={styles.schoolText}>{item.subtitle}</Text> : null}
                    {item.date ? <Text style={styles.certMeta}>{item.date}</Text> : null}
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
