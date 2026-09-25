import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    padding: 48,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#171717',
    paddingBottom: 16,
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 26,
    color: '#171717',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#404040',
    marginTop: 6,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 8,
    color: '#525252',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionHead: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    color: '#171717',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
  },
  sectionOrn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  ornLine: {
    height: 1,
    width: 48,
    backgroundColor: '#A3A3A3',
  },
  ornDot: {
    width: 5,
    height: 5,
    backgroundColor: '#171717',
    marginHorizontal: 8,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#262626',
    textAlign: 'justify',
  },
  expItem: {
    marginBottom: 12,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    color: '#171717',
  },
  dateItalic: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#525252',
  },
  companyName: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    color: '#404040',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#262626',
    textAlign: 'justify',
    marginBottom: 4,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: '#171717',
  },
  schoolItalic: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#404040',
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.9,
    color: '#262626',
    textAlign: 'center',
  },
  skillBold: {
    fontFamily: 'Times-Bold',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionOrn}>
        <View style={styles.ornLine} />
        <View style={styles.ornDot} />
        <View style={styles.ornLine} />
      </View>
    </View>
  );
}

export default function Barrister({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
          ) : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="Profile" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Professional Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expTop}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateItalic}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description
                  .split(/\n|\r?\n/)
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <Text key={i} style={styles.bulletText}>
                      — {line}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolItalic}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.dateItalic}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Admissions & Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.eduRow}>
                <Text style={styles.degreeText}>
                  {cert.name}
                  {cert.issuer ? `, ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.dateItalic}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Areas of Practice" />
            <Text style={styles.skillsText}>
              {data.skills.map((s, i) => (
                <React.Fragment key={s.id}>
                  <Text style={styles.skillBold}>{s.name}</Text>
                  {i < data.skills.length - 1 ? <Text>  ·  </Text> : null}
                </React.Fragment>
              ))}
            </Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Notable Matters" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 8 }}>
                <Text style={styles.degreeText}>{proj.name}</Text>
                <Text style={styles.summaryText}>{proj.description}</Text>
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
                      {item.date ? <Text style={styles.dateItalic}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.schoolItalic}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.summaryText}>{item.description}</Text>
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
              <View key={ref.id} style={{ marginBottom: 6, alignItems: 'center' }}>
                <Text style={styles.degreeText}>{ref.name}</Text>
                <Text style={styles.schoolItalic}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.contactLine}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
