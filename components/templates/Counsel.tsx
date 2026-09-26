import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

interface TemplateProps {
  data: ResumeData;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 64,
    paddingVertical: 48,
    fontFamily: 'Times-Roman',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
    color: '#1a1a1a',
  },
  jobTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#374151',
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 9,
    color: '#6b7280',
  },
  rulePair: {
    marginBottom: 24,
  },
  rule: {
    borderTopWidth: 1,
    marginBottom: 3,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: '#1f2937',
    textAlign: 'justify',
  },
  expItem: {
    marginBottom: 16,
  },
  expHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  expDate: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#4b5563',
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#1f2937',
    textAlign: 'justify',
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eduSchool: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  skillsLine: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#1f2937',
    textAlign: 'center',
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  refItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  refName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  refTitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  refContact: {
    fontSize: 9,
    color: '#6b7280',
  },
  customSectionItem: {
    marginBottom: 8,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  customTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  customSubtitle: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  customDate: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  customDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#1f2937',
    marginTop: 2,
    textAlign: 'justify',
  },
});

export default function Counsel({ data }: TemplateProps) {
  const themeColor = data.theme?.color || '#2563eb';
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  |  ');

  const sectionTitle = (title: string) => (
    <Text style={[styles.sectionTitleText, { color: themeColor }]}>{title}</Text>
  );

  const hairlineRule = () => (
    <View style={styles.rulePair}>
      <View style={[styles.rule, { borderTopColor: themeColor }]} />
      <View style={[styles.rule, { borderTopColor: themeColor }]} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.header}>
          <Text style={styles.name}>{p.fullName}</Text>
          <Text style={styles.jobTitle}>{p.jobTitle}</Text>
          {contactLine ? <Text style={styles.contactLine}>{contactLine}</Text> : null}
        </View>

        {hairlineRule()}

        {data.summary ? (
          <View style={styles.section}>
            {sectionTitle('Professional Summary')}
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Professional Experience')}
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeadRow}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDate}>
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                {exp.description ? <Text style={styles.bodyText}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
          ),

          education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Education')}
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                </View>
                {edu.graduationYear ? <Text style={styles.eduYear}>{edu.graduationYear}</Text> : null}
              </View>
            ))}
          </View>
          ),

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Skills')}
            <Text style={styles.skillsLine}>{data.skills.map((s) => s.name).join('  •  ')}</Text>
          </View>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Projects')}
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{proj.name}</Text>
                {proj.link ? <Text style={styles.projectLink}>{proj.link}</Text> : null}
                {proj.description ? <Text style={styles.bodyText}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('Certifications')}
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certRow}>
                <View>
                  <Text style={styles.eduDegree}>{cert.name}</Text>
                  <Text style={styles.eduSchool}>{cert.issuer}</Text>
                </View>
                {cert.date ? <Text style={styles.eduYear}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            {sectionTitle('References')}
            {data.references.map((ref) => (
              <View key={ref.id} style={styles.refItem}>
                <Text style={styles.refName}>{ref.name}</Text>
                <Text style={styles.refTitle}>
                  {ref.title}
                  {ref.title && ref.company ? ', ' : ''}
                  {ref.company}
                </Text>
                {ref.contact ? <Text style={styles.refContact}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
                <View key={section.id} style={styles.section}>
                  {sectionTitle(section.title)}
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.customSectionItem}>
                      <View style={styles.customHeader}>
                        <View>
                          <Text style={styles.customTitle}>{item.title}</Text>
                          {item.subtitle ? (
                            <Text style={styles.customSubtitle}>{item.subtitle}</Text>
                          ) : null}
                        </View>
                        {item.date ? <Text style={styles.customDate}>{item.date}</Text> : null}
                      </View>
                      {item.description ? (
                        <Text style={styles.customDesc}>{item.description}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
            ))
        )}

        {hairlineRule()}
      </Page>
    </Document>
  );
}
