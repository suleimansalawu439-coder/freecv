import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#ffffff',
    color: '#171717',
    fontFamily: 'Helvetica',
  },
  photoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 20,
  },
  photo: {
    width: 104,
    height: 104,
    borderRadius: 12,
    objectFit: 'cover',
  },
  centeredHeader: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Times-Roman',
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    color: '#525252',
    marginTop: 8,
  },
  centeredContact: {
    fontSize: 9,
    color: '#737373',
    marginTop: 10,
    lineHeight: 1.6,
  },
  divider: {
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  columns: {
    flexDirection: 'row',
    gap: 28,
  },
  mainCol: {
    width: '66%',
    flexDirection: 'column',
    gap: 18,
  },
  railCol: {
    width: '34%',
    flexDirection: 'column',
    gap: 18,
  },
  section: {},
  sectionTitleContainer: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.8,
    color: '#404040',
  },
  expItem: {
    marginBottom: 16,
  },
  expRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expRole: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  expDates: {
    fontSize: 8.5,
    color: '#737373',
  },
  expCompany: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#525252',
    marginTop: 3,
  },
  expDesc: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: '#404040',
    marginTop: 5,
  },
  contactItem: {
    fontSize: 9.5,
    color: '#404040',
    marginBottom: 5,
    lineHeight: 1.5,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  skillDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 4,
    marginRight: 7,
  },
  skillText: {
    fontSize: 9.5,
    color: '#404040',
    lineHeight: 1.5,
  },
  railItemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#171717',
  },
  railItemSub: {
    fontSize: 9,
    color: '#525252',
    marginTop: 2,
  },
  railItemMeta: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#a3a3a3',
    marginTop: 3,
  },
  railItem: {
    marginBottom: 12,
  },
  projLink: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  refCard: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 12,
  },
  fullSection: {
    marginTop: 20,
  },
});

export default function Sovereign({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const pi = data.personalInfo;
  const hasPhoto = Boolean(pi.profilePicture);
  const contactLine = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {hasPhoto ? (
          <View style={styles.photoHeader}>
            <Image src={pi.profilePicture as string} style={styles.photo} />
            <View>
              <Text style={[styles.name, { color: themeColor }]}>{pi.fullName}</Text>
              {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
            </View>
          </View>
        ) : (
          <View style={styles.centeredHeader}>
            <Text style={[styles.name, { color: themeColor }]}>{pi.fullName}</Text>
            {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
            {contactLine ? <Text style={styles.centeredContact}>{contactLine}</Text> : null}
          </View>
        )}

        <View style={[styles.divider, { borderBottomColor: themeColor }]} />

        <View style={styles.columns}>
          {/* Main column */}
          <View style={styles.mainCol}>
            {data.summary ? (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Executive Summary</Text>
                </View>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            ) : null}

            {data.experience && data.experience.length > 0 && (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Professional Experience</Text>
                </View>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <View style={styles.expRow}>
                      <Text style={styles.expRole}>{exp.role}</Text>
                      <Text style={styles.expDates}>
                        {exp.startDate}
                        {exp.startDate && exp.endDate ? ' – ' : ''}
                        {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {data.showProjects && data.projects && data.projects.length > 0 && (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Key Engagements</Text>
                </View>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={{ marginBottom: 14 }}>
                    <Text style={styles.expRole}>{proj.name}</Text>
                    {proj.link ? <Text style={[styles.projLink, { color: themeColor }]}>{proj.link}</Text> : null}
                    {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {data.showReferences && data.references && data.references.length > 0 && (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>References</Text>
                </View>
                {data.references.map((ref) => (
                  <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                    <Text style={styles.railItemTitle}>{ref.name}</Text>
                    <Text style={styles.railItemSub}>
                      {ref.title}
                      {ref.title && ref.company ? ' @ ' : ''}
                      {ref.company}
                    </Text>
                    {ref.contact ? <Text style={styles.railItemSub}>{ref.contact}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Rail */}
          <View style={styles.railCol}>
            {hasPhoto ? (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Contact</Text>
                </View>
                {pi.email ? <Text style={styles.contactItem}>{pi.email}</Text> : null}
                {pi.phone ? <Text style={styles.contactItem}>{pi.phone}</Text> : null}
                {pi.location ? <Text style={styles.contactItem}>{pi.location}</Text> : null}
                {pi.website ? <Text style={styles.contactItem}>{pi.website}</Text> : null}
              </View>
            ) : null}

            {data.skills && data.skills.length > 0 && (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Capabilities</Text>
                </View>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillRow}>
                    <View style={[styles.skillDot, { backgroundColor: themeColor }]} />
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Education</Text>
                </View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.railItem}>
                    <Text style={styles.railItemTitle}>{edu.degree}</Text>
                    <Text style={styles.railItemSub}>{edu.school}</Text>
                    {edu.graduationYear ? <Text style={styles.railItemMeta}>{edu.graduationYear}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <View style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>Certifications</Text>
                </View>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.railItem}>
                    <Text style={styles.railItemTitle}>{cert.name}</Text>
                    {cert.issuer ? <Text style={styles.railItemSub}>{cert.issuer}</Text> : null}
                    {cert.date ? <Text style={styles.railItemMeta}>{cert.date}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id} style={styles.fullSection}>
                  <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                    <Text style={[styles.sectionTitleText, { color: themeColor }]}>{section.title}</Text>
                  </View>
                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 12 }}>
                      <View style={styles.expRow}>
                        <Text style={styles.expRole}>{item.title}</Text>
                        {item.date ? <Text style={styles.expDates}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.railItemSub}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.expDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
