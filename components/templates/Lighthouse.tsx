import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';
const TEAL = '#0F766E';
const TEAL_DARK = '#0D5F59';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '32%',
    backgroundColor: TEAL,
    flexDirection: 'column',
  },
  beamTop: {
    backgroundColor: TEAL_DARK,
    padding: 24,
    paddingBottom: 32,
  },
  beamLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: 'rgba(255,255,255,0.7)',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sidebarBody: {
    padding: 24,
    paddingTop: 16,
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  sidebarBlock: {
    marginBottom: 22,
  },
  contactItem: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 5,
  },
  barBlock: {
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  barTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  barFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eduSchool: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.7)',
  },
  eduYear: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 1,
  },
  eduItem: {
    marginBottom: 10,
  },
  main: {
    width: '68%',
    padding: 28,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: TEAL,
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  diamond: {
    width: 7,
    height: 7,
    backgroundColor: TEAL,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.55,
    color: '#4B5563',
  },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 3,
    borderLeftColor: TEAL,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: TEAL,
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#6B7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  certName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#6B7280',
  },
});

export default function Lighthouse({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName.split(' ').map((w) => w.charAt(0)).slice(0, 2).join('')
    : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {orderSections(data, {
            personal: (
              <View style={styles.beamTop}>
                {initials ? (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                  </View>
                ) : null}
                <Text style={styles.beamLabel}>Navigator</Text>
              </View>
            ),
          })}

          <View style={styles.sidebarBody}>
            {orderSections(data, {
              personal: (
                <View style={styles.sidebarBlock}>
                  <Text style={styles.sidebarTitle}>Contact</Text>
                  {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
                  {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
                  {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
                  {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
                </View>
              ),

              skills: data.skills && data.skills.length > 0 ? (
                <View style={styles.sidebarBlock}>
                  <Text style={styles.sidebarTitle}>Skills</Text>
                  {data.skills.map((s, i) => (
                    <View key={s.id} style={styles.barBlock}>
                      <Text style={styles.barLabel}>{s.name}</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${64 + ((i * 41) % 32)}%` }]} />
                      </View>
                    </View>
                  ))}
                </View>
              ) : null,

              education: data.education && data.education.length > 0 ? (
                <View style={styles.sidebarBlock}>
                  <Text style={styles.sidebarTitle}>Education</Text>
                  {data.education.map((edu) => (
                    <View key={edu.id} style={styles.eduItem}>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      {edu.graduationYear ? (
                        <Text style={styles.eduYear}>{edu.graduationYear}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null,
            })}
          </View>
        </View>

        <View style={styles.main}>
          {orderSections(data, {
            personal: (
              <>
                {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
                {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
                {data.summary ? (
                  <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                      <View style={styles.diamond} />
                      <Text style={styles.sectionTitle}>Profile</Text>
                    </View>
                    <Text style={styles.summaryText}>{data.summary}</Text>
                  </View>
                ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <View style={styles.diamond} />
                  <Text style={styles.sectionTitle}>Experience</Text>
                </View>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.card}>
                    <View style={styles.expHeader}>
                      <Text style={styles.roleText}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.companyText}>{exp.company}</Text>
                    {exp.description ? (
                      <View>
                        {exp.description
                          .split(/\n|\r?\n/)
                          .filter(Boolean)
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
            ) : null,

            projects: data.showProjects && data.projects && data.projects.length > 0 ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <View style={styles.diamond} />
                  <Text style={styles.sectionTitle}>Projects</Text>
                </View>
                {data.projects.map((p) => (
                  <View key={p.id} style={styles.card}>
                    <Text style={styles.roleText}>{p.name}</Text>
                    <Text style={styles.summaryText}>{p.description}</Text>
                  </View>
                ))}
              </View>
            ) : null,

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <View style={styles.diamond} />
                  <Text style={styles.sectionTitle}>Certifications</Text>
                </View>
                {data.certifications.map((c) => (
                  <View key={c.id} style={styles.certRow}>
                    <Text style={styles.certName}>
                      {c.name}
                      {c.issuer ? ` — ${c.issuer}` : ''}
                    </Text>
                    {c.date ? <Text style={styles.dateText}>{c.date}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null,

            references: data.showReferences && data.references && data.references.length > 0 ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <View style={styles.diamond} />
                  <Text style={styles.sectionTitle}>References</Text>
                </View>
                <View style={styles.refGrid}>
                  {data.references.map((r) => (
                    <View key={r.id} style={styles.refCard}>
                      <Text style={styles.refName}>{r.name}</Text>
                      <Text style={styles.refDetail}>
                        {r.title}
                        {r.company ? ` · ${r.company}` : ''}
                      </Text>
                      {r.contact ? <Text style={styles.refDetail}>{r.contact}</Text> : null}
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
                  <View style={styles.sectionTitleRow}>
                    <View style={styles.diamond} />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.card}>
                      <View style={styles.expHeader}>
                        <Text style={styles.roleText}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? (
                        <Text style={styles.bulletText}>{item.subtitle}</Text>
                      ) : null}
                      {item.description ? (
                        <Text style={styles.summaryText}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
