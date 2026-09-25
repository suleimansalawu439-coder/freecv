import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

function tint(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    padding: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  contactCol: {
    alignItems: 'flex-end',
  },
  contactItem: {
    fontSize: 8.5,
    color: '#4B5563',
    marginBottom: 3,
  },
  tile: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 14,
    borderTopWidth: 3,
    marginBottom: 12,
  },
  tileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tileMarker: {
    width: 8,
    height: 8,
    marginRight: 6,
  },
  tileTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
  },
  tileRow: {
    flexDirection: 'row',
  },
  tileLeft: {
    marginRight: 12,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
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
    lineHeight: 1.5,
    color: '#4B5563',
  },
  educationItem: {
    marginBottom: 10,
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
    fontSize: 8.5,
    fontWeight: 'bold',
    marginTop: 2,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  certItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  certIssuer: {
    fontSize: 9,
    color: '#4B5563',
  },
  certDate: {
    fontSize: 8.5,
    fontWeight: 'bold',
    marginTop: 2,
  },
  refItem: {
    marginBottom: 10,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  refDetail: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  refContact: {
    fontSize: 8.5,
    color: '#6B7280',
    marginTop: 2,
  },
  customItem: {
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 10,
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
    marginTop: 3,
    lineHeight: 1.5,
  },
});

function dateRange(startDate?: string, endDate?: string): string | null {
  const parts = [startDate, endDate].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(' \u2014 ') : null;
}

export default function Mosaic({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean) as string[];

  const hasEducation = !!(data.education && data.education.length > 0);
  const hasSkills = !!(data.skills && data.skills.length > 0);
  const hasCerts =
    !!(data.showCertifications && data.certifications && data.certifications.length > 0);
  const hasRefs =
    !!(data.showReferences && data.references && data.references.length > 0);
  const hasProjects =
    !!(data.showProjects && data.projects && data.projects.length > 0);

  const tileAccent = { borderTopColor: themeColor };

  const tileHeader = (title: string) => (
    <View style={styles.tileHeaderRow}>
      <View style={[styles.tileMarker, { backgroundColor: themeColor }]} />
      <Text style={styles.tileTitle}>{title}</Text>
    </View>
  );

  const educationTile = hasEducation ? (
    <View>
      {tileHeader('Education')}
      {data.education.map(edu => (
        <View key={edu.id} style={styles.educationItem}>
          <Text style={styles.degreeText}>{edu.degree}</Text>
          <Text style={styles.schoolText}>{edu.school}</Text>
          {edu.graduationYear ? (
            <Text style={[styles.gradYearText, { color: themeColor }]}>
              {edu.graduationYear}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  ) : null;

  const skillsTile = hasSkills ? (
    <View>
      {tileHeader('Skills')}
      <View style={styles.chipsWrap}>
        {data.skills.map(skill => (
          <View
            key={skill.id}
            style={[styles.chip, { backgroundColor: tint(themeColor, 0.12) }]}
          >
            <Text style={[styles.chipText, { color: themeColor }]}>{skill.name}</Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;

  const certsTile = hasCerts ? (
    <View>
      {tileHeader('Certifications')}
      {data.certifications.map(cert => (
        <View key={cert.id} style={styles.certItem}>
          <Text style={styles.certName}>{cert.name}</Text>
          {cert.issuer ? <Text style={styles.certIssuer}>{cert.issuer}</Text> : null}
          {cert.date ? (
            <Text style={[styles.certDate, { color: themeColor }]}>{cert.date}</Text>
          ) : null}
        </View>
      ))}
    </View>
  ) : null;

  const refsTile = hasRefs ? (
    <View>
      {tileHeader('References')}
      {data.references.map(ref => (
        <View key={ref.id} style={styles.refItem}>
          <Text style={styles.refName}>{ref.name}</Text>
          <Text style={styles.refDetail}>
            {[ref.title, ref.company].filter(Boolean).join(' \u00B7 ')}
          </Text>
          {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
        </View>
      ))}
    </View>
  ) : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Full-width header */}
        <View style={styles.header}>
          <View>
            {data.personalInfo.fullName ? (
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            ) : null}
            {data.personalInfo.jobTitle ? (
              <Text style={[styles.jobTitle, { color: themeColor }]}>
                {data.personalInfo.jobTitle}
              </Text>
            ) : null}
          </View>
          {contact.length > 0 ? (
            <View style={styles.contactCol}>
              {contact.map((c, i) => (
                <Text key={i} style={styles.contactItem}>{c}</Text>
              ))}
            </View>
          ) : null}
        </View>

        {/* Row 1: summary tile, full width */}
        {data.summary ? (
          <View style={[styles.tile, tileAccent]}>
            {tileHeader('Summary')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Row 2: experience tile, full width */}
        {data.experience && data.experience.length > 0 ? (
          <View style={[styles.tile, tileAccent]}>
            {tileHeader('Experience')}
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{exp.role}</Text>
                  {dateRange(exp.startDate, exp.endDate) ? (
                    <Text style={styles.dateText}>{dateRange(exp.startDate, exp.endDate)}</Text>
                  ) : null}
                </View>
                {exp.company ? (
                  <Text style={[styles.companyName, { color: themeColor }]}>{exp.company}</Text>
                ) : null}
                {exp.description ? (
                  <View>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>{'\u2022'}</Text>
                          <Text style={styles.bulletText}>{line.trim()}</Text>
                        </View>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Row 3: education (55%) + skills (45%) */}
        {hasEducation || hasSkills ? (
          hasEducation && hasSkills ? (
            <View style={styles.tileRow}>
              <View style={[styles.tile, tileAccent, styles.tileLeft, { flex: 55 }]}>{educationTile}</View>
              <View style={[styles.tile, tileAccent, { flex: 45 }]}>{skillsTile}</View>
            </View>
          ) : (
            <View style={[styles.tile, tileAccent]}>
              {educationTile}
              {skillsTile}
            </View>
          )
        ) : null}

        {/* Row 4: certifications (50%) + references (50%) */}
        {hasCerts || hasRefs ? (
          hasCerts && hasRefs ? (
            <View style={styles.tileRow}>
              <View style={[styles.tile, tileAccent, styles.tileLeft, { flex: 1 }]}>{certsTile}</View>
              <View style={[styles.tile, tileAccent, { flex: 1 }]}>{refsTile}</View>
            </View>
          ) : (
            <View style={[styles.tile, tileAccent]}>
              {certsTile}
              {refsTile}
            </View>
          )
        ) : null}

        {/* Projects, full width */}
        {hasProjects ? (
          <View style={[styles.tile, tileAccent]}>
            {tileHeader('Projects')}
            {data.projects.map(project => (
              <View key={project.id} style={styles.experienceItem}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.roleTitle}>{project.name}</Text>
                  {project.link ? (
                    <Text style={[styles.dateText, { color: themeColor }]}>
                      {project.link}
                    </Text>
                  ) : null}
                </View>
                {project.description ? (
                  <Text style={styles.summaryText}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Custom sections, full width */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(section =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={[styles.tile, tileAccent]}>
                {tileHeader(section.title)}
                {section.items.map(item => (
                  <View key={item.id} style={styles.customItem}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.customTitle}>{item.title}</Text>
                      {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.customDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null
          )}
      </Page>
    </Document>
  );
}
