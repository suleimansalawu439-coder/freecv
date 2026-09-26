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
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 0.75,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 56,
    paddingTop: 56,
    paddingBottom: 40,
  },
  name: {
    fontSize: 38,
    color: '#111827',
    lineHeight: 1.05,
  },
  deck: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 10,
  },
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 16,
    letterSpacing: 0.5,
  },
  body: {
    paddingHorizontal: 56,
    paddingVertical: 20,
  },
  summaryPara: {
    fontSize: 11.5,
    color: '#1F2937',
    lineHeight: 1.95,
    marginTop: 24,
  },
  dropCap: {
    fontSize: 44,
    fontWeight: 'bold',
    lineHeight: 0.9,
  },
  featureHead: {
    fontSize: 21,
    color: '#111827',
    marginTop: 36,
    marginBottom: 16,
  },
  expItem: {
    marginBottom: 18,
    borderLeftWidth: 2,
    paddingLeft: 16,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginTop: 3,
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 0.75,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 10,
    color: '#1F2937',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  eduSchool: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 2,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCell: {
    width: '50%',
    paddingRight: 20,
    marginBottom: 10,
  },
  refName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
    lineHeight: 1.5,
  },
});

export default function Spread({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const summaryFirst = data.summary ? data.summary.charAt(0) : '';
  const summaryRest = data.summary ? data.summary.slice(1) : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.header}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.deck}>{info.jobTitle}</Text> : null}
          {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
        </View>
            </>
          ),
          },
        )}

        <View style={styles.body}>
          {orderSections(data, {
            personal: (
              <>
          {data.summary ? (
            <Text style={styles.summaryPara}>
              <Text style={[styles.dropCap, { color: themeColor }]}>{summaryFirst}  </Text>
              {summaryRest}
            </Text>
          ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 && (
            <View>
              <Text style={styles.featureHead}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={[styles.expItem, { borderLeftColor: themeColor }]}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate}
                      {exp.startDate && exp.endDate ? ' – ' : ''}
                      {exp.endDate}
                    </Text>
                  </View>
                  {exp.company ? <Text style={[styles.companyText, { color: themeColor }]}>{exp.company}</Text> : null}
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

            skills: data.skills && data.skills.length > 0 && (
            <View>
              <Text style={styles.featureHead}>Skills</Text>
              <View style={styles.chipRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.chip}>
                    <Text style={styles.chipText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

            education: data.education && data.education.length > 0 && (
            <View>
              <Text style={styles.featureHead}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    {edu.school ? <Text style={styles.eduSchool}>{edu.school}</Text> : null}
                    {edu.degree ? <Text style={styles.eduDegree}>{edu.degree}</Text> : null}
                  </View>
                  {edu.graduationYear ? <Text style={styles.dateText}>{edu.graduationYear}</Text> : null}
                </View>
              ))}
            </View>
          ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <Text style={styles.featureHead}>Selected Work</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 12 }}>
                  <Text style={styles.roleTitle}>
                    {proj.name}
                    {proj.link ? <Text style={styles.dateText}> — {proj.link}</Text> : null}
                  </Text>
                  {proj.description ? <Text style={[styles.bulletText, { marginTop: 4 }]}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <Text style={styles.featureHead}>Certifications</Text>
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={[styles.bulletText, { marginBottom: 6 }]}>
                  <Text style={{ fontWeight: 'bold', color: '#111827' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ fontStyle: 'italic' }}>, {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#9CA3AF' }}> — {cert.date}</Text> : null}
                </Text>
              ))}
            </View>
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <Text style={styles.featureHead}>References</Text>
              <View style={styles.refGrid}>
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
                <View key={section.id}>
                  <Text style={styles.featureHead}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 12 }}>
                      {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                      {item.subtitle || item.date ? (
                        <Text style={styles.dateText}>
                          {item.subtitle}
                          {item.subtitle && item.date ? '   ·   ' : ''}
                          {item.date}
                        </Text>
                      ) : null}
                      {item.description ? <Text style={[styles.bulletText, { marginTop: 4 }]}>{item.description}</Text> : null}
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
