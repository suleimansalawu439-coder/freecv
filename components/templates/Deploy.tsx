import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    marginRight: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 12,
    color: '#4B5563',
    marginRight: 10,
  },
  availBadge: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#15803D',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#6B7280',
    marginLeft: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 8,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 10,
  },
  statusBarItem: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    marginBottom: 14,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    color: '#6B7280',
  },
  companyName: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 10,
  },
  bulletDot: {
    fontSize: 9.5,
    color: '#9CA3AF',
    width: 10,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
    flex: 1,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    fontSize: 8.5,
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduMeta: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  certName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  refItem: {
    marginBottom: 8,
  },
  refName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
});

export default function Deploy({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const header = (title: string) => (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionDot, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );

  const barStyle = [styles.statusBarItem, { borderLeftColor: themeColor }];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.statusDot} />
          <Text style={styles.name}>{info.fullName}</Text>
        </View>
        <View style={styles.titleRow}>
          {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
          <Text style={styles.availBadge}>AVAILABLE FOR OPPORTUNITIES</Text>
        </View>
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  ·  ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            {header('Profile')}
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            {header('Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={barStyle}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  <Text style={styles.dateText}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyName}>{exp.company}</Text>
                {exp.description
                  ? exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))
                  : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            {header('Skills')}
            <View style={styles.pillsWrap}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.pill}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            {header('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={barStyle}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduMeta}>
                  {edu.school}
                  {edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            {header('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={barStyle}>
                <Text style={styles.roleTitle}>{proj.name}</Text>
                {proj.link ? <Text style={styles.dateText}>{proj.link}</Text> : null}
                <Text style={styles.bodyText}>{proj.description}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            {header('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <Text style={styles.certName}>
                  {cert.name}
                  {cert.issuer ? (
                    <Text style={styles.eduMeta}> — {cert.issuer}</Text>
                  ) : null}
                </Text>
                <Text style={styles.dateText}>{cert.date}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.customSections &&
          data.customSections.map((section) => (
            <View key={section.id} style={styles.section}>
              {header(section.title)}
              {section.items.map((item) => (
                <View key={item.id} style={barStyle}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{item.title}</Text>
                    {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                  </View>
                  {item.subtitle ? <Text style={styles.eduMeta}>{item.subtitle}</Text> : null}
                  {item.description ? (
                    <Text style={styles.bodyText}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ))}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            {header('References')}
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.refItem}>
                <Text style={styles.refName}>{ref.name}</Text>
                <Text style={styles.refDetail}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.refDetail}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
