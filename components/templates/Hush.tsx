import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 72,
    paddingHorizontal: 72,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#1F2937',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },
  jobTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  contactBlock: {
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  contactLine: {
    fontSize: 9.5,
    color: '#6B7280',
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    color: '#6B7280',
    marginTop: 26,
    marginBottom: 6,
  },
  dottedRule: {
    borderTopWidth: 2,
    borderTopStyle: 'dotted',
    borderTopColor: '#E5E7EB',
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    padding: 12,
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.75,
    color: '#4B5563',
  },
  expItem: {
    borderBottomWidth: 2,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#F3F4F6',
    paddingBottom: 14,
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 9.5,
    color: '#9CA3AF',
  },
  company: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.65,
    color: '#4B5563',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 2,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  school: {
    fontSize: 10,
    color: '#6B7280',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.65,
    color: '#4B5563',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#F3F4F6',
    paddingBottom: 6,
    marginBottom: 6,
  },
  certText: {
    fontSize: 10,
    color: '#374151',
  },
  certName: {
    fontWeight: 'bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 9,
    color: '#6B7280',
  },
  customTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  customSubtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.65,
    color: '#4B5563',
    marginTop: 2,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.dottedRule} />
    </View>
  );
}

export default function Hush({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          </View>
          {contact.length > 0 && (
            <View style={styles.contactBlock}>
              {contact.map((c, i) => (
                <Text key={i} style={styles.contactLine}>{c}</Text>
              ))}
            </View>
          )}
        </View>

        {data.summary ? (
          <View>
            <SectionHeader title="Profile" />
            <View style={styles.summaryBox}>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View>
            <SectionHeader title="Experience" />
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
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View>
            <SectionHeader title="Education" />
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
        )}

        {data.skills && data.skills.length > 0 && (
          <View>
            <SectionHeader title="Skills" />
            <View style={styles.pillsRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.pill}>
                  <Text style={styles.pillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <SectionHeader title="Projects" />
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
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.certText}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
                </Text>
                <Text style={styles.dates}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View>
            <SectionHeader title="References" />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id}>
                  <SectionHeader title={section.title} />
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
              )
          )}
      </Page>
    </Document>
  );
}
