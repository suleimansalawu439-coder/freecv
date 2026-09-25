import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const SEPIA_DARK = '#4A3728';
const SEPIA = '#8B6F47';
const SEPIA_LIGHT = '#F5EFE3';
const SEPIA_LINE = '#D9C9A8';
const SEPIA_BG = '#FDFBF6';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: SEPIA_BG,
    fontFamily: 'Times-Roman',
    padding: 48,
  },
  eyebrow: {
    fontSize: 8,
    color: SEPIA,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: SEPIA_LINE,
    paddingBottom: 16,
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 26,
    color: SEPIA_DARK,
    letterSpacing: 1,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: SEPIA,
    marginTop: 6,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 8,
    color: SEPIA,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionHead: {
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    color: SEPIA_DARK,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 6,
  },
  sectionRule: {
    height: 1,
    backgroundColor: SEPIA_LINE,
  },
  summaryBox: {
    backgroundColor: SEPIA_LIGHT,
    borderLeftWidth: 2,
    borderLeftColor: SEPIA,
    padding: 12,
  },
  summaryText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    lineHeight: 1.55,
    color: SEPIA_DARK,
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
    color: SEPIA_DARK,
  },
  dateItalic: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: SEPIA,
  },
  companyName: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    color: SEPIA,
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletMark: {
    width: 14,
    fontSize: 9,
    color: SEPIA,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: SEPIA_DARK,
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
    color: SEPIA_DARK,
  },
  schoolItalic: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: SEPIA,
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.9,
    color: SEPIA_DARK,
  },
  footer: {
    marginTop: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: SEPIA_LINE,
    alignItems: 'center',
  },
  footerOrn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLine: {
    height: 1,
    width: 60,
    backgroundColor: SEPIA_LINE,
  },
  footerDot: {
    width: 5,
    height: 5,
    backgroundColor: SEPIA,
    marginHorizontal: 8,
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

export default function Sepia({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Curriculum Vitae</Text>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
          ) : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="Profile" />
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Experience" />
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
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
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

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((s, i) => (
                <React.Fragment key={s.id}>
                  <Text>{s.name}</Text>
                  {i < data.skills.length - 1 ? <Text>  ·  </Text> : null}
                </React.Fragment>
              ))}
            </Text>
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
                <Text style={styles.bulletText}>{proj.description}</Text>
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
                {cert.date ? <Text style={styles.dateItalic}>{cert.date}</Text> : null}
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
                      <Text style={styles.bulletText}>{item.description}</Text>
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
                <Text style={styles.schoolItalic}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.bulletText}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.footerOrn}>
            <View style={styles.footerLine} />
            <View style={styles.footerDot} />
            <View style={styles.footerLine} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
