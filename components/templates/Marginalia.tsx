import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: 48,
    paddingTop: 48,
    paddingBottom: 24,
  },
  name: {
    fontSize: 26,
    color: '#111827',
  },
  deck: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 4,
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 8,
  },
  body: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 48,
    paddingBottom: 48,
  },
  main: {
    width: '68%',
    paddingRight: 28,
  },
  margin: {
    width: '32%',
    paddingLeft: 24,
    borderLeftWidth: 0.75,
    borderLeftColor: '#E5E7EB',
  },
  mainHead: {
    fontSize: 15,
    color: '#111827',
    marginTop: 26,
    marginBottom: 12,
  },
  marginHead: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    marginBottom: 10,
  },
  marginSection: {
    marginBottom: 28,
  },
  bodyText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.85,
  },
  expItem: {
    marginBottom: 16,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3,
  },
  dateText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#9CA3AF',
  },
  metaItalic: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.8,
  },
  marginNote: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 7,
  },
  marginNoteText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.4,
  },
  marginTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  marginDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
    lineHeight: 1.5,
    marginTop: 1,
  },
});

export default function Marginalia({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {orderSections(data, {
            personal: (
              <>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? <Text style={styles.deck}>{info.jobTitle}</Text> : null}
                {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
              </>
            ),
          })}
        </View>

        <View style={styles.body}>
          <View style={styles.main}>
            {orderSections(data, {
              personal: (
                <>
                  {data.summary ? (
                    <View>
                      <Text style={styles.mainHead}>Profile</Text>
                      <Text style={styles.bodyText}>{data.summary}</Text>
                    </View>
                  ) : null}
                </>
              ),

              experience: data.experience && data.experience.length > 0 && (
                <View>
                  <Text style={styles.mainHead}>Experience</Text>
                  {data.experience.map((exp) => (
                    <View key={exp.id} style={styles.expItem}>
                      <View style={styles.expHeaderRow}>
                        <Text style={styles.roleTitle}>{exp.role}</Text>
                        <Text style={styles.dateText}>
                          {exp.startDate}
                          {exp.startDate && exp.endDate ? ' – ' : ''}
                          {exp.endDate}
                        </Text>
                      </View>
                      {exp.company ? <Text style={styles.metaItalic}>{exp.company}</Text> : null}
                      {exp.description
                        ? exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                            <View key={i} style={styles.bulletRow}>
                              <Text style={styles.bulletDot}>•</Text>
                              <Text style={styles.bulletText}>{line.trim()}</Text>
                            </View>
                          ))
                        : null}
                    </View>
                  ))}
                </View>
              ),

              projects: data.showProjects && data.projects && data.projects.length > 0 && (
                <View>
                  <Text style={styles.mainHead}>Projects</Text>
                  {data.projects.map((proj) => (
                    <View key={proj.id} style={{ marginBottom: 12 }}>
                      <Text style={styles.roleTitle}>
                        {proj.name}
                        {proj.link ? <Text style={styles.dateText}> — {proj.link}</Text> : null}
                      </Text>
                      {proj.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{proj.description}</Text> : null}
                    </View>
                  ))}
                </View>
              ),
            },
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section) => (
                  <View key={section.id}>
                    <Text style={styles.mainHead}>{section.title}</Text>
                    {section.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 12 }}>
                        <View style={styles.expHeaderRow}>
                          {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                          {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                        </View>
                        {item.subtitle ? <Text style={styles.metaItalic}>{item.subtitle}</Text> : null}
                        {item.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{item.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ))
            )}
          </View>

          <View style={styles.margin}>
            {orderSections(data, {
              skills: data.skills && data.skills.length > 0 && (
                <View style={styles.marginSection}>
                  <Text style={[styles.marginHead, { color: themeColor }]}>Margin Notes — Skills</Text>
                  {data.skills.map((skill) => (
                    <View key={skill.id} style={[styles.marginNote, { borderLeftColor: themeColor }]}>
                      <Text style={styles.marginNoteText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              ),

              education: data.education && data.education.length > 0 && (
                <View style={styles.marginSection}>
                  <Text style={[styles.marginHead, { color: themeColor }]}>Education</Text>
                  {data.education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: 10 }}>
                      {edu.school ? <Text style={styles.marginTitle}>{edu.school}</Text> : null}
                      {edu.degree ? <Text style={styles.marginDetail}>{edu.degree}</Text> : null}
                      {edu.graduationYear ? <Text style={styles.marginDetail}>{edu.graduationYear}</Text> : null}
                    </View>
                  ))}
                </View>
              ),

              certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
                <View style={styles.marginSection}>
                  <Text style={[styles.marginHead, { color: themeColor }]}>Certifications</Text>
                  {data.certifications.map((cert) => (
                    <View key={cert.id} style={{ marginBottom: 8 }}>
                      <Text style={styles.marginTitle}>{cert.name}</Text>
                      {cert.issuer ? <Text style={styles.marginDetail}>{cert.issuer}</Text> : null}
                      {cert.date ? <Text style={styles.marginDetail}>{cert.date}</Text> : null}
                    </View>
                  ))}
                </View>
              ),

              references: data.showReferences && data.references && data.references.length > 0 && (
                <View style={styles.marginSection}>
                  <Text style={[styles.marginHead, { color: themeColor }]}>References</Text>
                  {data.references.map((ref) => (
                    <View key={ref.id} style={{ marginBottom: 8 }}>
                      <Text style={styles.marginTitle}>{ref.name}</Text>
                      {ref.title || ref.company ? (
                        <Text style={styles.marginDetail}>
                          {ref.title}
                          {ref.title && ref.company ? ', ' : ''}
                          {ref.company}
                        </Text>
                      ) : null}
                      {ref.contact ? <Text style={styles.marginDetail}>{ref.contact}</Text> : null}
                    </View>
                  ))}
                </View>
              ),
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
