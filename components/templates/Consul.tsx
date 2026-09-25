import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'column',
    marginBottom: 28,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111111',
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  baselineRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111111',
  },
  contactBit: {
    fontSize: 10,
    color: '#6B7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#111111',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#1F2937',
  },
  experienceItem: {
    marginBottom: 12,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111111',
  },
  companyText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#6B7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#1F2937',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111111',
  },
  schoolText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  gradYearText: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '33.33%',
    marginBottom: 5,
    paddingRight: 8,
  },
  skillText: {
    fontSize: 9.5,
    color: '#1F2937',
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111111',
  },
  itemSub: {
    fontSize: 9,
    color: '#1F2937',
    marginTop: 1,
  },
  itemDesc: {
    fontSize: 9,
    color: '#1F2937',
    marginTop: 2,
    lineHeight: 1.4,
  },
  itemMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
});

function BaselineContacts({ jobTitle, bits }: { jobTitle?: string; bits: string[] }) {
  const items: Array<{ text: string; bold?: boolean }> = [];
  if (jobTitle) items.push({ text: jobTitle, bold: true });
  bits.forEach((b) => items.push({ text: b }));
  return (
    <View style={styles.baselineRow}>
      {items.map((it, i) => (
        <Text
          key={i}
          style={it.bold && i === 0 ? styles.jobTitle : styles.contactBit}
        >
          {i > 0 ? ' · ' : ''}{it.text}
        </Text>
      ))}
    </View>
  );
}

export default function Consul({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contactBits = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.website].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.fullName ? (
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          ) : null}
          {data.personalInfo.jobTitle || contactBits.length > 0 ? (
            <BaselineContacts jobTitle={data.personalInfo.jobTitle} bits={contactBits} />
          ) : null}
        </View>

        {/* Profile */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience — role left, company right; dates row 2 */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.row1}>
                  <Text style={styles.roleText}>{exp.role}</Text>
                  {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                </View>
                {exp.startDate || exp.endDate ? (
                  <Text style={styles.dateText}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </Text>
                ) : null}
                {exp.description ? (
                  <View>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line.trim()}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.row1}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
                </View>
                {edu.graduationYear ? (
                  <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills — 3 column grid */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.educationItem}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.description ? <Text style={styles.itemDesc}>{proj.description}</Text> : null}
                {proj.link ? <Text style={styles.itemMeta}>{proj.link}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.educationItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  {cert.date ? <Text style={styles.itemMeta}>{cert.date}</Text> : null}
                </View>
                {cert.issuer ? <Text style={styles.itemSub}>{cert.issuer}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.educationItem}>
                <Text style={styles.itemTitle}>{ref.name}</Text>
                <Text style={styles.itemSub}>
                  {[ref.title, ref.company].filter(Boolean).join(' · ')}
                </Text>
                {ref.contact ? <Text style={styles.itemMeta}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Custom sections */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.educationItem}>
                    <View style={styles.headerRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.itemMeta}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
                  </View>
                ))}
              </View>
            ) : null
          )}
      </Page>
    </Document>
  );
}
