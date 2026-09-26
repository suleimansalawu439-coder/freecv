import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

/** Mix a hex color toward white. weight = fraction of the hex color (0..1). */
function mixTowardWhite(hex: string, weight: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c * weight + 255 * (1 - weight));
  return `#${[mix(r), mix(g), mix(b)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  headerBlock: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  colorStoryRow: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },
  swatchCell: {
    alignItems: 'center',
    marginRight: 28,
  },
  swatchSquare: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginBottom: 6,
  },
  swatchLabel: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contactRow: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: 'medium',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionSwatch: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 9,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 14,
  },
  roleDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginTop: 2,
  },
  bulletList: {
    marginTop: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#4B5563',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projectLink: {
    fontSize: 8.5,
    fontWeight: 'medium',
  },
  projectDescription: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.45,
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  schoolText: {
    fontSize: 9,
    color: '#4B5563',
  },
  gradYearText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginTop: 1,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    paddingLeft: 9,
    marginRight: 8,
    marginBottom: 8,
  },
  skillSquare: {
    width: 8,
    height: 8,
    borderRadius: 2,
    marginRight: 7,
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  certRow: {
    marginBottom: 5,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  certMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 8,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refTitle: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 2,
  },
  customItem: {
    marginBottom: 8,
  },
  customHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  customSubtitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4B5563',
  },
  customDescription: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
    lineHeight: 1.45,
  },
});

const SWATCHES = [
  { label: 'Primary', weight: 1 },
  { label: 'Soft', weight: 0.55 },
  { label: 'Mist', weight: 0.25 },
];

export default function Palette({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const chipTint = mixTowardWhite(themeColor, 0.14);
  const { personalInfo, summary, experience, education, skills } = data;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(
    Boolean
  ) as string[];

  const sectionHead = (title: string) => (
    <View style={styles.sectionHeadRow}>
      <View style={[styles.sectionSwatch, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        {/* Header */}
        <View style={styles.headerBlock}>
          {personalInfo.fullName ? <Text style={styles.name}>{personalInfo.fullName}</Text> : null}
          {personalInfo.jobTitle ? (
            <Text style={[styles.jobTitle, { color: themeColor }]}>{personalInfo.jobTitle}</Text>
          ) : null}
          <View style={styles.colorStoryRow}>
            {SWATCHES.map((sw) => (
              <View key={sw.label} style={styles.swatchCell}>
                <View
                  style={[styles.swatchSquare, { backgroundColor: mixTowardWhite(themeColor, sw.weight) }]}
                />
                <Text style={styles.swatchLabel}>{sw.label}</Text>
              </View>
            ))}
          </View>
          {contacts.length > 0 && <Text style={styles.contactRow}>{contacts.join('  •  ')}</Text>}
        </View>

        {summary ? (
          <View style={styles.section}>
            {sectionHead('Profile')}
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}
            </>
          ),

          // Experience
          experience: experience && experience.length > 0 && (
          <View style={styles.section}>
            {sectionHead('Experience')}
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.roleDateRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={[styles.companyText, { color: themeColor }]}>{exp.company}</Text>
                {exp.description ? (
                  <View style={styles.bulletList}>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
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

        // Projects
        projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            {sectionHead('Projects')}
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <View style={styles.projectHeaderRow}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  {project.link ? (
                    <Text style={[styles.projectLink, { color: themeColor }]}>{project.link}</Text>
                  ) : null}
                </View>
                {project.description ? (
                  <Text style={styles.projectDescription}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ),

        // Education
        education: education && education.length > 0 && (
          <View style={styles.section}>
            {sectionHead('Education')}
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>{edu.school}</Text>
                {edu.graduationYear ? <Text style={styles.gradYearText}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        ),

        // Skills
        skills: skills && skills.length > 0 && (
          <View style={styles.section}>
            {sectionHead('Skills')}
            <View style={styles.skillsRow}>
              {skills.map((skill) => (
                <View key={skill.id} style={[styles.skillChip, { backgroundColor: chipTint }]}>
                  <View style={[styles.skillSquare, { backgroundColor: themeColor }]} />
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ),

        // Certifications
        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            {sectionHead('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.certName}>
                  {cert.name}
                  {(cert.issuer || cert.date) && (
                    <Text style={styles.certMeta}>
                      {' — '}
                      {cert.issuer}
                      {cert.issuer && cert.date ? ', ' : ''}
                      {cert.date}
                    </Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        ),

        // References
        references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section} wrap={false}>
            {sectionHead('References')}
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={[styles.refCard, { borderLeftColor: themeColor }]}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refTitle}>
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </Text>
                  {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
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
                {sectionHead(section.title)}
                {section.items.map((item) => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.customHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
