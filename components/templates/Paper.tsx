import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 72,
    paddingHorizontal: 72,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: '#111827',
  },
  name: {
    fontSize: 25,
    fontFamily: 'Times-Roman',
    letterSpacing: 0.6,
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 4,
  },
  contact: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 10,
  },
  hairlineTop: {
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    marginTop: 18,
  },
  headerBlock: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Roman',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#1F2937',
    marginTop: 22,
    marginBottom: 6,
  },
  hairline: {
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    marginBottom: 10,
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.8,
    color: '#374151',
  },
  expItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
    marginBottom: 12,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 11.5,
    fontFamily: 'Times-Bold',
  },
  dates: {
    fontSize: 9.5,
    color: '#6B7280',
  },
  company: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
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
    lineHeight: 1.7,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 8,
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  school: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.9,
    color: '#374151',
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#374151',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 5,
    marginBottom: 5,
  },
  certText: {
    fontSize: 10,
    color: '#374151',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  customSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#374151',
    marginTop: 2,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.hairline} />
    </View>
  );
}

export default function Paper({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          <View style={styles.hairlineTop} />
        </View>

        {data.summary ? (
          <View>
            <SectionHeader title="Profile" />
            <Text style={styles.summary}>{data.summary}</Text>
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
            <Text style={styles.skillsText}>{data.skills.map((s) => s.name).join(',  ')}</Text>
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
                  {cert.name}
                  {cert.issuer ? `, ${cert.issuer}` : ''}
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
