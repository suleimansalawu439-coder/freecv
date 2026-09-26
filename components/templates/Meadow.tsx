import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const SAGE = '#5f7161';
const SAGE_TINT = '#eef2ec';
const SAGE_LINE = '#d8e0d5';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    paddingHorizontal: 64,
    paddingVertical: 56,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'normal',
    color: '#111827',
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: SAGE,
    marginTop: 8,
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 10,
    lineHeight: 1.8,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: SAGE,
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: SAGE_LINE,
  },
  bodyText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.9,
  },
  expItem: {
    marginBottom: 18,
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#111827',
    lineHeight: 1.3,
  },
  expMeta: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  bulletDot: {
    width: 12,
    marginTop: 5,
  },
  bulletDotInner: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: SAGE,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.9,
  },
  eduSchool: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#111827',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: SAGE_TINT,
    borderWidth: 0.5,
    borderColor: SAGE_LINE,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.6,
  },
  refCell: {
    width: '50%',
    paddingRight: 20,
    marginBottom: 12,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.6,
  },
});

export default function Meadow({ data }: { data: ResumeData }) {
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
                        <View key={i} style={styles.bulletRow}>
                          <View style={styles.bulletDot}>
                            <View style={styles.bulletDotInner} />
                          </View>
                          <Text style={styles.bulletText}>{line.trim()}</Text>
                        </View>
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
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  {edu.school ? <Text style={styles.eduSchool}>{edu.school}</Text> : null}
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
              <View style={styles.chipRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.chip}>
                    <Text style={styles.chipText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 12 }}>
                  <Text style={styles.roleTitle}>
                    {proj.name}
                    {proj.link ? <Text style={styles.expMeta}>  ({proj.link})</Text> : null}
                  </Text>
                  {proj.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={[styles.bodyText, { marginBottom: 6 }]}>
                  <Text style={{ fontWeight: 'bold', color: '#111827' }}>{cert.name}</Text>
                  {cert.issuer ? <Text> — {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#9CA3AF' }}>   ·   {cert.date}</Text> : null}
                </Text>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCell}>
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
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 10 }}>
                    {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                    {item.subtitle || item.date ? (
                      <Text style={styles.expMeta}>
                        {item.subtitle}
                        {item.subtitle && item.date ? '   ·   ' : ''}
                        {item.date}
                      </Text>
                    ) : null}
                    {item.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
