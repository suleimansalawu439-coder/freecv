import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { getOrderedSectionIds, orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    backgroundColor: '#FFFFFF',
    fontSize: 10,
    color: '#000000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  fullName: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Times-Italic',
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 9,
    color: '#374151',
  },
  abstractSection: {
    marginBottom: 20,
  },
  abstractTitle: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  abstractText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    textAlign: 'justify',
    paddingHorizontal: 24,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  expItem: {
    marginBottom: 12,
  },
  expRole: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  expCompanyDate: {
    fontSize: 9.5,
    fontFamily: 'Times-Italic',
  },
  expDesc: {
    fontSize: 9,
    lineHeight: 1.35,
    marginTop: 4,
    textAlign: 'justify',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  eduSchool: {
    fontSize: 9.5,
  },
  skillsList: {
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    fontSize: 9.5,
    flex: 1,
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  refTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Italic',
    marginBottom: 1,
  },
  refContact: {
    fontSize: 9,
  },
  customSectionItem: {
    marginBottom: 12,
  },
  customSectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 8,
  },
  customItem: {
    marginBottom: 6,
  },
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customItemTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
  },
  customItemSubtitle: {
    fontSize: 9,
    fontFamily: 'Times-Italic',
  },
  customItemDate: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
  },
  customItemDesc: {
    fontSize: 9,
    marginTop: 2,
  },
});

export default function AcademicJournal({ data }: TemplateProps) {
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  // The journal numbers its sections I., II., III., ... in reading order
  // (left column top-to-bottom, then right column top-to-bottom). The numbers
  // follow the rendered order, so they stay consecutive when the user reorders
  // or hides sections. The identity header and Abstract are never numbered.
  const sectionNums: Record<string, string> = (() => {
    const hasData = (id: string): boolean => {
      switch (id) {
        case 'experience':
          return !!data.experience && data.experience.length > 0;
        case 'education':
          return !!data.education && data.education.length > 0;
        case 'skills':
          return !!data.skills && data.skills.length > 0;
        case 'references':
          return data.showReferences && !!data.references && data.references.length > 0;
        default:
          return false;
      }
    };
    const ids = getOrderedSectionIds(data);
    const ordered = [
      ...ids.filter((id) => id === 'experience' && hasData(id)),
      ...ids.filter((id) => id !== 'experience' && hasData(id)),
    ];
    const map: Record<string, string> = {};
    ordered.forEach((id, n) => {
      map[id] = ROMAN[n];
    });
    return map;
  })();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <View style={styles.header}>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.email}
            {data.personalInfo.phone ? ` • ${data.personalInfo.phone}` : ''}
            {data.personalInfo.location ? ` • ${data.personalInfo.location}` : ''}
          </Text>
        </View>

        {data.summary ? (
          <View style={styles.abstractSection}>
            <Text style={styles.abstractTitle}>Abstract</Text>
            <Text style={styles.abstractText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),
        })}

        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {orderSections(data, {
              experience: data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>{sectionNums.experience}. Professional Appointments</Text></View>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expCompanyDate}>{exp.company} ({exp.startDate} - {exp.endDate})</Text>
                    {exp.description ? (
                      <Text style={styles.expDesc}>{exp.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
              ),
            })}
          </View>

          <View style={styles.column}>
            {orderSections(data, {
              education: data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>{sectionNums.education}. Education</Text></View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}, {edu.graduationYear}</Text>
                  </View>
                ))}
              </View>
            ),

              skills: data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>{sectionNums.skills}. Technical Skills</Text></View>
                <View style={styles.skillsList}>
                  {data.skills.map((skill) => (
                    <View key={skill.id} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ),

              references: data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitleText}>{sectionNums.references}. References</Text></View>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refItem}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    <Text style={styles.refTitle}>{ref.title} @ {ref.company}</Text>
                    {ref.contact ? (
                      <Text style={styles.refContact}>{ref.contact}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
              ),
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <View key={section.id} style={styles.customSectionItem}>
                  <Text style={styles.customSectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.customItem}>
                      <View style={styles.customRow}>
                        <View>
                          <Text style={styles.customItemTitle}>{item.title}</Text>
                          {item.subtitle ? (
                            <Text style={styles.customItemSubtitle}>{item.subtitle}</Text>
                          ) : null}
                        </View>
                        {item.date ? (
                          <Text style={styles.customItemDate}>{item.date}</Text>
                        ) : null}
                      </View>
                      {item.description ? (
                        <Text style={styles.customItemDesc}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
