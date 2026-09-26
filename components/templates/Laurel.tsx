import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';
const FOREST = '#2F4F3E';

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 28,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ruleLine: {
    width: 64,
    height: 1,
    backgroundColor: FOREST,
  },
  jobTitle: {
    fontSize: 12,
    fontStyle: 'italic',
    marginHorizontal: 14,
  },
  contactLine: {
    fontSize: 9,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: FOREST,
    textAlign: 'center',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
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
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 9,
    color: '#6B7280',
  },
  companyText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: FOREST,
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
    color: FOREST,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeText: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  schoolLine: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#374151',
  },
  skillsText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  itemTitle: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
    color: '#1F2937',
  },
  itemSub: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#374151',
    marginTop: 1,
  },
  itemDesc: {
    fontSize: 9,
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.4,
  },
  itemMeta: {
    fontSize: 9,
    color: '#6B7280',
  },
});

export default function Laurel({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contactBits = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {/* Header */}
              <View style={styles.header}>
                {data.personalInfo.fullName ? (
                  <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                ) : null}
                {data.personalInfo.jobTitle ? (
                  <View style={styles.titleRow}>
                    <View style={styles.ruleLine} />
                    <Text style={[styles.jobTitle, { color: themeColor }]}>{data.personalInfo.jobTitle}</Text>
                    <View style={styles.ruleLine} />
                  </View>
                ) : null}
                {contactBits.length > 0 ? (
                  <Text style={styles.contactLine}>{contactBits.join(' · ')}</Text>
                ) : null}
              </View>
              //Profile
                      {data.summary ? (
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Profile</Text>
                          <Text style={styles.summaryText}>{data.summary}</Text>
                        </View>
                      ) : null}
            </>
          ),

          //Experience
          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
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
          ),

          //Education
          education: data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degreeText}>{edu.degree}</Text>
                  <Text style={styles.schoolLine}>
                    {[edu.school, edu.graduationYear].filter(Boolean).join(' · ')}
                  </Text>
                </View>
              ))}
            </View>
          ),

          //Skills — centered, comma separated, italic
          skills: data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skillsText}>
                {data.skills.map((s) => s.name).join(', ')}
              </Text>
            </View>
          ),

          //Projects
          projects: data.showProjects && data.projects && data.projects.length > 0 && (
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
          ),

          //Certifications
          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.educationItem}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  <Text style={styles.itemSub}>
                    {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                  </Text>
                </View>
              ))}
            </View>
          ),

          //References
          references: data.showReferences && data.references && data.references.length > 0 && (
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
          ),
        },
          //Custom sections
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
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
            ))
        )}
      </Page>
    </Document>
  );
}
