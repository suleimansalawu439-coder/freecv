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
    paddingHorizontal: 48,
    paddingTop: 48,
    paddingBottom: 32,
    borderBottomWidth: 0.75,
    borderBottomColor: '#E5E7EB',
  },
  kicker: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
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
  contact: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 10,
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  main: {
    width: '65%',
    paddingHorizontal: 48,
    paddingVertical: 32,
  },
  side: {
    width: '35%',
    paddingHorizontal: 28,
    paddingVertical: 32,
    borderLeftWidth: 0.75,
    borderLeftColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  section: {
    marginBottom: 28,
  },
  sideSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 17,
    color: '#111827',
    marginBottom: 12,
    marginTop: 2,
  },
  bodyText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.85,
  },
  articleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3,
  },
  articleMeta: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
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
    lineHeight: 1.75,
  },
  pullSkill: {
    borderLeftWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
  },
  pullSkillText: {
    fontSize: 12,
    color: '#111827',
    lineHeight: 1.3,
  },
  sideTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  sideDetail: {
    fontSize: 9,
    color: '#4B5563',
    lineHeight: 1.5,
    marginTop: 1,
  },
});

export default function Column({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
        <View style={styles.header}>
          <Text style={[styles.kicker, { color: themeColor }]}>Résumé</Text>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.deck}>{info.jobTitle}</Text> : null}
          {contact.length > 0 ? <Text style={styles.contact}>{contact.join('   ·   ')}</Text> : null}
        </View>
          ),
        },
        )}

        <View style={styles.body}>
          <View style={styles.main}>
            {orderSections(data, {
              personal: (
                <>
            {data.summary ? (
              <View style={styles.section}>
                <Text style={[styles.kicker, { color: themeColor }]}>Standfirst</Text>
                <Text style={styles.bodyText}>{data.summary}</Text>
              </View>
            ) : null}
                </>
              ),

              experience: data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.kicker, { color: themeColor }]}>Feature</Text>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 16 }}>
                    <Text style={styles.articleTitle}>{exp.role}</Text>
                    <Text style={styles.articleMeta}>
                      <Text style={{ fontWeight: 'bold', color: themeColor }}>{exp.company}</Text>
                      {(exp.startDate || exp.endDate) ? `   ·   ${exp.startDate}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate}` : ''}
                    </Text>
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

              projects: data.showProjects && data.projects && data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.kicker, { color: themeColor }]}>Portfolio</Text>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={{ marginBottom: 12 }}>
                    <Text style={styles.articleTitle}>
                      {proj.name}
                      {proj.link ? <Text style={styles.articleMeta}> — {proj.link}</Text> : null}
                    </Text>
                    {proj.description ? <Text style={[styles.bodyText, { marginTop: 4 }]}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
              ),
            },
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <Text style={[styles.kicker, { color: themeColor }]}>More</Text>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.items.map((item) => (
                      <View key={item.id} style={{ marginBottom: 12 }}>
                        {item.title ? <Text style={styles.articleTitle}>{item.title}</Text> : null}
                        {item.subtitle || item.date ? (
                          <Text style={styles.articleMeta}>
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
          </View>

          <View style={styles.side}>
            {orderSections(data, {
              skills: data.skills && data.skills.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={[styles.kicker, { color: themeColor }]}>Pull Skills</Text>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={[styles.pullSkill, { borderLeftColor: themeColor }]}>
                    <Text style={styles.pullSkillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
              ),

              education: data.education && data.education.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={[styles.kicker, { color: themeColor }]}>Schooling</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 10 }}>
                    {edu.school ? <Text style={styles.sideTitle}>{edu.school}</Text> : null}
                    {edu.degree ? <Text style={styles.sideDetail}>{edu.degree}</Text> : null}
                    {edu.graduationYear ? <Text style={styles.sideDetail}>{edu.graduationYear}</Text> : null}
                  </View>
                ))}
              </View>
              ),

              certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={[styles.kicker, { color: themeColor }]}>Credentials</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={{ marginBottom: 8 }}>
                    <Text style={styles.sideTitle}>{cert.name}</Text>
                    {cert.issuer ? <Text style={styles.sideDetail}>{cert.issuer}</Text> : null}
                    {cert.date ? <Text style={styles.sideDetail}>{cert.date}</Text> : null}
                  </View>
                ))}
              </View>
              ),

              references: data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={[styles.kicker, { color: themeColor }]}>Sources</Text>
                {data.references.map((ref) => (
                  <View key={ref.id} style={{ marginBottom: 8 }}>
                    <Text style={styles.sideTitle}>{ref.name}</Text>
                    {ref.title || ref.company ? (
                      <Text style={styles.sideDetail}>
                        {ref.title}
                        {ref.title && ref.company ? ', ' : ''}
                        {ref.company}
                      </Text>
                    ) : null}
                    {ref.contact ? <Text style={styles.sideDetail}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
              ),
            },
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
