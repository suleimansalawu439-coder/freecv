import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 26,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  jobTitle: {
    fontSize: 10,
    color: '#4B5563',
    marginTop: 3,
  },
  contactRow: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardHead: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 6,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  expRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  expRowFirst: {
    paddingTop: 0,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  bulletDot: {
    width: 9,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  chipText: {
    fontSize: 7.5,
    color: '#374151',
  },
  eduRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 7,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  metaText: {
    fontSize: 7.5,
    color: '#6B7280',
    marginTop: 1,
  },
  lineText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.4,
  },
  lineBold: {
    fontWeight: 'bold',
    color: '#111827',
  },
  inlineDim: {
    color: '#6B7280',
  },
});

export default function Satchel({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const CardHead = ({ title }: { title: string }) => (
    <Text style={[styles.cardHead, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.header}>
          <Text style={styles.name}>{pi.fullName}</Text>
          {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
          {contacts.length > 0 ? <Text style={styles.contactRow}>{contacts.join(' · ')}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.card}>
            <CardHead title="Summary" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.card}>
            <CardHead title="Experience" />
            {data.experience.map((exp, i) => (
              <View key={exp.id} style={i === 0 ? [styles.expRow, styles.expRowFirst] : styles.expRow}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  {(exp.startDate || exp.endDate) ? (
                    <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                  ) : null}
                </View>
                {exp.company ? <Text style={styles.companyName}>{exp.company}</Text> : null}
                {exp.description ? (
                  <View>
                    {exp.description
                      .split(/\n|\r\n/)
                      .filter((l) => l.trim())
                      .map((line, j) => (
                        <View key={j} style={styles.bulletRow}>
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

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.card}>
            <CardHead title="Skills" />
            <View style={styles.chipsWrap}>
              {data.skills.map((s) => (
                <View key={s.id} style={styles.chip}>
                  <Text style={styles.chipText}>{s.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ),

          education: data.education && data.education.length > 0 && (
          <View style={styles.card}>
            <CardHead title="Education" />
            {data.education.map((edu, i) => (
              <View key={edu.id} style={i === 0 ? [styles.eduRow, styles.expRowFirst] : styles.eduRow}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
                {edu.graduationYear ? <Text style={styles.metaText}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.card}>
            <CardHead title="Projects" />
            {data.projects.map((p, i) => (
              <View key={p.id} style={i === 0 ? [styles.eduRow, styles.expRowFirst] : styles.eduRow}>
                <Text style={styles.degreeText}>
                  {p.name}
                  {p.link ? <Text style={styles.inlineDim}> — {p.link}</Text> : null}
                </Text>
                {p.description ? <Text style={styles.lineText}>{p.description}</Text> : null}
              </View>
            ))}
          </View>
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.card}>
            <CardHead title="Certifications" />
            {data.certifications.map((c, i) => (
              <View key={c.id} style={i === 0 ? [styles.eduRow, styles.expRowFirst] : styles.eduRow}>
                <Text style={styles.lineText}>
                  <Text style={styles.lineBold}>{c.name}</Text>
                  {(c.issuer || c.date) ? (
                    <Text style={styles.inlineDim}> — {[c.issuer, c.date].filter(Boolean).join(', ')}</Text>
                  ) : null}
                </Text>
              </View>
            ))}
          </View>
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.card}>
            <CardHead title="References" />
            {data.references.map((r, i) => (
              <View key={r.id} style={i === 0 ? [styles.eduRow, styles.expRowFirst] : styles.eduRow}>
                <Text style={styles.degreeText}>{r.name}</Text>
                {(r.title || r.company) ? (
                  <Text style={styles.schoolText}>{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</Text>
                ) : null}
                {r.contact ? <Text style={styles.metaText}>{r.contact}</Text> : null}
              </View>
            ))}
          </View>
        ),
          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.card}>
                <CardHead title={section.title} />
                {section.items.map((item, i) => (
                  <View key={item.id} style={i === 0 ? [styles.eduRow, styles.expRowFirst] : styles.eduRow}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.schoolText}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.lineText}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
