import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

// Fixed warm identity — the theme color is intentionally not used here.
const ACCENT = '#ea580c';
const NAME_COLOR = '#7c2d12';
const MUTED = '#9a3412';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 48,
  },
  content: {
    flexDirection: 'column',
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NAME_COLOR,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 9,
    color: MUTED,
    marginRight: 16,
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 4,
  },
  sectionBar: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: ACCENT,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
  },
  educationCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  educationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  degreeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  yearText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: ACCENT,
  },
  schoolText: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 3,
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
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: ACCENT,
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
    width: 10,
    fontSize: 7,
    color: ACCENT,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#7C2D12',
  },
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  certDetail: {
    fontSize: 9,
    color: '#6B7280',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 9,
    fontWeight: 'bold',
    color: ACCENT,
    textDecoration: 'none',
  },
  projectDesc: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 3,
    lineHeight: 1.45,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 2,
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6B7280',
  },
  customDate: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: ACCENT,
  },
  customDescription: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 3,
    lineHeight: 1.45,
  },
});

function WarmSectionHeader({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBar} />
    </View>
  );
}

export default function Pedagogue({ data }: { data: ResumeData }) {
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
              <View style={styles.contactRow}>
                {contactItems.map((item, i) => (
                  <Text key={i} style={styles.contactItem}>{item}</Text>
                ))}
              </View>
            ) : null}
          </View>

          {/* Summary */}
          {data.summary ? (
            <View style={styles.section}>
              <WarmSectionHeader title="About me" />
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          ) : null}
            </>
          ),

          // Education — given prominence
          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <WarmSectionHeader title="Education" />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationCard}>
                  <View style={styles.educationRow}>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    {edu.graduationYear ? (
                      <Text style={styles.yearText}>{edu.graduationYear}</Text>
                    ) : null}
                  </View>
                  {edu.school ? (
                    <Text style={styles.schoolText}>{edu.school}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          // Experience
          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <WarmSectionHeader title="Experience" />
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
          ),

          // Skills
          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <WarmSectionHeader title="Skills" />
              <View style={styles.skillsRow}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ),

          // Certifications
          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <WarmSectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {(cert.issuer || cert.date) ? (
                    <Text style={styles.certDetail}>
                      {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          // Projects
          projects: data.showProjects && data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <WarmSectionHeader title="Projects" />
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={proj.link} style={styles.projectLink}>
                      {proj.link}
                    </Link>
                  ) : null}
                  {proj.description ? (
                    <Text style={styles.projectDesc}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ),

          // References
          references: data.showReferences && data.references && data.references.length > 0 && (
            <View style={styles.section} wrap={false}>
              <WarmSectionHeader title="References" />
              <View style={styles.refGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Text style={styles.refName}>{ref.name}</Text>
                    {(ref.title || ref.company) ? (
                      <Text style={styles.refTitle}>
                        {ref.title}{ref.title && ref.company ? ' • ' : ''}{ref.company}
                      </Text>
                    ) : null}
                    {ref.contact ? (
                      <Text style={styles.refContact}>{ref.contact}</Text>
                    ) : null}
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
                <WarmSectionHeader title={section.title} />
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
                        <Text style={styles.customDate}>{item.date}</Text>
                      ) : null}
                    </View>
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
                    ) : null}
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
