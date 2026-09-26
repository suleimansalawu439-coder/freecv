import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections, getOrderedSectionIds, isSectionVisible } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  eyebrow: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#94A3B8',
    letterSpacing: 3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  jobTitle: {
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactLine: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#475569',
    marginBottom: 10,
  },
  headerBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    marginBottom: 20,
  },
  headerBarFill: {
    height: 4,
    width: '33%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  sectionIndex: {
    fontFamily: 'Courier',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: 'Courier',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
    borderLeftWidth: 2,
    borderLeftColor: '#E2E8F0',
    paddingLeft: 10,
  },
  expCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  expCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  expRole: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  expDates: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#FFFFFF',
  },
  expBody: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  specRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  specLabel: {
    fontFamily: 'Courier',
    fontSize: 7.5,
    color: '#94A3B8',
    width: 70,
    textTransform: 'uppercase',
  },
  specValue: {
    flex: 1,
    fontSize: 8.5,
    color: '#1E293B',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletNum: {
    fontFamily: 'Courier',
    fontSize: 7.5,
    color: '#94A3B8',
    width: 70,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#334155',
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skillCell: {
    width: '33.33%',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  skillText: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#1E293B',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
    marginBottom: 6,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#475569',
  },
  yearText: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#64748B',
  },
  section: {
    marginBottom: 6,
  },
});

function SectionHead({ index, title, themeColor }: { index: string; title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionIndex, { backgroundColor: themeColor }]}>{index}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Engine({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Section numbers ("01", "02", …) follow the rendered display order, so they
  // stay consecutive when the user reorders or hides sections. References keeps
  // its signature "99" label and never consumes a sequence number; custom
  // sections continue the sequence from the original 07 base.
  const sectionNums: Record<string, string> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal': return !!data.summary;
        case 'experience': return !!data.experience && data.experience.length > 0;
        case 'skills': return !!data.skills && data.skills.length > 0;
        case 'education': return !!data.education && data.education.length > 0;
        case 'projects': return data.showProjects && !!data.projects && data.projects.length > 0;
        case 'certifications': return data.showCertifications && !!data.certifications && data.certifications.length > 0;
        case 'references': return false;
        default: return false;
      }
    });
    const map: Record<string, string> = {};
    rendered.forEach((id, n) => { map[id] = String(n + 1).padStart(2, '0'); });
    return map;
  })();
  const customBase = Object.keys(sectionNums).length;

  // Custom sections keep their original position: ahead of References (which
  // closes the document as "99"). If References is hidden or empty, they fall
  // back to rendering after all ordered sections.
  const customJSX = (data.customSections || [])
    .filter((section) => section.items && section.items.length > 0)
    .map((section, si) => (
      <View key={section.id} style={styles.section}>
        <SectionHead
          index={String(customBase + si + 1).padStart(2, '0')}
          title={section.title}
          themeColor={themeColor}
        />
        {section.items.map((item) => (
          <View key={item.id} style={{ marginBottom: 6 }}>
            <View style={styles.eduRow}>
              <Text style={styles.degreeText}>{item.title}</Text>
              {item.date ? <Text style={styles.yearText}>{item.date}</Text> : null}
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
    ));
  const refsWillRender =
    isSectionVisible(data, 'references') &&
    data.showReferences &&
    !!data.references &&
    data.references.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <Text style={styles.eyebrow}>{'// Resume Specification'}</Text>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? (
                <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
              ) : null}
              {contactItems.length > 0 ? (
                <Text style={styles.contactLine}>{contactItems.join('  |  ')}</Text>
              ) : null}
              <View style={styles.headerBar}>
                <View style={[styles.headerBarFill, { backgroundColor: themeColor }]} />
              </View>

              {data.summary ? (
                <View style={styles.section}>
                  <SectionHead index={sectionNums.personal} title="Profile" themeColor={themeColor} />
                  <Text style={styles.summaryText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionHead index={sectionNums.experience} title="Experience" themeColor={themeColor} />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expCard}>
                <View style={[styles.expCardHeader, { backgroundColor: themeColor }]}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDates}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <View style={styles.expBody}>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Company</Text>
                    <Text style={styles.specValue}>{exp.company}</Text>
                  </View>
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletNum}>
                          {String(i + 1).padStart(2, '0')}
                        </Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
            ),

            skills: data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <SectionHead index={sectionNums.skills} title="Technical Skills" themeColor={themeColor} />
            <View style={styles.skillGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
            ),

            education: data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <SectionHead index={sectionNums.education} title="Education" themeColor={themeColor} />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.yearText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
            ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
              <View style={styles.section}>
                <SectionHead index={sectionNums.projects} title="Projects" themeColor={themeColor} />
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 8 }}>
                <Text style={styles.degreeText}>
                  {proj.name}
                  {proj.link ? `  [${proj.link}]` : ''}
                </Text>
                <Text style={styles.schoolText}>{proj.description}</Text>
              </View>
            ))}
          </View>
            ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={styles.section}>
                <SectionHead index={sectionNums.certifications} title="Certifications" themeColor={themeColor} />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.eduRow}>
                <Text style={styles.degreeText}>
                  {cert.name}
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.yearText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
            ),

          references: refsWillRender && (
            <>
              {customJSX}
              <View style={styles.section}>
                <SectionHead index="99" title="References" themeColor={themeColor} />
                {data.references.map((ref) => (
                  <View key={ref.id} style={{ marginBottom: 6 }}>
                    <Text style={styles.degreeText}>{ref.name}</Text>
                    <Text style={styles.schoolText}>
                      {ref.title}
                      {ref.company ? `, ${ref.company}` : ''}
                    </Text>
                    {ref.contact ? <Text style={styles.yearText}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            </>
          ),
        },
          refsWillRender ? [] : customJSX
        )}
      </Page>
    </Document>
  );
}
