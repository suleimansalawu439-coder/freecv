import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionSquare: {
    width: 8,
    height: 8,
    backgroundColor: '#111827',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  checkRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  checkBox: {
    width: 8,
    height: 8,
    borderWidth: 1.2,
    borderColor: '#111827',
    marginTop: 4,
    marginRight: 8,
  },
  checkBody: {
    flex: 1,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 8,
    color: '#4B5563',
  },
  companyText: {
    fontSize: 9.5,
    color: '#374151',
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 12,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  eduLine: {
    fontSize: 9.5,
  },
  eduBold: {
    fontWeight: 'bold',
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '50%',
    marginBottom: 6,
    paddingRight: 16,
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  refCard: {
    width: '48%',
    marginBottom: 6,
    paddingRight: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 8,
    color: '#4B5563',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
});

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={styles.sectionSquare} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.checkRow}>
      <View style={styles.checkBox} />
      <View style={styles.checkBody}>{children}</View>
    </View>
  );
}

export default function Checkpoint({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
              {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
              {contactItems.length > 0 ? (
                <Text style={styles.contactLine}>{contactItems.join('  •  ')}</Text>
              ) : null}

              {data.summary ? (
                <View style={styles.section}>
                  <SectionHeader title="Summary" />
                  <Check><Text style={styles.summaryText}>{data.summary}</Text></Check>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Experience" />
              {data.experience.map((exp) => (
                <Check key={exp.id}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  {exp.company ? <Text style={styles.companyText}>{exp.company}</Text> : null}
                  {exp.description
                    ? exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletMark}>•</Text>
                          <Text style={styles.bulletText}>{line.trim()}</Text>
                        </View>
                      ))
                    : null}
                </Check>
              ))}
            </View>
          ) : null,

          education: data.education && data.education.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Education" />
              {data.education.map((edu) => (
                <Check key={edu.id}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.eduLine}>
                      <Text style={styles.eduBold}>{edu.degree}</Text> — {edu.school}
                    </Text>
                    <Text style={styles.dateText}>{edu.graduationYear}</Text>
                  </View>
                </Check>
              ))}
            </View>
          ) : null,

          skills: data.skills && data.skills.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Skills Checklist" />
              <View style={styles.skillGrid}>
                {data.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillCell}>
                    <Check><Text style={styles.skillText}>{skill.name}</Text></Check>
                  </View>
                ))}
              </View>
            </View>
          ) : null,

          projects: data.showProjects && data.projects && data.projects.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj) => (
                <Check key={proj.id}>
                  <Text style={styles.eduLine}>
                    <Text style={styles.eduBold}>{proj.name}</Text>
                    {proj.link ? ` — ${proj.link}` : ''}
                  </Text>
                  {proj.description ? <Text style={styles.smallText}>{proj.description}</Text> : null}
                </Check>
              ))}
            </View>
          ) : null,

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert) => (
                <Check key={cert.id}>
                  <Text style={styles.eduLine}>
                    <Text style={styles.eduBold}>{cert.name}</Text> — {cert.issuer}
                    {cert.date ? ` · ${cert.date}` : ''}
                  </Text>
                </Check>
              ))}
            </View>
          ) : null,

          references: data.showReferences && data.references && data.references.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="References" />
              <View style={styles.skillGrid}>
                {data.references.map((ref) => (
                  <View key={ref.id} style={styles.refCard}>
                    <Check>
                      <View>
                        <Text style={styles.refName}>{ref.name}</Text>
                        <Text style={styles.refDetail}>
                          {ref.title}{ref.company ? `, ${ref.company}` : ''}
                        </Text>
                        {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                      </View>
                    </Check>
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
                  <Check key={item.id}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.roleTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? <Text style={styles.companyText}>{item.subtitle}</Text> : null}
                    {item.description ? <Text style={styles.smallText}>{item.description}</Text> : null}
                  </Check>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
