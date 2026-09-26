import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 3,
    marginBottom: 10,
  },
  headerLine: {
    fontSize: 11.5,
    lineHeight: 1.4,
    color: '#111827',
  },
  headerName: {
    fontWeight: 'bold',
  },
  headerMeta: {
    color: '#4B5563',
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  expItem: {
    marginBottom: 6,
  },
  expRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleLine: {
    fontSize: 9,
    color: '#111827',
    flex: 1,
  },
  roleBold: {
    fontWeight: 'bold',
  },
  companyInline: {
    color: '#4B5563',
  },
  dateText: {
    fontSize: 7.5,
    color: '#6B7280',
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.35,
    color: '#374151',
  },
  lineText: {
    fontSize: 8.5,
    color: '#374151',
    marginBottom: 2.5,
    lineHeight: 1.35,
  },
  lineBold: {
    fontWeight: 'bold',
    color: '#111827',
  },
  inlineText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.35,
  },
  inlineDim: {
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 5,
  },
});

export default function Squeeze({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.topBar, { backgroundColor: themeColor }]} />

        {orderSections(data, {
          personal: (
            <>
        <Text style={styles.headerLine}>
          <Text style={styles.headerName}>{pi.fullName}</Text>
          {pi.jobTitle ? <Text style={styles.headerMeta}> | {pi.jobTitle}</Text> : null}
          {contacts.length > 0 ? <Text style={styles.headerMeta}> | {contacts.join(' · ')}</Text> : null}
        </Text>

        {data.summary ? (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expRow}>
                  <Text style={styles.roleLine}>
                    <Text style={styles.roleBold}>{exp.role}</Text>
                    {exp.company ? <Text style={styles.companyInline}> — {exp.company}</Text> : null}
                  </Text>
                  {(exp.startDate || exp.endDate) ? (
                    <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                  ) : null}
                </View>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split(/\n|\r\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ),

          education: data.education && data.education.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {data.education.map((edu) => (
              <Text key={edu.id} style={styles.lineText}>
                <Text style={styles.lineBold}>{edu.degree}</Text>
                {edu.school ? <Text> — {edu.school}</Text> : null}
                {edu.graduationYear ? <Text style={styles.inlineDim}>, {edu.graduationYear}</Text> : null}
              </Text>
            ))}
          </View>
        ),

          skills: data.skills && data.skills.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
            <Text style={styles.inlineText}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
            {data.projects.map((p) => (
              <Text key={p.id} style={styles.lineText}>
                <Text style={styles.lineBold}>{p.name}</Text>
                {p.link ? <Text style={styles.inlineDim}> — {p.link}</Text> : null}
                {p.description ? <Text> — {p.description}</Text> : null}
              </Text>
            ))}
          </View>
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications</Text>
            {data.certifications.map((c) => (
              <Text key={c.id} style={styles.lineText}>
                {[c.name, c.issuer, c.date].filter(Boolean).join(' — ')}
              </Text>
            ))}
          </View>
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
            {data.references.map((r) => (
              <Text key={r.id} style={styles.lineText}>
                <Text style={styles.lineBold}>{r.name}</Text>
                {r.title || r.company ? (
                  <Text> — {r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</Text>
                ) : null}
                {r.contact ? <Text style={styles.inlineDim}> · {r.contact}</Text> : null}
              </Text>
            ))}
          </View>
        ),
          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <Text style={styles.lineText}>
                      <Text style={styles.lineBold}>{item.title}</Text>
                      {item.subtitle ? <Text style={styles.companyInline}> — {item.subtitle}</Text> : null}
                      {item.date ? <Text style={styles.inlineDim}> ({item.date})</Text> : null}
                    </Text>
                    {item.description ? (
                      <Text style={styles.inlineText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
