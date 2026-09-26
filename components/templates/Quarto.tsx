import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 56,
    paddingRight: 56,
  },
  header: {
    alignItems: 'center',
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4B5563',
    marginTop: 8,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 10,
    textAlign: 'center',
  },
  headerRule: {
    width: 80,
    marginTop: 22,
    borderTopWidth: 2,
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.9,
    color: '#1F2937',
    marginTop: 28,
  },
  dropCap: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  chapterHead: {
    marginTop: 28,
    marginBottom: 12,
  },
  chapterTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  chapterNumeral: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginRight: 8,
  },
  chapterInitial: {
    fontSize: 21,
  },
  experienceItem: {
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  subLine: {
    fontSize: 10,
    color: '#4B5563',
    marginTop: 2,
  },
  companyItalic: {
    fontStyle: 'italic',
  },
  bulletList: {
    marginTop: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletMark: {
    width: 14,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.75,
    color: '#1F2937',
  },
  eduItem: {
    marginBottom: 10,
  },
  degreeText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.9,
    color: '#1F2937',
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  projectDesc: {
    fontSize: 9.5,
    lineHeight: 1.75,
    color: '#1F2937',
    marginTop: 3,
  },
  certItem: {
    marginBottom: 8,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 10,
  },
  refName: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  refContact: {
    fontSize: 9,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 9.5,
    lineHeight: 1.75,
    color: '#1F2937',
    marginTop: 3,
  },
});

export default function Quarto({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const ChapterHead = ({ numeral, title }: { numeral: string; title: string }) => (
    <View style={styles.chapterHead}>
      <Text style={styles.chapterTitle}>
        <Text style={[styles.chapterNumeral, { color: themeColor }]}>{numeral}.</Text>
        <Text style={[styles.chapterInitial, { color: themeColor }]}>{title.charAt(0)}</Text>
        {title.slice(1)}
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {/* Title page */}
        <View style={styles.header}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle ? (
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contactParts.length > 0 ? (
            <Text style={styles.contactLine}>{contactParts.join('   ·   ')}</Text>
          ) : null}
          <View style={[styles.headerRule, { borderTopColor: themeColor }]} />
        </View>

        {/* Preface — summary with drop cap */}
        {data.summary ? (
          <Text style={styles.summary}>
            <Text style={[styles.dropCap, { color: themeColor }]}>{data.summary.charAt(0)}</Text>
            {data.summary.slice(1)}
          </Text>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && ((i: number) => (
          <View>
            <ChapterHead numeral={ROMAN[i] || ''} title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                <Text style={styles.subLine}>
                  <Text style={styles.companyItalic}>{exp.company}</Text>
                  {'  |  '}
                  {exp.startDate} — {exp.endDate}
                </Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {lines(exp.description).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={[styles.bulletMark, { color: themeColor }]}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
          )),

          education: data.education && data.education.length > 0 && ((i: number) => (
          <View>
            <ChapterHead numeral={ROMAN[i] || ''} title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.subLine}>
                  <Text style={styles.companyItalic}>{edu.school}</Text>
                  {edu.graduationYear ? `  |  ${edu.graduationYear}` : ''}
                </Text>
              </View>
            ))}
          </View>
          )),

          skills: data.skills && data.skills.length > 0 && ((i: number) => (
          <View>
            <ChapterHead numeral={ROMAN[i] || ''} title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((skill) => skill.name).join('   ·   ')}
            </Text>
          </View>
          )),

          projects: data.showProjects && data.projects && data.projects.length > 0 && ((i: number) => (
          <View>
            <ChapterHead numeral={ROMAN[i] || ''} title="Projects" />
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectName}>
                  {project.name}
                  {project.link ? <Text style={styles.projectLink}> — {project.link}</Text> : null}
                </Text>
                {project.description ? (
                  <Text style={styles.projectDesc}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
          )),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && ((i: number) => (
          <View>
            <ChapterHead numeral={ROMAN[i] || ''} title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certItem}>
                <Text style={styles.degreeText}>{cert.name}</Text>
                <Text style={styles.subLine}>
                  {cert.issuer ? <Text style={styles.companyItalic}>{cert.issuer}</Text> : null}
                  {cert.issuer && cert.date ? '  |  ' : ''}
                  {cert.date ? cert.date : ''}
                </Text>
              </View>
            ))}
          </View>
          )),

          references: data.showReferences && data.references && data.references.length > 0 && ((i: number) => (
          <View>
            <ChapterHead numeral={ROMAN[i] || ''} title="References" />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
          )),

        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (i: number) => (
            <View key={section.id}>
              <ChapterHead numeral={ROMAN[i] || ''} title={section.title} />
              {section.items.map((item) => (
                <View key={item.id} style={styles.customItem}>
                  <Text style={styles.customTitle}>{item.title}</Text>
                  <Text style={styles.subLine}>
                    {item.subtitle ? <Text style={styles.companyItalic}>{item.subtitle}</Text> : null}
                    {item.subtitle && item.date ? '  |  ' : ''}
                    {item.date ? item.date : ''}
                  </Text>
                  {item.description ? (
                    <Text style={styles.customDesc}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )))
        }
      </Page>
    </Document>
  );
}
