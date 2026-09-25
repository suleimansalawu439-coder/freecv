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
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 28,
  },
  nameBlock: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#334155',
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#D1D5DB',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  contactBlock: {
    flexDirection: 'column',
    paddingTop: 4,
  },
  contactItem: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  themeTick: {
    width: 6,
    height: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#334155',
  },
  experienceItem: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  companyText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 9,
    color: '#64748B',
  },
  roleText: {
    fontSize: 9.5,
    color: '#334155',
    marginTop: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: '#64748B',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#334155',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 9,
    color: '#334155',
  },
  gradYearText: {
    fontSize: 9,
    color: '#64748B',
  },
  skillsText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 1.5,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  itemSub: {
    fontSize: 9,
    color: '#334155',
    marginTop: 1,
  },
  itemDesc: {
    fontSize: 9,
    color: '#334155',
    marginTop: 2,
    lineHeight: 1.4,
  },
  itemMeta: {
    fontSize: 9,
    color: '#64748B',
  },
});

function SectionHeader({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.themeTick, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Paragon({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameBlock}>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
            ) : null}
          </View>
          <View style={styles.divider} />
          <View style={styles.contactBlock}>
            {data.personalInfo.email ? (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            ) : null}
            {data.personalInfo.phone ? (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            ) : null}
            {data.personalInfo.location ? (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            ) : null}
            {data.personalInfo.website ? (
              <Link style={styles.contactItem} src={data.personalInfo.website}>
                {data.personalInfo.website}
              </Link>
            ) : null}
          </View>
        </View>

        {/* Profile */}
        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Profile" themeColor={themeColor} />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience — reversed: company first */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Experience" themeColor={themeColor} />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.companyText}>{exp.company}</Text>
                  {exp.startDate || exp.endDate ? (
                    <Text style={styles.dateText}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </Text>
                  ) : null}
                </View>
                {exp.role ? <Text style={styles.roleText}>{exp.role}</Text> : null}
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
            <SectionHeader title="Education" themeColor={themeColor} />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  {edu.graduationYear ? (
                    <Text style={styles.gradYearText}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
                {edu.school ? <Text style={styles.schoolText}>{edu.school}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills — slash separated */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Skills" themeColor={themeColor} />
            <Text style={styles.skillsText}>
              {data.skills.map((s) => s.name).join(' / ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Projects" themeColor={themeColor} />
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
            <SectionHeader title="Certifications" themeColor={themeColor} />
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
            <SectionHeader title="References" themeColor={themeColor} />
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
                <SectionHeader title={section.title} themeColor={themeColor} />
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
