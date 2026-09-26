import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const INK = '#000000';

// Ink black only — no theme color is used in this formal legal design.

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    padding: 48,
  },
  content: {
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    color: INK,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    color: INK,
    marginBottom: 8,
  },
  contactRow: {
    fontSize: 9,
    textAlign: 'center',
    color: INK,
    marginBottom: 14,
  },
  ruleLine: {
    borderBottomWidth: 1,
    borderBottomColor: INK,
    width: '100%',
    marginBottom: 3,
  },
  doubleRule: {
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionRuleTop: {
    borderTopWidth: 1,
    borderTopColor: INK,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textAlign: 'center',
    color: INK,
    marginVertical: 8,
  },
  sectionRuleBottom: {
    borderBottomWidth: 1,
    borderBottomColor: INK,
    width: '100%',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: INK,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 14,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: INK,
  },
  dateText: {
    fontSize: 8.5,
    color: INK,
  },
  companyName: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: INK,
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 12,
    fontSize: 8.5,
    color: INK,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: INK,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  degreeText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: INK,
  },
  schoolText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: INK,
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: INK,
  },
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: INK,
  },
  certDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.45,
    color: INK,
    marginTop: 3,
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: INK,
  },
  refDetail: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK,
  },
  refContact: {
    fontSize: 9,
    color: INK,
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: INK,
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: INK,
  },
  customDescription: {
    fontSize: 9,
    color: INK,
    marginTop: 3,
    lineHeight: 1.45,
  },
});

function FormalSectionHeader({ numeral, title }: { numeral: string; title: string }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.sectionRuleTop} />
      <Text style={styles.sectionTitle}>
        {numeral}.  {title}
      </Text>
      <View style={styles.sectionRuleBottom} />
    </View>
  );
}

export default function Advocate({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || '#2563eb';

  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          {orderSections(data, {
            personal: (
              <>
          {/* Header */}
          <View style={styles.header}>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
            ) : null}
            {contactItems.length > 0 ? (
              <Text style={styles.contactRow}>{contactItems.join(' · ')}</Text>
            ) : null}
            <View style={styles.doubleRule}>
              <View style={styles.ruleLine} />
              <View style={styles.ruleLine} />
            </View>
          </View>

          {/* Professional Summary (unnumbered) */}
          {data.summary ? (
            <View style={styles.section}>
              <View style={{ marginBottom: 10 }}>
                <View style={styles.sectionRuleTop} />
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <View style={styles.sectionRuleBottom} />
              </View>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}
              </>
            ),

            experience: data.experience && data.experience.length > 0 && ((i: number) => (
            <View style={styles.section}>
              <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Professional Experience" />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {(exp.startDate || exp.endDate) ? (
                      <Text style={styles.dateText}>
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                      </Text>
                    ) : null}
                  </View>
                  {exp.company ? (
                    <Text style={styles.companyName}>{exp.company}</Text>
                  ) : null}
                  {exp.description ? (
                    <View style={styles.bulletList}>
                      {exp.description
                        .split(/\n|\r?\n/)
                        .map((line) => line.trim())
                        .filter((line) => line.length > 0)
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
            )),

            education: data.education && data.education.length > 0 && ((i: number) => (
            <View style={styles.section}>
              <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.educationRow}>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.dateText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                  {edu.school ? (
                    <Text style={styles.schoolText}>{edu.school}</Text>
                  ) : null}
                </View>
              ))}
            </View>
            )),

            skills: data.skills && data.skills.length > 0 && ((i: number) => (
            <View style={styles.section}>
              <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Skills" />
              <Text style={styles.skillsText}>
                {data.skills.map((skill) => skill.name).filter(Boolean).join('; ')}
              </Text>
            </View>
            )),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && ((i: number) => (
            <View style={styles.section}>
              <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {(cert.issuer || cert.date) ? (
                    <Text style={styles.certDetail}>
                      {cert.issuer}{cert.issuer && cert.date ? ', ' : ''}{cert.date}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
            )),

            projects: data.showProjects && data.projects && data.projects.length > 0 && ((i: number) => (
            <View style={styles.section}>
              <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Selected Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{proj.name}</Text>
                    {proj.link ? (
                      <Link src={proj.link} style={[styles.dateText, { textDecoration: 'none' }]}>
                        {proj.link}
                      </Link>
                    ) : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.projectDesc}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
            )),

            references: data.showReferences && data.references && data.references.length > 0 && ((i: number) => (
            <View style={styles.section} wrap={false}>
              <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="References" />
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refItem}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  {(ref.title || ref.company) ? (
                    <Text style={styles.refDetail}>
                      {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                    </Text>
                  ) : null}
                  {ref.contact ? (
                    <Text style={styles.refContact}>{ref.contact}</Text>
                  ) : null}
                </View>
              ))}
            </View>
            )),

          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (i: number) => (
              <View key={section.id} style={styles.section}>
                <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <View>
                        <Text style={styles.customTitle}>{item.title}</Text>
                        {item.subtitle ? (
                          <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                        ) : null}
                      </View>
                      {item.date ? (
                        <Text style={styles.dateText}>{item.date}</Text>
                      ) : null}
                    </View>
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )))
          }
        </View>
      </Page>
    </Document>
  );
}
