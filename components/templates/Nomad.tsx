import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const REMOTE_HINT = /remote|distributed|wfh|work from home|telecommut|work-from-anywhere/i;

const styles = StyleSheet.create({
  page: {
    padding: 56,
    backgroundColor: '#ffffff',
    color: '#1e293b',
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 14,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'center',
  },
  remoteLine: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginTop: 6,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
    gap: 10,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#64748b',
  },
  headerRule: {
    width: 48,
    height: 3,
    marginTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.9,
    textAlign: 'center',
    color: '#334155',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tag: {
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  expItem: {
    marginBottom: 22,
    alignItems: 'center',
  },
  expRole: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 2,
  },
  expMeta: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748b',
    textAlign: 'center',
  },
  expDesc: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.6,
    textAlign: 'left',
    marginTop: 8,
  },
  expRule: {
    width: 24,
    height: 1,
    marginTop: 20,
    opacity: 0.4,
  },
  centeredBlock: {
    marginBottom: 12,
    alignItems: 'center',
  },
  blockTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  blockLink: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    marginTop: 2,
  },
  blockMeta: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
  },
  blockDesc: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.6,
    textAlign: 'center',
    marginTop: 4,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  refCard: {
    width: '48%',
    alignItems: 'center',
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  refTitle: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8,
    color: '#94a3b8',
    textAlign: 'center',
  },
  customItem: {
    marginBottom: 12,
    alignItems: 'center',
  },
  customTitleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 8,
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  customDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  customSubtitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#64748b',
    textAlign: 'center',
  },
  customDesc: {
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.5,
    textAlign: 'center',
    marginTop: 3,
  },
});

export default function Nomad({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const isRemote =
    REMOTE_HINT.test(data.personalInfo.location || '') || REMOTE_HINT.test(data.summary || '');
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.profilePicture ? (
            <Image src={data.personalInfo.profilePicture} style={styles.profilePicture} />
          ) : null}
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.jobTitle ? <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text> : null}
          {isRemote ? <Text style={[styles.remoteLine, { color: themeColor }]}>Remote</Text> : null}
          {contactItems.length > 0 ? (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.contactItem}>{item}</Text>
              ))}
            </View>
          ) : null}
          <View style={[styles.headerRule, { backgroundColor: themeColor }]} />
        </View>

        {/* Profile */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Profile</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

        // Remote Stack
          skills: data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Remote Stack</Text>
            <View style={styles.tagContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={[styles.tag, { color: themeColor }]}>{skill.name}</Text>
              ))}
            </View>
          </View>
        ) : null,

        // Experience
          experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            <View>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expMeta}>
                    {exp.company}{(exp.startDate || exp.endDate) ? ` • ${exp.startDate}${exp.startDate && exp.endDate ? ' — ' : ''}${exp.endDate}` : ''}
                  </Text>
                  {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                  <View style={[styles.expRule, { backgroundColor: themeColor }]} />
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // Projects
          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
            <View>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.centeredBlock}>
                  <Text style={styles.blockTitle}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={[styles.blockLink, { color: themeColor }]}>{proj.link}</Link>
                  ) : null}
                  {proj.description ? <Text style={styles.blockDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // Education
          education: data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            <View>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.centeredBlock}>
                  <Text style={styles.blockTitle}>{edu.degree}</Text>
                  <Text style={styles.blockMeta}>{edu.school}</Text>
                  {edu.graduationYear ? <Text style={[styles.blockMeta, { fontWeight: 'bold' }]}>{edu.graduationYear}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // Certifications
          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Certifications</Text>
            <View>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.centeredBlock}>
                  <Text style={styles.blockTitle}>{cert.name}</Text>
                  <Text style={styles.blockMeta}>
                    {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null,

        // References
          references: data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  {(ref.title || ref.company) ? (
                    <Text style={styles.refTitle}>{ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}</Text>
                  ) : null}
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
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
              <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
              <View>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customTitleRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.customDate}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
            ))
        )}
      </Page>
    </Document>
  );
}
