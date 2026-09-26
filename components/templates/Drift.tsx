import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 56,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 1.15,
  },
  jobTitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
  },
  contact: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 8,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 9.5,
    color: '#475569',
    lineHeight: 1.7,
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
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 9,
    color: '#94A3B8',
  },
  companyText: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 2,
  },
  paraText: {
    fontSize: 9.5,
    color: '#475569',
    lineHeight: 1.7,
    marginTop: 5,
  },
  skillsText: {
    fontSize: 9.5,
    color: '#475569',
    lineHeight: 2,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  eduDegree: {
    fontSize: 9.5,
    color: '#64748B',
  },
  refCell: {
    width: '50%',
    paddingRight: 20,
    marginBottom: 10,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  refDetail: {
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.5,
  },
});

export default function Drift({ data }: { data: ResumeData }) {
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
                <View style={styles.expHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                      <Text key={i} style={styles.paraText}>{line.trim()}</Text>
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

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join('   ·   ')}</Text>
          </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 12 }}>
                <Text style={styles.roleTitle}>
                  {proj.name}
                  {proj.link ? <Text style={styles.dateText}> — {proj.link}</Text> : null}
                </Text>
                {proj.description ? <Text style={styles.paraText}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={[styles.bodyText, { marginBottom: 5 }]}>
                <Text style={{ fontWeight: 'bold', color: '#0F172A' }}>{cert.name}</Text>
                {cert.issuer ? <Text> — {cert.issuer}</Text> : null}
                {cert.date ? <Text style={{ color: '#94A3B8' }}> · {cert.date}</Text> : null}
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
                    <View style={styles.expHeaderRow}>
                      {item.title ? <Text style={styles.roleTitle}>{item.title}</Text> : null}
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.paraText}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
