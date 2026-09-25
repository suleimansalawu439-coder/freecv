import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#111827',
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  dossierLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: '#6B7280',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fieldGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  fieldCell: {
    width: '50%',
    marginBottom: 3,
    paddingRight: 16,
  },
  fieldLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  fieldValue: {
    fontSize: 8.5,
    color: '#374151',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeaderWrap: {
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 6,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  inlineLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inlineValue: {
    fontSize: 9,
  },
  inlineValueBold: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  dutiesLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 10,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCell: {
    width: '50%',
    marginBottom: 3,
    paddingRight: 16,
  },
  skillIndex: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#6B7280',
  },
  skillName: {
    fontSize: 9,
  },
  smallText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
});

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.fieldCell}>
      <Text>
        <Text style={styles.fieldLabel}>{label}: </Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeaderWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function Protocol({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.dossierLabel}>Candidate Dossier</Text>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? <Text style={styles.jobTitle}>{info.jobTitle}</Text> : null}
        <View style={styles.fieldGrid}>
          <Field label="Email" value={info.email} />
          <Field label="Phone" value={info.phone} />
          <Field label="Location" value={info.location} />
          <Field label="Website" value={info.website} />
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <SectionHeader title="Summary" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience && data.experience.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.fieldGrid}>
                  <View style={styles.fieldCell}>
                    <Text>
                      <Text style={styles.inlineLabel}>Role: </Text>
                      <Text style={styles.inlineValueBold}>{exp.role}</Text>
                    </Text>
                  </View>
                  <View style={styles.fieldCell}>
                    <Text>
                      <Text style={styles.inlineLabel}>Tenure: </Text>
                      <Text style={styles.inlineValue}>{exp.startDate} – {exp.endDate}</Text>
                    </Text>
                  </View>
                </View>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={styles.inlineLabel}>Employer: </Text>
                  <Text style={styles.inlineValue}>{exp.company}</Text>
                </Text>
                {exp.description ? (
                  <View>
                    <Text style={styles.dutiesLabel}>Duties & Achievements:</Text>
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletMark}>•</Text>
                        <Text style={styles.bulletText}>{line.trim()}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.education && data.education.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={styles.inlineLabel}>Degree: </Text>
                  <Text style={styles.inlineValueBold}>{edu.degree}</Text>
                </Text>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={styles.inlineLabel}>Institution: </Text>
                  <Text style={styles.inlineValue}>{edu.school}</Text>
                </Text>
                {edu.graduationYear ? (
                  <Text>
                    <Text style={styles.inlineLabel}>Year: </Text>
                    <Text style={styles.inlineValue}>{edu.graduationYear}</Text>
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Skills Inventory" />
            <View style={styles.skillGrid}>
              {data.skills.map((skill, i) => (
                <View key={skill.id} style={styles.skillCell}>
                  <Text>
                    <Text style={styles.skillIndex}>{String(i + 1).padStart(2, '0')}: </Text>
                    <Text style={styles.skillName}>{skill.name}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {data.showProjects && data.projects && data.projects.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={styles.inlineLabel}>Project: </Text>
                  <Text style={styles.inlineValueBold}>{proj.name}</Text>
                </Text>
                {proj.link ? (
                  <Text style={{ marginBottom: 2 }}>
                    <Text style={styles.inlineLabel}>Link: </Text>
                    <Text style={styles.inlineValue}>{proj.link}</Text>
                  </Text>
                ) : null}
                <Text>
                  <Text style={styles.inlineLabel}>Detail: </Text>
                  <Text style={styles.inlineValue}>{proj.description}</Text>
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.showCertifications && data.certifications && data.certifications.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <Text key={cert.id} style={[styles.smallText, { marginBottom: 4 }]}>
                <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                {cert.issuer ? ` — Issuer: ${cert.issuer}` : ''}
                {cert.date ? ` · Date: ${cert.date}` : ''}
              </Text>
            ))}
          </View>
        ) : null}

        {data.showReferences && data.references && data.references.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader title="References" />
            {data.references.map((ref) => (
              <View key={ref.id} style={[styles.fieldGrid, { marginBottom: 8 }]}>
                <Field label="Name" value={ref.name} />
                <Field label="Title" value={ref.title} />
                <Field label="Company" value={ref.company} />
                <Field label="Contact" value={ref.contact} />
              </View>
            ))}
          </View>
        ) : null}

        {data.customSections && data.customSections.length > 0
          ? data.customSections.map((section) =>
              section.items && section.items.length > 0 ? (
                <View key={section.id} style={styles.section}>
                  <SectionHeader title={section.title} />
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.experienceItem}>
                      <Field label="Title" value={item.title} />
                      <Field label="Subtitle" value={item.subtitle} />
                      <Field label="Date" value={item.date} />
                      <Field label="Detail" value={item.description} />
                    </View>
                  ))}
                </View>
              ) : null
            )
          : null}
      </Page>
    </Document>
  );
}
