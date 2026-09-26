import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#ffffff',
    color: '#171717',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 1.8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    lineHeight: 1.8,
    color: '#404040',
  },
  contact: {
    fontSize: 11,
    color: '#525252',
    marginTop: 10,
    lineHeight: 1.8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitleContainer: {
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginBottom: 20,
  },
  sectionTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 1.8,
  },
  body: {
    fontSize: 12.5,
    lineHeight: 1.8,
    color: '#262626',
  },
  item: {
    marginBottom: 22,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 1.8,
    color: '#171717',
  },
  itemSub: {
    fontSize: 12.5,
    fontWeight: 'bold',
    lineHeight: 1.8,
    color: '#404040',
  },
  itemMeta: {
    fontSize: 11,
    lineHeight: 1.8,
    color: '#737373',
  },
  itemDesc: {
    fontSize: 12.5,
    lineHeight: 1.8,
    color: '#262626',
    marginTop: 10,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    fontSize: 11,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    lineHeight: 1.8,
  },
});

export default function Polyglot({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const pi = data.personalInfo;
  const contactLine = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.header}>
          <Text style={[styles.name, { color: themeColor }]}>{pi.fullName}</Text>
          {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
          {contactLine ? <Text style={styles.contact}>{contactLine}</Text> : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>Summary</Text>
            </View>
            <Text style={styles.body}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          // Experience
          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>Work Experience</Text>
            </View>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.role}</Text>
                <Text style={styles.itemSub}>{exp.company}</Text>
                {(exp.startDate || exp.endDate) ? (
                  <Text style={styles.itemMeta}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </Text>
                ) : null}
                {exp.description ? <Text style={styles.itemDesc}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ),

        // Certifications
        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>Certifications &amp; Licenses</Text>
            </View>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 14 }}>
                <Text style={styles.itemTitle}>{cert.name}</Text>
                {cert.issuer ? <Text style={styles.itemSub}>{cert.issuer}</Text> : null}
                {cert.date ? <Text style={styles.itemMeta}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ),

        // Education
        education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>Education</Text>
            </View>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 18 }}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemSub}>{edu.school}</Text>
                {edu.graduationYear ? <Text style={styles.itemMeta}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
        ),

        // Skills
        skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>Skills</Text>
            </View>
            <View style={styles.skillTags}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillTag}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        ),

        // Projects
        projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>Projects</Text>
            </View>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.item}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.link ? <Text style={[styles.itemSub, { color: themeColor }]}>{proj.link}</Text> : null}
                {proj.description ? <Text style={styles.itemDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ),

        // References
        references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
              <Text style={[styles.sectionTitleText, { color: themeColor }]}>References</Text>
            </View>
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 18 }}>
                <Text style={styles.itemTitle}>{ref.name}</Text>
                <Text style={styles.itemSub}>
                  {ref.title}
                  {ref.title && ref.company ? ' @ ' : ''}
                  {ref.company}
                </Text>
                {ref.contact ? <Text style={styles.itemMeta}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <View style={[styles.sectionTitleContainer, { borderBottomColor: themeColor }]}>
                  <Text style={[styles.sectionTitleText, { color: themeColor }]}>{section.title}</Text>
                </View>
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 18 }}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle ? <Text style={styles.itemSub}>{item.subtitle}</Text> : null}
                    {item.date ? <Text style={styles.itemMeta}>{item.date}</Text> : null}
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
