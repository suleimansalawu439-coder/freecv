import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
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
    marginBottom: 14,
  },
  summaryBox: {
    backgroundColor: '#F1F5F9',
    borderLeftWidth: 3,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  section: {
    marginBottom: 16,
  },
  briefHead: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
    marginBottom: 8,
  },
  expItem: {
    marginBottom: 10,
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
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  pillText: {
    fontSize: 7.5,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
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
  lineText: {
    fontSize: 8.5,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  lineBold: {
    fontWeight: 'bold',
    color: '#111827',
  },
  inlineDim: {
    color: '#6B7280',
  },
  refItem: {
    marginBottom: 8,
  },
  customItem: {
    marginBottom: 8,
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
});

export default function Brief({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const BriefHead = ({ title }: { title: string }) => (
    <Text style={styles.briefHead}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <Text style={styles.name}>{pi.fullName}</Text>
              {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
              {contacts.length > 0 ? <Text style={styles.contactRow}>{contacts.join(' · ')}</Text> : null}

              {data.summary ? (
                <View style={[styles.summaryBox, { borderLeftColor: themeColor }]}>
                  <Text style={styles.summaryLabel}>Executive Summary</Text>
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <BriefHead title="Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
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
                        .slice(0, 3)
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

          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <BriefHead title="Skills" />
              <View style={styles.pillsWrap}>
                {data.skills.map((s) => (
                  <View key={s.id} style={styles.pill}>
                    <Text style={styles.pillText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <BriefHead title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
                  </View>
                  {edu.graduationYear ? <Text style={styles.dateText}>{edu.graduationYear}</Text> : null}
                </View>
              ))}
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <BriefHead title="Projects" />
              {data.projects.map((p) => (
                <View key={p.id} style={styles.refItem}>
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
            <View style={styles.section}>
              <BriefHead title="Certifications" />
              {data.certifications.map((c) => (
                <Text key={c.id} style={styles.lineText}>
                  <Text style={styles.lineBold}>{c.name}</Text>
                  {(c.issuer || c.date) ? (
                    <Text style={styles.inlineDim}> — {[c.issuer, c.date].filter(Boolean).join(', ')}</Text>
                  ) : null}
                </Text>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <BriefHead title="References" />
              {data.references.map((r) => (
                <View key={r.id} style={styles.refItem}>
                  <Text style={styles.degreeText}>{r.name}</Text>
                  {(r.title || r.company) ? (
                    <Text style={styles.schoolText}>{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</Text>
                  ) : null}
                  {r.contact ? <Text style={styles.dateText}>{r.contact}</Text> : null}
                </View>
              ))}
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <BriefHead title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
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
