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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  nameBlock: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  contactCard: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'column',
  },
  contactItem: {
    fontSize: 9,
    color: '#334155',
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderBox: {
    borderWidth: 1,
    borderColor: '#94A3B8',
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
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
  roleText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 9,
    color: '#64748B',
  },
  companyText: {
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
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 9,
    color: '#334155',
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

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeaderBox}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Warden({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const hasContact = data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location || data.personalInfo.website;

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
          {hasContact ? (
            <View style={styles.contactCard}>
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
          ) : null}
        </View>

        {/* Profile */}
        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Profile" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.headerRow}>
                  <Text style={styles.roleText}>{exp.role}</Text>
                  {exp.startDate || exp.endDate ? (
                    <Text style={styles.dateText}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </Text>
                  ) : null}
                </View>
                {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
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
            <SectionHeader title="Education" />
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

        {/* Skills — outlined pills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Skills" />
            <View style={styles.skillsRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.pill}>
                  <Text style={styles.pillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
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
            <SectionHeader title="Certifications" />
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
            <SectionHeader title="References" />
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
                <SectionHeader title={section.title} />
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
