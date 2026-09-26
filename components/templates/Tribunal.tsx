import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections, getOrderedSectionIds } from '@/lib/template-sections';

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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  jobTitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  sectionNum: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    fontWeight: 'bold',
    color: '#000000',
  },
  dateText: {
    fontSize: 8.5,
    fontFamily: 'Courier',
    color: '#6B7280',
  },
  companyText: {
    fontSize: 9.5,
    color: '#374151',
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
    color: '#9CA3AF',
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
    fontWeight: 'bold',
    color: '#000000',
  },
  schoolText: {
    fontSize: 9,
    color: '#374151',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 9.5,
    color: '#000000',
  },
  dotLeader: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#9CA3AF',
    borderBottomStyle: 'dotted',
    marginHorizontal: 10,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemSub: {
    fontSize: 9,
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
  monoMeta: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#6B7280',
  },
});

export default function Tribunal({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;

  // Section numbers ("01", "02", …) follow the rendered display order, so they
  // stay consecutive when the user reorders or hides sections. The identity
  // header itself is unnumbered; only the Profile (summary) section takes a
  // number, mirroring the original behavior.
  const sectionNums: Record<string, string> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal': return !!data.summary;
        case 'experience': return data.experience && data.experience.length > 0;
        case 'education': return data.education && data.education.length > 0;
        case 'skills': return data.skills && data.skills.length > 0;
        case 'projects': return data.showProjects && data.projects && data.projects.length > 0;
        case 'certifications': return data.showCertifications && data.certifications && data.certifications.length > 0;
        case 'references': return data.showReferences && data.references && data.references.length > 0;
        default: return false;
      }
    });
    const map: Record<string, string> = {};
    rendered.forEach((id, n) => { map[id] = String(n + 1).padStart(2, '0'); });
    return map;
  })();
  const customBase = Object.keys(sectionNums).length;

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
            <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
          ) : null}
          {contactBits.length > 0 ? (
            <View style={styles.contactRow}>
              {contactBits.map((bit, i) => (
                <Text key={i} style={styles.contactItem}>{bit}</Text>
              ))}
            </View>
          ) : null}
        </View>

        {/* 01 Profile */}
        {data.summary ? (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.personal}</Text>
              <Text style={styles.sectionTitle}>Profile</Text>
            </View>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.experience}</Text>
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>
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

        education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.education}</Text>
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degreeText}>{edu.degree}</Text>
                <Text style={styles.schoolText}>
                  {[edu.school, edu.graduationYear].filter(Boolean).join(' · ')}
                </Text>
              </View>
            ))}
          </View>
        ),

        skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.skills}</Text>
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            {data.skills.map((skill) => (
              <View key={skill.id} style={styles.skillRow}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.dotLeader} />
              </View>
            ))}
          </View>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.projects}</Text>
              <Text style={styles.sectionTitle}>Projects</Text>
            </View>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.educationItem}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.description ? <Text style={styles.itemDesc}>{proj.description}</Text> : null}
                {proj.link ? <Text style={styles.monoMeta}>{proj.link}</Text> : null}
              </View>
            ))}
          </View>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.certifications}</Text>
              <Text style={styles.sectionTitle}>Certifications</Text>
            </View>
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

        references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionNum}>{sectionNums.references}</Text>
              <Text style={styles.sectionTitle}>References</Text>
            </View>
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
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section, k) => (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionNum}>{String(customBase + k + 1).padStart(2, '0')}</Text>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              {section.items.map((item) => (
                <View key={item.id} style={styles.educationItem}>
                  <View style={styles.headerRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
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
