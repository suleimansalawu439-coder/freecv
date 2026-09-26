import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const STONE = '#57534a';
const STONE_LIGHT = '#8a857a';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    color: STONE,
    paddingTop: 52,
    paddingBottom: 48,
    paddingHorizontal: 60,
  },
  eyebrow: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 5,
    textAlign: 'center',
    color: STONE_LIGHT,
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 1.3,
  },
  jobTitle: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
    color: STONE_LIGHT,
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    textAlign: 'center',
    color: STONE_LIGHT,
    marginBottom: 32,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ornamentLine: {
    width: 72,
    height: 1,
    backgroundColor: STONE_LIGHT,
  },
  ornamentDiamond: {
    width: 5,
    height: 5,
    backgroundColor: STONE_LIGHT,
    marginHorizontal: 8,
    transform: 'rotate(45deg)',
  },
  centeredBlock: {
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    textAlign: 'center',
    marginBottom: 4,
  },
  roleMeta: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    color: STONE_LIGHT,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 3,
    paddingHorizontal: 30,
  },
  bulletMark: {
    width: 12,
    fontSize: 7,
    color: STONE_LIGHT,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  experienceItem: {
    marginBottom: 14,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    textAlign: 'center',
    marginBottom: 3,
  },
  eduMeta: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    color: STONE_LIGHT,
    marginBottom: 10,
  },
  skillsText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    textAlign: 'center',
    lineHeight: 2,
  },
  bodyCenter: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    textAlign: 'center',
    marginBottom: 4,
  },
  certText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    textAlign: 'center',
    marginBottom: 6,
  },
  certName: {
    fontWeight: 'bold',
  },
  certMeta: {
    color: STONE_LIGHT,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    textAlign: 'center',
    marginBottom: 2,
  },
  refDetail: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    color: STONE_LIGHT,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.ornamentRow}>
        <View style={styles.ornamentLine} />
        <View style={styles.ornamentDiamond} />
        <View style={styles.ornamentLine} />
      </View>
    </View>
  );
}

export default function Inscription({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Curriculum Vitae</Text>
        {orderSections(data, {
          personal: (
            <>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}

        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}

        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('   ·   ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Profile" />
            <Text style={styles.bodyCenter}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                <Text style={styles.roleMeta}>
                  {exp.company}
                  {exp.startDate || exp.endDate ? ` · ${exp.startDate} – ${exp.endDate}` : ''}
                </Text>
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
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduMeta}>
                  {edu.school}{edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null,

          skills: data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Skills" />
            <Text style={styles.skillsText}>
              {data.skills.map((s) => s.name).join('   ·   ')}
            </Text>
          </View>
        ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.description ? <Text style={styles.bodyCenter}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={styles.certText}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certMeta}>
                  {' '}— {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                </Text>
              </Text>
            ))}
          </View>
        ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="References" />
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
                  <SectionHeader title={section.title} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.experienceItem}>
                      <Text style={styles.projectName}>{item.title}</Text>
                      {item.subtitle ? <Text style={styles.roleMeta}>{item.subtitle}</Text> : null}
                      {item.date ? <Text style={styles.roleMeta}>{item.date}</Text> : null}
                      {item.description ? <Text style={styles.bodyCenter}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
            ))
        )}
      </Page>
    </Document>
  );
}
