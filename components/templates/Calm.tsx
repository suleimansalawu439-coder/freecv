import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const WARM = '#78716c';
const WARM_LINE = '#e7e2dc';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    padding: 90,
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    color: '#1C1917',
    letterSpacing: 1,
    lineHeight: 1.3,
  },
  jobTitle: {
    fontSize: 12,
    color: WARM,
    marginTop: 10,
  },
  contact: {
    fontSize: 9,
    color: '#A8A29E',
    marginTop: 12,
    lineHeight: 1.9,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: WARM_LINE,
    marginTop: 16,
  },
  section: {
    marginTop: 34,
  },
  sectionTitle: {
    fontSize: 10,
    color: WARM,
    textTransform: 'uppercase',
    letterSpacing: 2.6,
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 10,
    color: '#44403C',
    lineHeight: 2,
  },
  expItem: {
    marginBottom: 24,
  },
  roleTitle: {
    fontSize: 13,
    color: '#1C1917',
    lineHeight: 1.3,
  },
  expMeta: {
    fontSize: 9,
    color: WARM,
    marginTop: 5,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  skillDash: {
    width: 14,
    marginTop: 7,
  },
  skillDashInner: {
    width: 8,
    height: 0.75,
    backgroundColor: WARM,
  },
  skillText: {
    flex: 1,
    fontSize: 10,
    color: '#44403C',
    lineHeight: 1.8,
  },
  refItem: {
    marginBottom: 16,
  },
  refName: {
    fontSize: 10,
    color: '#1C1917',
  },
  refDetail: {
    fontSize: 9,
    color: '#78716c',
    lineHeight: 1.7,
    marginTop: 2,
  },
});

export default function Calm({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
                {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
                <View style={styles.divider} />
              </View>

              {data.summary ? (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Profile</Text>
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.expMeta}>
                    {exp.company}
                    {(exp.startDate || exp.endDate) ? `   ·   ${exp.startDate}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate}` : ''}
                  </Text>
                  {exp.description
                    ? exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                        <Text key={i} style={[styles.bodyText, { marginTop: 6 }]}>{line.trim()}</Text>
                      ))
                    : null}
                </View>
              ))}
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 14 }}>
                  {edu.school ? <Text style={styles.bodyText}>{edu.school}</Text> : null}
                  <Text style={styles.expMeta}>
                    {edu.degree}
                    {edu.graduationYear ? `   ·   ${edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ),

          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillRow}>
                  <View style={styles.skillDash}>
                    <View style={styles.skillDashInner} />
                  </View>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 18 }}>
                  <Text style={styles.roleTitle}>
                    {proj.name}
                    {proj.link ? <Text style={styles.expMeta}> — {proj.link}</Text> : null}
                  </Text>
                  {proj.description ? <Text style={[styles.bodyText, { marginTop: 6 }]}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={[styles.bodyText, { marginBottom: 8 }]}>
                  <Text style={{ color: '#1C1917' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ color: '#78716c' }}> — {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#A8A29E' }}>   ·   {cert.date}</Text> : null}
                </Text>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refItem}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  {ref.title || ref.company ? (
                    <Text style={styles.refDetail}>
                      {ref.title}
                      {ref.title && ref.company ? ', ' : ''}
                      {ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 16 }}>
                    {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                    {item.subtitle || item.date ? (
                      <Text style={styles.expMeta}>
                        {item.subtitle}
                        {item.subtitle && item.date ? '   ·   ' : ''}
                        {item.date}
                      </Text>
                    ) : null}
                    {item.description ? <Text style={[styles.bodyText, { marginTop: 6 }]}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
