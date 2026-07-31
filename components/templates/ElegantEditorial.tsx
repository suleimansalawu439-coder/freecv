import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FDFBF7',
    padding: 54,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#111827',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
    objectFit: 'cover',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  dividerSymbol: {
    marginHorizontal: 8,
    fontSize: 10,
  },
  fullName: {
    fontSize: 28,
    fontFamily: 'Times-Italic',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  mainGrid: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '30%',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightStyle: 'solid',
  },
  rightColumn: {
    width: '70%',
    paddingLeft: 20,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingBottom: 3,
  },
  contactText: {
    fontSize: 8.5,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginRight: 6,
  },
  skillText: {
    fontSize: 8.5,
    color: '#374151',
  },
  itemBlock: {
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 8.5,
    fontFamily: 'Times-BoldItalic',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 8,
    color: '#4b5563',
    marginTop: 1,
  },
  itemDate: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
  },
  itemDesc: {
    fontSize: 8,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.3,
  },
  summaryContainer: {
    marginBottom: 20,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
  },
  summaryText: {
    fontSize: 9.5,
    fontFamily: 'Times-Italic',
    color: '#374151',
    lineHeight: 1.4,
  },
  expMainTitle: {
    fontSize: 16,
    fontFamily: 'Times-Italic',
    color: '#111827',
    marginBottom: 16,
  },
  expBlock: {
    marginBottom: 16,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    flex: 1,
  },
  expDates: {
    fontSize: 8,
    fontFamily: 'Times-Italic',
  },
  expCompany: {
    fontSize: 8.5,
    fontFamily: 'Times-Italic',
    color: '#4b5563',
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.3,
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
  },
});

export default function ElegantEditorial({ data }: { data: ResumeData }) {
  const c = data.theme?.color || '#b45309';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.personalInfo.profilePicture && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              src={data.personalInfo.profilePicture}
              style={[styles.profilePicture, { borderColor: c, borderWidth: 2 }]}
            />
          )}
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: c }]} />
            <Text style={[styles.dividerSymbol, { color: c }]}>✦</Text>
            <View style={[styles.dividerLine, { backgroundColor: c }]} />
          </View>
          <Text style={styles.fullName}>{data.personalInfo.fullName}</Text>
          <Text style={[styles.jobTitle, { color: c }]}>
            {data.personalInfo.jobTitle}
          </Text>
        </View>

        <View style={styles.mainGrid}>
          <View style={[styles.leftColumn, { borderColor: `${c}33` }]}>
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionTitle, { color: c, borderColor: `${c}4D` }]}>
                Contact
              </Text>
              {data.personalInfo.email ? (
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              ) : null}
              {data.personalInfo.phone ? (
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              ) : null}
              {data.personalInfo.location ? (
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              ) : null}
              {data.personalInfo.website ? (
                <Text style={styles.contactText}>{data.personalInfo.website}</Text>
              ) : null}
            </View>

            {data.skills && data.skills.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionTitle, { color: c, borderColor: `${c}4D` }]}>
                  Expertise
                </Text>
                {data.skills.map((s) => (
                  <View key={s.id} style={styles.skillRow}>
                    <View style={[styles.skillDot, { backgroundColor: c }]} />
                    <Text style={styles.skillText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.education && data.education.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionTitle, { color: c, borderColor: `${c}4D` }]}>
                  Education
                </Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.itemBlock}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.school}</Text>
                    <Text style={[styles.itemDate, { color: c }]}>
                      {edu.graduationYear}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.customSections &&
              data.customSections.length > 0 &&
              data.customSections.map(
                (section) =>
                  section.items.length > 0 && (
                    <View key={section.id} style={styles.sectionBlock}>
                      <Text style={[styles.sectionTitle, { color: c, borderColor: `${c}4D` }]}>
                        {section.title}
                      </Text>
                      {section.items.map((item) => (
                        <View key={item.id} style={styles.itemBlock}>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          {item.subtitle && (
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                          )}
                          {item.date && (
                            <Text style={[styles.itemDate, { color: c }]}>{item.date}</Text>
                          )}
                          {item.description && (
                            <Text style={styles.itemDesc}>{item.description}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )
              )}
          </View>

          <View style={styles.rightColumn}>
            {data.summary && (
              <View style={[styles.summaryContainer, { borderColor: c }]}>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            )}

            {data.experience && data.experience.length > 0 && (
              <View>
                <Text style={styles.expMainTitle}>Professional Experience</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expBlock}>
                    <View style={styles.expHeaderRow}>
                      <Text style={styles.expRole}>{exp.role}</Text>
                      <Text style={[styles.expDates, { color: c }]}>
                        {exp.startDate} — {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    {exp.description
                      ? exp.description
                          .split('\n')
                          .filter((l) => l.trim())
                          .map((line, j) => (
                            <View key={j} style={styles.bulletRow}>
                              <Text style={[styles.bulletSymbol, { color: c }]}>•</Text>
                              <Text style={styles.bulletText}>{line}</Text>
                            </View>
                          ))
                      : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: c }]} />
            <Text style={[styles.dividerSymbol, { color: c }]}>✦</Text>
            <View style={[styles.dividerLine, { backgroundColor: c }]} />
          </View>
        </View>
      </Page>
    </Document>
  );
}