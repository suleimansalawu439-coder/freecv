import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const BLACK = '#000000';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#ffffff',
    color: BLACK,
    fontFamily: 'Helvetica',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BLACK,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: BLACK,
    marginTop: 4,
  },
  contact: {
    fontSize: 9.5,
    color: BLACK,
    marginTop: 6,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitleContainer: {
    borderBottomWidth: 2,
    paddingBottom: 3,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: BLACK,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.5,
    color: BLACK,
  },
  item: {
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: BLACK,
  },
  itemMeta: {
    fontSize: 9.5,
    color: BLACK,
  },
  itemSub: {
    fontSize: 10,
    fontWeight: 'bold',
    color: BLACK,
    marginTop: 2,
  },
  itemDesc: {
    fontSize: 10,
    lineHeight: 1.5,
    color: BLACK,
    marginTop: 4,
  },
  listLine: {
    fontSize: 10,
    color: BLACK,
    marginBottom: 4,
    lineHeight: 1.5,
  },
});

export default function ParsePerfect({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const pi = data.personalInfo;
  const contactLine = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join(' | ');
  const headingStyle = { borderBottomColor: themeColor };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 18 }}>
          <Text style={styles.name}>{pi.fullName}</Text>
          {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
          {contactLine ? <Text style={styles.contact}>{contactLine}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>Summary</Text>
            </View>
            <Text style={styles.body}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>Work Experience</Text>
            </View>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemMeta}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' - ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSub}>{exp.company}</Text>
                {exp.description ? <Text style={styles.itemDesc}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>Certifications &amp; Licenses</Text>
            </View>
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={styles.listLine}>
                <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                {cert.issuer ? ` - ${cert.issuer}` : ''}
                {cert.date ? ` (${cert.date})` : ''}
              </Text>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>Education</Text>
            </View>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.listLine}>
                    <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                    {edu.school ? ` - ${edu.school}` : ''}
                  </Text>
                  {edu.graduationYear ? <Text style={styles.itemMeta}>{edu.graduationYear}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>Skills</Text>
            </View>
            <Text style={styles.body}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>Projects</Text>
            </View>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.item}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.link ? <Text style={styles.itemMeta}>{proj.link}</Text> : null}
                {proj.description ? <Text style={styles.itemDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, headingStyle]}>
              <Text style={styles.sectionTitleText}>References</Text>
            </View>
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 8 }}>
                <Text style={styles.itemTitle}>{ref.name}</Text>
                <Text style={styles.listLine}>
                  {ref.title}
                  {ref.title && ref.company ? ', ' : ''}
                  {ref.company}
                  {ref.contact ? ` | ${ref.contact}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id} style={styles.section}>
                  <View style={[styles.sectionTitleContainer, headingStyle]}>
                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                  </View>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.item}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.itemMeta}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
