import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    paddingTop: 94,
    paddingBottom: 94,
    paddingHorizontal: 100,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#374151',
  },
  name: {
    fontSize: 17,
    letterSpacing: 0.8,
    color: '#1F2937',
  },
  jobTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 8,
  },
  contact: {
    fontSize: 9.5,
    color: '#9CA3AF',
    marginTop: 14,
    lineHeight: 1.9,
  },
  headerBlock: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3.4,
    color: '#9CA3AF',
    marginTop: 40,
    marginBottom: 16,
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 2,
    color: '#4B5563',
  },
  expItem: {
    marginBottom: 26,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  role: {
    fontSize: 11,
    color: '#1F2937',
  },
  dates: {
    fontSize: 9.5,
    color: '#9CA3AF',
  },
  company: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 10,
    lineHeight: 1.9,
    color: '#4B5563',
    marginBottom: 4,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  degree: {
    fontSize: 11,
    color: '#1F2937',
  },
  school: {
    fontSize: 10,
    color: '#6B7280',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 2.2,
    color: '#4B5563',
  },
  projectName: {
    fontSize: 11,
    color: '#1F2937',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.9,
    color: '#4B5563',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  certText: {
    fontSize: 10,
    color: '#4B5563',
  },
  refItem: {
    marginBottom: 20,
  },
  refName: {
    fontSize: 11,
    color: '#1F2937',
  },
  refDetail: {
    fontSize: 10,
    color: '#6B7280',
  },
  customTitle: {
    fontSize: 11,
    color: '#1F2937',
  },
  customSubtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.9,
    color: '#4B5563',
    marginTop: 2,
  },
});

export default function Whisper({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('   ·   ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.headerBlock}>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
                {contact ? <Text style={styles.contact}>{contact}</Text> : null}
              </View>

              {data.summary ? (
                <View>
                  <Text style={styles.sectionTitle}>Profile</Text>
                  <Text style={styles.summary}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.role}>{exp.role}</Text>
                    <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <Text key={i} style={styles.bulletText}>{line}</Text>
                    ))}
                </View>
              ))}
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.school}>{edu.school}</Text>
                  </View>
                  <Text style={styles.dates}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ),

          skills: data.skills && data.skills.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join('   ·   ')}</Text>
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.expItem}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.projectName}>{proj.name}</Text>
                    {proj.link ? <Text style={styles.dates}>{proj.link}</Text> : null}
                  </View>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <Text style={styles.certText}>
                    {cert.name}
                    {cert.issuer ? ` — ${cert.issuer}` : ''}
                  </Text>
                  <Text style={styles.dates}>{cert.date}</Text>
                </View>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>References</Text>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refItem}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.dates}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.expItem}>
                    <View style={styles.expHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dates}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
