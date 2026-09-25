import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 44,
  },
  header: {
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 6,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  jobTitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  contactItem: {
    fontSize: 8,
    color: '#64748B',
    marginRight: 14,
    marginBottom: 3,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginRight: 12,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.55,
    color: '#475569',
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
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 8,
    color: '#94A3B8',
  },
  companyName: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDash: {
    width: 10,
    fontSize: 8,
    color: '#CBD5E1',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#475569',
  },
  skillChip: {
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8,
    color: '#475569',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  accentLine: {
    width: 48,
    height: 2,
    marginTop: 12,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#64748B',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Slate({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          <View style={styles.contactRow}>
            {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
            {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
            {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
            {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
          </View>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="Summary" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expTop}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description
                  .split(/\n|\r?\n/)
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDash}>–</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Skills" />
            <View style={styles.skillsWrap}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.accentLine, { backgroundColor: themeColor }]} />
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Projects" />
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
            <SectionHead title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.eduRow}>
                <Text style={styles.degreeText}>
                  {cert.name}
                  {cert.issuer ? ` · ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <SectionHead title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View style={styles.eduRow}>
                      <Text style={styles.degreeText}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
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
            <SectionHead title="References" />
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 6 }}>
                <Text style={styles.degreeText}>{ref.name}</Text>
                <Text style={styles.schoolText}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.dateText}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
