import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

// Rainmaker — sales metrics-forward resume.
// Bold header with a "track record" strip (the summary as a lead paragraph),
// experience entries with role + company in large bold type and description
// lines given hanging-indent emphasis (metrics live in the user's own bullet
// text — never invented), skills as "Core Competencies" in a 2-col grid.
// Accent: header rule, KPI-style section labels, competency grid markers.

const BULLET_LEAD = /^[•\-*▪◦›→»]/;

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#ffffff',
    color: '#171717',
    fontFamily: 'Helvetica',
  },
  headerRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  name: {
    fontSize: 36,
    fontWeight: 'black',
    letterSpacing: -1,
    color: '#171717',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#404040',
    marginTop: 6,
  },
  headerRule: {
    height: 6,
    marginTop: 24,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  contactItem: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#525252',
  },
  contactLink: {
    fontSize: 9,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  trackRecord: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    paddingVertical: 4,
    marginTop: 24,
  },
  trackLabel: {
    fontSize: 8,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#737373',
    marginBottom: 6,
  },
  trackText: {
    fontSize: 11.5,
    lineHeight: 1.6,
    fontWeight: 'medium',
    color: '#171717',
  },
  body: {
    marginTop: 32,
    flexDirection: 'column',
    gap: 28,
  },
  section: {},
  sectionLabelWrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 9.5,
    fontWeight: 'black',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#ffffff',
  },
  expItem: {
    marginBottom: 20,
  },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 15,
    fontWeight: 'black',
    color: '#171717',
  },
  expDates: {
    fontSize: 9,
    fontWeight: 'black',
  },
  expCompany: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#404040',
    marginTop: 2,
  },
  descLineRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginTop: 4,
  },
  descMarker: {
    fontSize: 10,
    fontWeight: 'black',
    lineHeight: 1.5,
  },
  descLine: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#404040',
    flex: 1,
  },
  compGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  compCell: {
    width: '48%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  compMarker: {
    width: 8,
    height: 8,
    marginTop: 3,
    transform: 'rotate(45deg)',
  },
  compName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#171717',
    flex: 1,
  },
  itemBlock: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 10.5,
    fontWeight: 'black',
    color: '#171717',
  },
  itemSub: {
    fontSize: 9.5,
    color: '#525252',
    marginTop: 2,
  },
  itemLink: {
    fontSize: 9,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 3,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  certName: {
    fontSize: 10.5,
    fontWeight: 'black',
    color: '#171717',
  },
  certIssuer: {
    fontSize: 9.5,
    color: '#525252',
  },
  certDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#525252',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 3,
    paddingLeft: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#171717',
  },
  refMeta: {
    fontSize: 8.5,
    color: '#525252',
  },
  customDate: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#525252',
  },
  customSubtitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#525252',
  },
});

function DescriptionLines({ text, themeColor }: { text: string; themeColor: string }) {
  return (
    <View style={{ marginTop: 4 }}>
      {text.split('\n').map((line, i) => {
        const hasBullet = BULLET_LEAD.test(line.trimStart());
        return (
          <View key={i} style={styles.descLineRow}>
            {!hasBullet && <Text style={[styles.descMarker, { color: themeColor }]}>{'\u25B8'}</Text>}
            <Text style={styles.descLine}>{line}</Text>
          </View>
        );
      })}
    </View>
  );
}

function SectionLabel({ themeColor, children }: { themeColor: string; children: React.ReactNode }) {
  return (
    <View style={[styles.sectionLabelWrap, { backgroundColor: themeColor }]}>
      <Text style={styles.sectionLabel}>{children}</Text>
    </View>
  );
}

export default function Rainmaker({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const { personalInfo } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.headerRow}>
          {personalInfo.profilePicture && (
            <Image src={personalInfo.profilePicture} style={styles.profilePicture} />
          )}
          <View>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            {personalInfo.jobTitle && <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>}
          </View>
        </View>

        <View style={[styles.headerRule, { backgroundColor: themeColor }]} />

        <View style={styles.contactRow}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          {personalInfo.website && (
            <Link src={personalInfo.website} style={[styles.contactLink, { color: themeColor }]}>
              {personalInfo.website}
            </Link>
          )}
        </View>

        {data.summary && (
          <View style={[styles.trackRecord, { borderLeftColor: themeColor }]}>
            <Text style={styles.trackLabel}>Track Record</Text>
            <Text style={styles.trackText}>{data.summary}</Text>
          </View>
        )}
            </>
          ),
          },
        )}

        <View style={styles.body}>
          {orderSections(data, {
            experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <SectionLabel themeColor={themeColor}>Experience</SectionLabel>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expTopRow}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={[styles.expDates, { color: themeColor }]}>
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  {exp.description && (
                    <DescriptionLines text={exp.description} themeColor={themeColor} />
                  )}
                </View>
              ))}
            </View>
          ),

            skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <SectionLabel themeColor={themeColor}>Core Competencies</SectionLabel>
              <View style={styles.compGrid}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.compCell}>
                    <View style={[styles.compMarker, { backgroundColor: themeColor }]} />
                    <Text style={styles.compName}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <SectionLabel themeColor={themeColor}>Projects</SectionLabel>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.itemBlock}>
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  {project.description && <Text style={styles.itemSub}>{project.description}</Text>}
                  {project.link && (
                    <Link src={project.link} style={[styles.itemLink, { color: themeColor }]}>
                      {project.link}
                    </Link>
                  )}
                </View>
              ))}
            </View>
          ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <SectionLabel themeColor={themeColor}>Certifications</SectionLabel>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certRow}>
                  <View>
                    <Text style={styles.certName}>{cert.name}</Text>
                    {cert.issuer && <Text style={styles.certIssuer}>{cert.issuer}</Text>}
                  </View>
                  {cert.date && <Text style={styles.certDate}>{cert.date}</Text>}
                </View>
              ))}
            </View>
          ),

            education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <SectionLabel themeColor={themeColor}>Education</SectionLabel>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.itemBlock}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSub}>
                    {edu.school}
                    {edu.graduationYear ? ` \u00B7 ${edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section}>
              <SectionLabel themeColor={themeColor}>References</SectionLabel>
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    {(ref.title || ref.company) && (
                      <Text style={styles.refMeta}>
                        {ref.title}
                        {ref.title && ref.company ? ' \u2014 ' : ''}
                        {ref.company}
                      </Text>
                    )}
                    {ref.contact && <Text style={styles.refMeta}>{ref.contact}</Text>}
                  </View>
                ))}
              </View>
            </View>
          ),
            },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                  <View key={section.id} style={styles.section}>
                    <SectionLabel themeColor={themeColor}>{section.title}</SectionLabel>
                    {section.items.map((item) => (
                      <View key={item.id} style={styles.itemBlock}>
                        <View style={styles.expTopRow}>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          {item.date && <Text style={styles.customDate}>{item.date}</Text>}
                        </View>
                        {item.subtitle && <Text style={styles.customSubtitle}>{item.subtitle}</Text>}
                        {item.description && (
                          <Text style={[styles.itemSub, { marginTop: 2 }]}>{item.description}</Text>
                        )}
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
