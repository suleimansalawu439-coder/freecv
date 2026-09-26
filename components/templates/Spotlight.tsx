import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';
const DARK = '#14181f';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  band: {
    backgroundColor: DARK,
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 60,
    position: 'relative',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D1D5DB',
    marginTop: 6,
  },
  contact: {
    fontSize: 9.5,
    color: '#9CA3AF',
    marginTop: 8,
  },
  spotBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
  },
  body: {
    paddingTop: 6,
    paddingBottom: 60,
    paddingHorizontal: 60,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 12,
  },
  glowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    marginRight: 10,
  },
  sectionRule: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.7,
    color: '#374151',
  },
  expItem: {
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  company: {
    fontSize: 10,
    fontWeight: 'bold',
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
    lineHeight: 1.55,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  school: {
    fontSize: 10,
    color: '#4B5563',
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillCell: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  dotsRow: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  certText: {
    fontSize: 10,
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
    marginBottom: 8,
  },
  refName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  customSubtitle: {
    fontSize: 10,
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
    marginTop: 2,
  },
});

function SectionHeader({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.glowDot, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Spotlight({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.band}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          <View style={[styles.spotBar, { backgroundColor: themeColor }]} />
        </View>
            </>
          ),
          },
        )}

        <View style={styles.body}>
          {orderSections(data, {
            personal: (
              <>
          {data.summary ? (
            <View>
              <SectionHeader title="Profile" themeColor={themeColor} />
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 && (
            <View>
              <SectionHeader title="Experience" themeColor={themeColor} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.role}>{exp.role}</Text>
                    <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
                  </View>
                  <Text style={[styles.company, { color: themeColor }]}>{exp.company}</Text>
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
          ),

            education: data.education && data.education.length > 0 && (
            <View>
              <SectionHeader title="Education" themeColor={themeColor} />
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
          ),

            skills: data.skills && data.skills.length > 0 && (
            <View>
              <SectionHeader title="Skills" themeColor={themeColor} />
              <View style={styles.skillGrid}>
                {data.skills.map((skill, i) => (
                  <View key={skill.id} style={styles.skillCell}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.dotsRow}>
                      {[0, 1, 2, 3, 4].map((d) => (
                        <View
                          key={d}
                          style={[
                            styles.dot,
                            { backgroundColor: d < 3 + (i % 3) ? themeColor : '#E5E7EB' },
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <SectionHeader title="Projects" themeColor={themeColor} />
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
          ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View>
              <SectionHeader title="Certifications" themeColor={themeColor} />
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
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View>
              <SectionHeader title="References" themeColor={themeColor} />
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
          ),
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                  <View key={section.id}>
                    <SectionHeader title={section.title} themeColor={themeColor} />
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
              ))
          )}
        </View>
      </Page>
    </Document>
  );
}
