import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  titlePill: {
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  titlePillText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  section: {
    marginBottom: 16,
  },
  sectionPill: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  sectionPillText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
  },
  datePill: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  datePillText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  companyText: {
    fontSize: 9.5,
    color: '#374151',
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 10,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 6,
    marginBottom: 6,
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  schoolText: {
    fontSize: 9,
    color: '#374151',
  },
  dateText: {
    fontSize: 8,
    color: '#4B5563',
  },
  skillPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillPillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  certPill: {
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  certPillText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#374151',
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
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
    padding: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 8,
    color: '#4B5563',
  },
});

export default function Clearance({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const SectionPill = ({ title }: { title: string }) => (
    <View style={[styles.sectionPill, { backgroundColor: themeColor }]}>
      <Text style={styles.sectionPillText}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.headerRow}>
          <View>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {contactItems.length > 0 ? (
              <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
            ) : null}
          </View>
          {info.jobTitle ? (
            <View style={[styles.titlePill, { backgroundColor: themeColor }]}>
              <Text style={styles.titlePillText}>{info.jobTitle}</Text>
            </View>
          ) : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionPill title="Summary" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionPill title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <View style={[styles.datePill, { backgroundColor: `${themeColor}1A` }]}>
                    <Text style={[styles.datePillText, { color: themeColor }]}>
                      {exp.startDate} – {exp.endDate}
                    </Text>
                  </View>
                </View>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                {exp.description
                  ? exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))
                  : null}
              </View>
            ))}
          </View>
          ) : null,

          education: data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <SectionPill title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolText}>{edu.school}</Text>
                </View>
                <Text style={styles.dateText}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionPill title="Skills" />
            <View style={styles.skillPillRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={[styles.skillPill, { borderColor: themeColor }]}>
                  <Text style={[styles.skillPillText, { color: themeColor }]}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionPill title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.card}>
                <Text style={styles.degreeText}>
                  {proj.name}{proj.link ? ` — ${proj.link}` : ''}
                </Text>
                {proj.description ? <Text style={styles.smallText}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <SectionPill title="Certifications" />
            <View style={styles.skillPillRow}>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certPill}>
                  <Text style={styles.certPillText}>
                    {cert.name}{cert.issuer ? ` · ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <SectionPill title="References" />
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}{ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
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
                  <SectionPill title={section.title} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.card}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.smallText}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
            ))
        )}
      </Page>
    </Document>
  );
}
