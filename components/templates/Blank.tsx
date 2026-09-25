import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 58,
    paddingHorizontal: 64,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
  contact: {
    fontSize: 10,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 5,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  expItem: {
    marginBottom: 8,
  },
  expLine: {
    fontSize: 10.5,
    lineHeight: 1.5,
  },
  expLineBold: {
    fontWeight: 'bold',
  },
  expLineGray: {
    color: '#4B5563',
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.55,
  },
  eduLine: {
    fontSize: 10,
    marginBottom: 3,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    marginTop: 2,
  },
  refLine: {
    fontSize: 10,
    marginBottom: 4,
  },
  customDesc: {
    fontSize: 9.5,
    lineHeight: 1.55,
    marginTop: 2,
  },
});

export default function Blank({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        {contact ? <Text style={styles.contact}>{contact}</Text> : null}

        {data.summary ? (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <Text style={styles.expLine}>
                  <Text style={styles.expLineBold}>{exp.role}</Text>
                  {exp.company ? `, ${exp.company}` : ''}
                  <Text style={styles.expLineGray}> ({exp.startDate} – {exp.endDate})</Text>
                </Text>
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

        {data.education && data.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <Text key={edu.id} style={styles.eduLine}>
                <Text style={styles.expLineBold}>{edu.degree}</Text>
                {edu.school ? `, ${edu.school}` : ''}
                <Text style={styles.expLineGray}> ({edu.graduationYear})</Text>
              </Text>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.expItem}>
                <Text style={styles.expLine}>
                  <Text style={styles.expLineBold}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.expLineGray}> ({proj.link})</Text> : ''}
                </Text>
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={styles.eduLine}>
                <Text style={styles.expLineBold}>{cert.name}</Text>
                {cert.issuer ? ` — ${cert.issuer}` : ''}
                <Text style={styles.expLineGray}> ({cert.date})</Text>
              </Text>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((ref) => (
              <Text key={ref.id} style={styles.refLine}>
                <Text style={styles.expLineBold}>{ref.name}</Text>
                {` — ${ref.title}`}
                {ref.company ? `, ${ref.company}` : ''}
                {ref.contact ? ` · ${ref.contact}` : ''}
              </Text>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      <Text style={styles.expLine}>
                        <Text style={styles.expLineBold}>{item.title}</Text>
                        {item.subtitle ? ` — ${item.subtitle}` : ''}
                        {item.date ? <Text style={styles.expLineGray}> ({item.date})</Text> : ''}
                      </Text>
                      {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
