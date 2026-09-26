import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 44,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#475569',
    marginRight: 14,
    marginBottom: 3,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
    marginRight: 10,
  },
  sectionBar: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#334155',
  },
  expRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  expDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 10,
  },
  expBody: {
    flex: 1,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 8,
    color: '#64748B',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 4,
  },
  bulletText: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#334155',
    marginBottom: 3,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#475569',
  },
  skillPill: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={[styles.sectionBar, { backgroundColor: themeColor }]} />
    </View>
  );
}

export default function Tutor({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
              ) : null}
              <View style={styles.contactRow}>
                {info.email ? <Text style={styles.contactItem}>{info.email}</Text> : null}
                {info.phone ? <Text style={styles.contactItem}>{info.phone}</Text> : null}
                {info.location ? <Text style={styles.contactItem}>{info.location}</Text> : null}
                {info.website ? <Text style={styles.contactItem}>{info.website}</Text> : null}
              </View>

              {data.summary ? (
                <View style={styles.section}>
                  <SectionHead title="About Me" themeColor={themeColor} />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Teaching Experience" themeColor={themeColor} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expRow}>
                  <View style={[styles.expDot, { backgroundColor: themeColor }]} />
                  <View style={styles.expBody}>
                    <View style={styles.expTop}>
                      <Text style={styles.roleTitle}>{exp.role}</Text>
                      <Text style={styles.dateText}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.companyName}>{exp.company}</Text>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <Text key={i} style={styles.bulletText}>
                          {line}
                        </Text>
                      ))}
                  </View>
                </View>
              ))}
            </View>
          ),

          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Education" themeColor={themeColor} />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.eduRow}>
                  <View>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    <Text style={styles.schoolText}>{edu.school}</Text>
                  </View>
                  {edu.graduationYear ? (
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Skills & Subjects" themeColor={themeColor} />
              <View style={styles.skillsWrap}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={[styles.skillPill, { borderColor: themeColor }]}>
                    <Text style={[styles.skillText, { color: themeColor }]}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Certifications" themeColor={themeColor} />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.eduRow}>
                  <Text style={styles.degreeText}>
                    {cert.name}
                    {cert.issuer ? ` · ${cert.issuer}` : ''}
                  </Text>
                  {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
                </View>
              ))}
            </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="Projects" themeColor={themeColor} />
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.degreeText}>
                    {proj.name}
                    {proj.link ? ` (${proj.link})` : ''}
                  </Text>
                  <Text style={styles.schoolText}>{proj.description}</Text>
                </View>
              ))}
            </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionHead title="References" themeColor={themeColor} />
              {data.references.map((ref) => (
                <View key={ref.id} style={{ marginBottom: 6 }}>
                  <Text style={styles.degreeText}>{ref.name}</Text>
                  <Text style={styles.schoolText}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.dateText}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHead title={section.title} themeColor={themeColor} />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View style={styles.eduRow}>
                      <Text style={styles.degreeText}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={[styles.schoolText, { fontStyle: 'italic' }]}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.schoolText}>{item.description}</Text>
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
