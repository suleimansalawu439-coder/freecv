import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  sectionBar: {
    width: 40,
    height: 2,
    backgroundColor: '#111827',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
  },
  roleCompany: {
    fontWeight: 'normal',
    color: '#4B5563',
  },
  dateText: {
    fontSize: 8,
    color: '#4B5563',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletMark: {
    width: 12,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  leadVerb: {
    fontWeight: 'bold',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  eduText: {
    fontSize: 9.5,
  },
  eduBold: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 6,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 8,
    color: '#4B5563',
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBar} />
    </View>
  );
}

/** Splits a line into its leading verb and the remainder. */
function splitLeadVerb(line: string): [string, string] {
  const trimmed = line.trim();
  const match = trimmed.match(/^(\S+)\s+([\s\S]*)$/);
  if (!match) return [trimmed, ''];
  return [match[1], match[2]];
}

function MeritBullet({ line }: { line: string }) {
  const [verb, rest] = splitLeadVerb(line);
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletMark}>›</Text>
      <Text style={styles.bulletText}>
        <Text style={styles.leadVerb}>{verb}</Text>
        {rest ? ` ${rest}` : ''}
      </Text>
    </View>
  );
}

export default function Merit({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
              {contactItems.length > 0 ? (
                <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
              ) : null}
              {data.summary ? (
                <View style={styles.section}>
                  <SectionHeader title="Summary" />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Achievements & Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>
                      {exp.role} <Text style={styles.roleCompany}>at {exp.company}</Text>
                    </Text>
                    <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  {exp.description
                    ? exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <MeritBullet key={i} line={line} />
                      ))
                    : null}
                </View>
              ))}
            </View>
          ) : null,

          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <Text style={styles.eduText}>
                    <Text style={styles.eduBold}>{edu.degree}</Text>, {edu.school}
                  </Text>
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Skills" />
              <Text style={styles.smallText}>{data.skills.map((s) => s.name).join(' · ')}</Text>
            </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.experienceItem}>
                  <Text style={[styles.smallText, { fontWeight: 'bold', marginBottom: 3 }]}>
                    {proj.name}{proj.link ? ` — ${proj.link}` : ''}
                  </Text>
                  {proj.description ? (
                    <MeritBullet line={proj.description} />
                  ) : null}
                </View>
              ))}
            </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={[styles.smallText, { marginBottom: 3 }]}>
                  <Text style={styles.leadVerb}>Earned</Text> {cert.name} — {cert.issuer}
                  {cert.date ? ` (${cert.date})` : ''}
                </Text>
              ))}
            </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="References" />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null,
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHeader title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.experienceItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={[styles.smallText, { color: '#4B5563', marginBottom: 3 }]}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                    {item.description ? <MeritBullet line={item.description} /> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
