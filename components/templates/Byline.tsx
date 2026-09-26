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
  masthead: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 20,
    marginBottom: 6,
  },
  dateline: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#6B7280',
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    color: '#111827',
    lineHeight: 1.15,
  },
  deck: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 6,
  },
  byline: {
    fontSize: 9.5,
    color: '#374151',
    marginTop: 8,
    lineHeight: 1.6,
  },
  section: {
    marginTop: 28,
  },
  kicker: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 17,
    color: '#111827',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.85,
  },
  article: {
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  articleMeta: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 2,
  },
  refCell: {
    width: '50%',
    paddingRight: 20,
    marginBottom: 10,
  },
  refName: {
    fontSize: 10,
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

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Byline({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.masthead}>
                {info.location ? <Text style={styles.dateline}>{info.location}</Text> : null}
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? <Text style={styles.deck}>{info.jobTitle}</Text> : null}
                <Text style={styles.byline}>
                  <Text style={{ fontWeight: 'bold' }}>By {info.fullName || 'Staff Writer'}</Text>
                  {contact.length > 0 ? <Text style={{ color: '#9CA3AF' }}>  ·  {contact.join('  ·  ')}</Text> : null}
                </Text>
              </View>

              {data.summary ? (
                <View>
                  <SectionHead kicker="Lede" title="Profile" />
                  <Text style={styles.bodyText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View>
              <SectionHead kicker="Career" title="Professional Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.article}>
                  <Text style={styles.articleTitle}>{exp.role}</Text>
                  <Text style={styles.articleMeta}>
                    {exp.company}
                    {(exp.startDate || exp.endDate) ? ` — ${exp.startDate}${exp.startDate && exp.endDate ? ' to ' : ''}${exp.endDate}` : ''}
                  </Text>
                  {exp.description
                    ? exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                        <Text key={i} style={[styles.bodyText, { marginTop: 5 }]}>{line.trim()}</Text>
                      ))
                    : null}
                </View>
              ))}
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View>
              <SectionHead kicker="Schooling" title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  {edu.school ? <Text style={styles.articleTitle}>{edu.school}</Text> : null}
                  <Text style={styles.articleMeta}>
                    {edu.degree}
                    {edu.graduationYear ? ` — ${edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ),

          skills: data.skills && data.skills.length > 0 && (
            <View>
              <SectionHead kicker="Toolkit" title="Skills" />
              <Text style={styles.bodyText}>{data.skills.map((s) => s.name).join(', ')}</Text>
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <SectionHead kicker="Features" title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.article}>
                  <Text style={styles.articleTitle}>
                    {proj.name}
                    {proj.link ? <Text style={styles.articleMeta}> — {proj.link}</Text> : null}
                  </Text>
                  {proj.description ? <Text style={[styles.bodyText, { marginTop: 5 }]}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <SectionHead kicker="Credentials" title="Certifications" />
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={[styles.bodyText, { marginBottom: 6 }]}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ fontStyle: 'italic', color: '#4B5563' }}>, {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#9CA3AF' }}> — {cert.date}</Text> : null}
                </Text>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <SectionHead kicker="Sources" title="References" />
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
              <View key={section.id}>
                <SectionHead kicker="Filed" title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.article}>
                    {item.title ? <Text style={styles.articleTitle}>{item.title}</Text> : null}
                    {item.subtitle || item.date ? (
                      <Text style={styles.articleMeta}>
                        {item.subtitle}
                        {item.subtitle && item.date ? ' — ' : ''}
                        {item.date}
                      </Text>
                    ) : null}
                    {item.description ? <Text style={[styles.bodyText, { marginTop: 5 }]}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
