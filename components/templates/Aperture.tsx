import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 60,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  photoRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
    overflow: 'hidden',
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    marginTop: 4,
  },
  contact: {
    fontSize: 9.5,
    color: '#4B5563',
    marginTop: 6,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    marginBottom: 4,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.7,
    color: '#374151',
  },
  expItem: {
    marginBottom: 14,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  company: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  school: {
    fontSize: 10,
    color: '#4B5563',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  projectDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  certText: {
    fontSize: 10,
  },
  certName: {
    fontWeight: 'bold',
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refCard: {
    width: '48%',
    marginBottom: 8,
  },
  refName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
  customTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  customSubtitle: {
    fontSize: 10,
    color: '#4B5563',
  },
  customDesc: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#374151',
    marginTop: 2,
  },
});

export default function Aperture({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ');
  const initial = info.fullName?.charAt(0) || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          {info.profilePicture ? (
            <View style={[styles.photoRing, { borderColor: themeColor }]}>
              <Image src={info.profilePicture} style={styles.photo} />
            </View>
          ) : (
            <View style={[styles.photoRing, { borderColor: themeColor, backgroundColor: themeColor }]}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
          )}
          <View style={styles.headerText}>
            {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
            {info.jobTitle ? <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text> : null}
            {contact ? <Text style={styles.contact}>{contact}</Text> : null}
          </View>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
                </View>
                <Text style={[styles.company, { color: themeColor }]}>{exp.company}</Text>
                {exp.description
                  .split(/\n|\r?\n/)
                  .filter((l) => l.trim())
                  .map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.school}>{edu.school}</Text>
                </View>
                <Text style={styles.dates}>{edu.graduationYear}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.pillsRow}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={[styles.pill, { backgroundColor: themeColor }]}>
                  <Text style={styles.pillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.link ? <Text style={styles.dates}>{proj.link}</Text> : null}
                </View>
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.certText}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
                </Text>
                <Text style={styles.dates}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.refGrid}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.refCard}>
                  <Text style={styles.refName}>{ref.name}</Text>
                  <Text style={styles.refDetail}>
                    {ref.title}
                    {ref.company ? `, ${ref.company}` : ''}
                  </Text>
                  {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.expItem}>
                      <View style={styles.expHeaderRow}>
                        <Text style={styles.customTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dates}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.customSubtitle}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.customDesc}>{item.description}</Text> : null}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
}
