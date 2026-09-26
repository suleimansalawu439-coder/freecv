import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const NAVY = '#16294D';
const NAVY_LINE = '#2C4370';
const NAVY_SOFT = '#EDF1F8';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    padding: 44,
  },
  masthead: {
    backgroundColor: NAVY,
    padding: 24,
    borderRadius: 4,
    marginBottom: 6,
  },
  mastheadInner: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    opacity: 0.9,
    padding: 14,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 9,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 3.5,
    marginTop: 6,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 7.5,
    color: '#CBD5E1',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 12,
    color: NAVY,
    letterSpacing: 1,
    marginRight: 10,
  },
  sectionRule: {
    flex: 1,
    height: 2,
    backgroundColor: NAVY,
  },
  sectionDiamond: {
    width: 6,
    height: 6,
    backgroundColor: NAVY,
    marginLeft: 8,
  },
  summaryBox: {
    backgroundColor: NAVY_SOFT,
    padding: 12,
  },
  summaryText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    lineHeight: 1.55,
    color: '#334155',
  },
  expItem: {
    marginBottom: 14,
  },
  expTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    color: NAVY,
  },
  dateText: {
    fontSize: 8.5,
    color: NAVY_LINE,
  },
  companyName: {
    fontFamily: 'Times-Bold',
    fontSize: 9,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletMark: {
    width: 12,
    fontSize: 8,
    color: NAVY,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degreeText: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
    color: NAVY,
  },
  schoolItalic: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#475569',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingRight: 12,
  },
  skillDot: {
    width: 5,
    height: 5,
    backgroundColor: NAVY,
    marginRight: 8,
  },
  skillText: {
    fontSize: 9,
    color: '#334155',
  },
  refCard: {
    borderLeftWidth: 2,
    borderLeftColor: NAVY,
    paddingLeft: 10,
    marginBottom: 8,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLine: {
    flex: 1,
    height: 2,
    backgroundColor: NAVY,
  },
  footerDiamond: {
    width: 6,
    height: 6,
    backgroundColor: NAVY,
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
      <View style={styles.sectionDiamond} />
    </View>
  );
}

export default function Navy({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.masthead}>
          <View style={styles.mastheadInner}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
            {contactItems.length > 0 ? (
              <Text style={styles.contactLine}>{contactItems.join('   ·   ')}</Text>
            ) : null}
          </View>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="Profile" />
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Professional Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expTop}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description
                  .split(/\n|\r?\n/)
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletMark}>▸</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        ),

          education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolItalic}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.dateText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ),

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Core Competencies" />
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <View style={styles.skillDot} />
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 8 }}>
                <Text style={styles.degreeText}>
                  {proj.name}
                  {proj.link ? ` (${proj.link})` : ''}
                </Text>
                <Text style={styles.bulletText}>{proj.description}</Text>
              </View>
            ))}
          </View>
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Certifications" />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.eduRow}>
                <Text style={styles.degreeText}>
                  {cert.name}
                  {cert.issuer ? ` · ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.dateText}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="References" />
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.refCard}>
                <Text style={styles.degreeText}>{ref.name}</Text>
                <Text style={styles.schoolItalic}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.bulletText}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHead title={section.title} />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View style={styles.eduRow}>
                      <Text style={styles.degreeText}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.schoolItalic}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.bulletText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <View style={styles.footerDiamond} />
          <View style={styles.footerLine} />
        </View>
      </Page>
    </Document>
  );
}
