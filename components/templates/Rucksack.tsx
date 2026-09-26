import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 28,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  name: {
    fontSize: 21,
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
  body: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  colLeft: {
    width: '60%',
    paddingRight: 14,
  },
  colRight: {
    width: '40%',
    paddingLeft: 14,
  },
  section: {
    marginBottom: 14,
  },
  denseHead: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 7,
  },
  summaryText: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  expItem: {
    marginBottom: 9,
  },
  roleTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 1,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  dateText: {
    fontSize: 7.5,
    color: '#6B7280',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  skillItem: {
    marginBottom: 7,
  },
  skillName: {
    fontSize: 7.5,
    color: '#374151',
    marginBottom: 3,
  },
  barTrack: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  eduItem: {
    marginBottom: 7,
  },
  degreeText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 1,
  },
  schoolText: {
    fontSize: 7.5,
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
    marginTop: 1,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
});

export default function Rucksack({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const DenseHead = ({ title }: { title: string }) => (
    <Text style={[styles.denseHead, { color: themeColor }]}>{title}</Text>
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
            </>
          ),
          },
        )}

        <View style={styles.body}>
          <View style={styles.colLeft}>
            {orderSections(data, {
              personal: (
                <>
            {data.summary ? (
              <View style={styles.section}>
                <DenseHead title="Summary" />
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            ) : null}
                </>
              ),

              experience: data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <DenseHead title="Experience" />
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {(exp.company || exp.startDate || exp.endDate) ? (
                      <View style={styles.metaRow}>
                        <Text style={styles.companyName}>{exp.company}</Text>
                        {(exp.startDate || exp.endDate) ? (
                          <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                        ) : null}
                      </View>
                    ) : null}
                    {exp.description ? (
                      <View>
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

              projects: data.showProjects && data.projects && data.projects.length > 0 && (
              <View style={styles.section}>
                <DenseHead title="Projects" />
                {data.projects.map((p) => (
                  <View key={p.id} style={styles.eduItem}>
                    <Text style={styles.degreeText}>
                      {p.name}
                      {p.link ? <Text style={styles.metaText}> — {p.link}</Text> : null}
                    </Text>
                    {p.description ? <Text style={styles.lineText}>{p.description}</Text> : null}
                  </View>
                ))}
              </View>
            ),
              },
              (data.customSections || [])
                .filter((section) => section.items && section.items.length > 0)
                .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <DenseHead title={section.title} />
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.eduItem}>
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.degreeText}>{item.title}</Text>
                          {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                        </View>
                        {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                        {item.description ? <Text style={styles.lineText}>{item.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ))
            )}
          </View>

          <View style={styles.colRight}>
            {orderSections(data, {
              skills: data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <DenseHead title="Skills" />
                {data.skills.map((s, i) => {
                  const pct = 95 - (i % 4) * 12;
                  return (
                    <View key={s.id} style={styles.skillItem}>
                      <Text style={styles.skillName}>{s.name}</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: themeColor }]} />
                      </View>
                    </View>
                  );
                })}
              </View>
            ),

              education: data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <DenseHead title="Education" />
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
                    {edu.graduationYear ? <Text style={styles.metaText}>{edu.graduationYear}</Text> : null}
                  </View>
                ))}
              </View>
            ),

              certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={styles.section}>
                <DenseHead title="Certifications" />
                {data.certifications.map((c) => (
                  <View key={c.id} style={styles.eduItem}>
                    <Text style={styles.degreeText}>{c.name}</Text>
                    {(c.issuer || c.date) ? (
                      <Text style={styles.metaText}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ),

              references: data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                <DenseHead title="References" />
                {data.references.map((r) => (
                  <View key={r.id} style={styles.eduItem}>
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
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
