import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    padding: 56,
    flexDirection: 'column',
  },
  headerBlock: {
    marginBottom: 28,
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerLine: {
    fontSize: 10,
    color: '#374151',
    marginTop: 6,
    lineHeight: 1.6,
  },
  paragraph: {
    fontSize: 10,
    color: '#111827',
    lineHeight: 1.9,
    marginBottom: 18,
  },
  runInLabel: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#000000',
  },
  runInBody: {
    color: '#1F2937',
  },
  boldInline: {
    fontWeight: 'bold',
    color: '#000000',
  },
  mutedInline: {
    color: '#6B7280',
  },
  sep: {
    color: '#9CA3AF',
  },
});

function RunIn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Text style={styles.paragraph}>
      <Text style={styles.runInLabel}>{label}.  </Text>
      <Text style={styles.runInBody}>{children}</Text>
    </Text>
  );
}

export default function Bare({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const headerBits = [info.jobTitle, info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.headerBlock}>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {headerBits.length > 0 ? <Text style={styles.headerLine}>{headerBits.join('  ·  ')}</Text> : null}
              </View>

              {data.summary ? (
                <RunIn label="Profile">
                  <Text>{data.summary}</Text>
                </RunIn>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <RunIn label="Experience">
              {data.experience.map((exp, idx) => (
                <Text key={exp.id}>
                  {idx > 0 ? <Text style={styles.sep}>  —  </Text> : null}
                  <Text style={styles.boldInline}>{exp.role}</Text>
                  {exp.company ? <Text>, {exp.company}</Text> : null}
                  {exp.startDate || exp.endDate ? (
                    <Text style={styles.mutedInline}>
                      {' '}({exp.startDate}
                      {exp.startDate && exp.endDate ? '–' : ''}
                      {exp.endDate})
                    </Text>
                  ) : null}
                  {exp.description ? (
                    <Text>
                      {': '}
                      {exp.description.split(/\n|\r?\n/).filter(Boolean).map((l) => l.trim()).join('; ')}
                    </Text>
                  ) : null}
                </Text>
              ))}
            </RunIn>
          ),

          education: data.education && data.education.length > 0 && (
            <RunIn label="Education">
              {data.education.map((edu, idx) => (
                <Text key={edu.id}>
                  {idx > 0 ? <Text style={styles.sep}>  ·  </Text> : null}
                  {edu.degree ? <Text style={styles.boldInline}>{edu.degree}</Text> : null}
                  {edu.degree && edu.school ? <Text>, </Text> : null}
                  {edu.school ? <Text>{edu.school}</Text> : null}
                  {edu.graduationYear ? <Text style={styles.mutedInline}> ({edu.graduationYear})</Text> : null}
                </Text>
              ))}
            </RunIn>
          ),

          skills: data.skills && data.skills.length > 0 && (
            <RunIn label="Skills">
              <Text>{data.skills.map((s) => s.name).join('; ')}</Text>
            </RunIn>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <RunIn label="Projects">
              {data.projects.map((proj, idx) => (
                <Text key={proj.id}>
                  {idx > 0 ? <Text style={styles.sep}>  —  </Text> : null}
                  <Text style={styles.boldInline}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.mutedInline}> ({proj.link})</Text> : null}
                  {proj.description ? <Text>: {proj.description}</Text> : null}
                </Text>
              ))}
            </RunIn>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <RunIn label="Certifications">
              {data.certifications.map((cert, idx) => (
                <Text key={cert.id}>
                  {idx > 0 ? <Text style={styles.sep}>  ·  </Text> : null}
                  <Text style={styles.boldInline}>{cert.name}</Text>
                  {cert.issuer ? <Text>, {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={styles.mutedInline}> ({cert.date})</Text> : null}
                </Text>
              ))}
            </RunIn>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <RunIn label="References">
              {data.references.map((ref, idx) => (
                <Text key={ref.id}>
                  {idx > 0 ? <Text style={styles.sep}>  —  </Text> : null}
                  <Text style={styles.boldInline}>{ref.name}</Text>
                  {ref.title || ref.company ? (
                    <Text>
                      , {ref.title}
                      {ref.title && ref.company ? ', ' : ''}
                      {ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.mutedInline}> ({ref.contact})</Text> : null}
                </Text>
              ))}
            </RunIn>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <RunIn key={section.id} label={section.title}>
                {section.items.map((item, idx) => (
                  <Text key={item.id}>
                    {idx > 0 ? <Text style={styles.sep}>  —  </Text> : null}
                    {item.title ? <Text style={styles.boldInline}>{item.title}</Text> : null}
                    {item.subtitle ? <Text>, {item.subtitle}</Text> : null}
                    {item.date ? <Text style={styles.mutedInline}> ({item.date})</Text> : null}
                    {item.description ? <Text>: {item.description}</Text> : null}
                  </Text>
                ))}
              </RunIn>
            ))
        )}
      </Page>
    </Document>
  );
}
