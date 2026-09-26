import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 72,
    paddingHorizontal: 80,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#374151',
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times-Roman',
    letterSpacing: 0.8,
    color: '#1F2937',
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 8,
  },
  contact: {
    fontSize: 9.5,
    color: '#6B7280',
    marginTop: 12,
    lineHeight: 1.9,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Roman',
    textTransform: 'uppercase',
    letterSpacing: 3.5,
    color: '#6B7280',
    marginTop: 28,
    marginBottom: 8,
  },
  shortRule: {
    width: 40,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.85,
    color: '#4B5563',
  },
  expItem: {
    marginBottom: 22,
  },
  role: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  company: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 3,
  },
  dates: {
    fontSize: 9.5,
    color: '#9CA3AF',
    marginTop: 3,
  },
  bulletText: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#4B5563',
    marginTop: 6,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 2,
    color: '#4B5563',
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#4B5563',
    marginTop: 6,
  },
  certName: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  certDetail: {
    fontSize: 9.5,
    color: '#6B7280',
  },
  refName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  refDetail: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  refItem: {
    marginBottom: 16,
  },
  customTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  customSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 3,
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#4B5563',
    marginTop: 6,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.shortRule} />
    </View>
  );
}

export default function Still({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('   ·   ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}

        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}

        {contact ? <Text style={styles.contact}>{contact}</Text> : null}

        {data.summary ? (
          <View>
            <SectionHeader title="Profile" />
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <Text style={styles.role}>{exp.role}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
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
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.expItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.school}</Text>
                <Text style={styles.dates}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        ),

          skills: data.skills && data.skills.length > 0 && (
          <View>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join('   ·   ')}</Text>
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.expItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.link ? <Text style={styles.dates}>{proj.link}</Text> : null}
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.expItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                {cert.issuer ? <Text style={styles.certDetail}>{cert.issuer}</Text> : null}
                <Text style={styles.dates}>{cert.date}</Text>
              </View>
            ))}
          </View>
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View>
            <SectionHeader title="References" />
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
                  <SectionHeader title={section.title} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                      {item.date ? <Text style={styles.dates}>{item.date}</Text> : null}
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
