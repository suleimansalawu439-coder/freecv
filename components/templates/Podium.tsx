import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections, getOrderedSectionIds } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 54,
    paddingBottom: 60,
    paddingHorizontal: 64,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlePill: {
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 18,
    marginTop: 12,
    marginBottom: 10,
  },
  titlePillText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  contact: {
    fontSize: 10,
    color: '#4B5563',
    textAlign: 'center',
  },
  podiumMarks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  podiumBar: {
    width: 30,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 26,
    marginBottom: 12,
  },
  sectionNum: {
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    marginRight: 10,
  },
  sectionRule: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.8,
    color: '#374151',
    textAlign: 'center',
  },
  expCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  expCardFirst: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
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
  roleFirst: {
    fontSize: 12.5,
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
    marginBottom: 6,
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
  eduCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  school: {
    fontSize: 10,
    color: '#4B5563',
  },
  skillRow: {
    marginBottom: 8,
  },
  skillLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  skillName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  skillRank: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  skillTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F4F6',
  },
  skillFill: {
    height: 6,
    borderRadius: 3,
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
  certCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
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

function SectionHeader({ num, title, themeColor }: { num: string; title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={[styles.sectionNum, { color: themeColor }]}>{num}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

export default function Podium({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');

  // Section numbers ("01", "02", …) follow the rendered display order, so they
  // stay consecutive when the user reorders or hides sections. The identity
  // header itself is unnumbered; only the Profile (summary) section takes a number.
  const sectionNums: Record<string, string> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal': return !!data.summary;
        case 'experience': return !!data.experience && data.experience.length > 0;
        case 'education': return !!data.education && data.education.length > 0;
        case 'skills': return !!data.skills && data.skills.length > 0;
        case 'projects': return data.showProjects && !!data.projects && data.projects.length > 0;
        case 'certifications': return data.showCertifications && !!data.certifications && data.certifications.length > 0;
        case 'references': return data.showReferences && !!data.references && data.references.length > 0;
        default: return false;
      }
    });
    const map: Record<string, string> = {};
    rendered.forEach((id, n) => { map[id] = String(n + 1).padStart(2, '0'); });
    return map;
  })();
  const customBase = Object.keys(sectionNums).length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.headerBlock}>
          {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
          {info.jobTitle ? (
            <View style={[styles.titlePill, { backgroundColor: themeColor }]}>
              <Text style={styles.titlePillText}>{info.jobTitle}</Text>
            </View>
          ) : null}
          {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          <View style={styles.podiumMarks}>
            <View style={[styles.podiumBar, { backgroundColor: themeColor }]} />
            <View style={[styles.podiumBar, { backgroundColor: '#E5E7EB' }]} />
            <View style={[styles.podiumBar, { backgroundColor: '#E5E7EB' }]} />
          </View>
        </View>

        {data.summary ? (
          <View>
            <SectionHeader num={sectionNums.personal} title="Profile" themeColor={themeColor} />
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View>
              <SectionHeader num={sectionNums.experience} title="Experience" themeColor={themeColor} />
            {data.experience.map((exp, idx) => (
              <View
                key={exp.id}
                style={idx === 0 ? [styles.expCardFirst, { borderColor: themeColor }] : styles.expCard}
              >
                <View style={styles.expHeaderRow}>
                  <Text style={idx === 0 ? styles.roleFirst : styles.role}>{exp.role}</Text>
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
              <SectionHeader num={sectionNums.education} title="Education" themeColor={themeColor} />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduCard}>
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
              <SectionHeader num={sectionNums.skills} title="Skills" themeColor={themeColor} />
            {data.skills.map((skill, i) => (
              <View key={skill.id} style={styles.skillRow}>
                <View style={styles.skillLabelRow}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillRank}>#{i + 1}</Text>
                </View>
                <View style={styles.skillTrack}>
                  <View
                    style={[styles.skillFill, { width: `${Math.max(35, 100 - i * 7)}%`, backgroundColor: themeColor }]}
                  />
                </View>
              </View>
            ))}
          </View>
            ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View>
              <SectionHeader num={sectionNums.projects} title="Projects" themeColor={themeColor} />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.expCard}>
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
              <SectionHeader num={sectionNums.certifications} title="Certifications" themeColor={themeColor} />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certCard}>
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
              <SectionHeader num={sectionNums.references} title="References" themeColor={themeColor} />
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
          (data.customSections || []).map((section, si) =>
            section.items &&
            section.items.length > 0 && (
              <View key={section.id}>
                <SectionHeader
                  num={String(customBase + si + 1).padStart(2, '0')}
                  title={section.title}
                  themeColor={themeColor}
                />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expCard}>
                      <View style={styles.expHeaderRow}>
                        <Text style={styles.customTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dates}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )
      )}
      </Page>
    </Document>
  );
}
