import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#0d9488';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 44,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  contactLine: {
    fontSize: 8,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F766E',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  sectionRule: {
    height: 1,
    backgroundColor: '#CCFBF1',
  },
  summaryBox: {
    backgroundColor: '#F0FDFA',
    borderRadius: 8,
    padding: 12,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  expCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
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
    color: '#64748B',
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
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#475569',
  },
  skillPill: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
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
    color: '#475569',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Practitioner({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const initial = info.fullName?.charAt(0) || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {initial ? (
          <View style={[styles.avatar, { backgroundColor: themeColor }]}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        ) : null}
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? (
          <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
        ) : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('   ·   ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="About Me" />
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Clinical Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expCard}>
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
                      <Text style={[styles.bulletDot, { color: themeColor }]}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Clinical Skills" />
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

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Licenses & Certifications" />
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

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Projects & Initiatives" />
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
