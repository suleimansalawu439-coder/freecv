import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections, getOrderedSectionIds } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';
const num = (i: number) => String(i + 1).padStart(2, '0');

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 36,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  jobTitle: {
    fontSize: 10,
    color: '#4B5563',
    marginTop: 3,
  },
  contactRow: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 5,
    fontFamily: 'Courier',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#111827',
    marginBottom: 10,
  },
  secNum: {
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  secDash: {
    color: '#9CA3AF',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  entryNum: {
    width: 30,
    fontFamily: 'Courier',
    fontSize: 9,
    fontWeight: 'bold',
  },
  entryBody: {
    flex: 1,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateMono: {
    fontSize: 7.5,
    color: '#6B7280',
    fontFamily: 'Courier',
  },
  companyName: {
    fontSize: 8.5,
    color: '#374151',
    fontWeight: 'bold',
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  bulletDot: {
    width: 9,
    fontSize: 8,
    color: '#4B5563',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  profileText: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  lineText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.4,
  },
  lineBold: {
    fontWeight: 'bold',
    color: '#111827',
  },
  inlineDim: {
    color: '#6B7280',
  },
  inlineMono: {
    fontFamily: 'Courier',
    color: '#6B7280',
  },
  refItem: {
    marginBottom: 8,
  },
});

export default function Docket({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const DocketHead = ({ index, title }: { index: number; title: string }) => (
    <Text style={styles.sectionTitle}>
      <Text style={[styles.secNum, { color: themeColor }]}>{num(index)}</Text>
      <Text style={styles.secDash}> — </Text>
      <Text>{title}</Text>
    </Text>
  );

  // Section numbers follow the rendered display order, so they stay consecutive
  // when the user reorders or hides sections. The identity header itself is
  // unnumbered; only the Profile (summary) section takes a number.
  const sectionNums: Record<string, number> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal': return !!data.summary;
        case 'experience': return !!data.experience && data.experience.length > 0;
        case 'education': return !!data.education && data.education.length > 0;
        case 'skills': return !!data.skills && data.skills.length > 0;
        case 'projects': return data.showProjects && !!data.projects && data.projects.length > 0;
        case 'certifications': return data.showCertifications && !!data.certifications && data.certifications.length > 0;
        case 'references': return data.showReferences && !!data.references && data.references.length > 0;
        default: return false;
      }
    });
    const map: Record<string, number> = {};
    rendered.forEach((id, n) => { map[id] = n; });
    return map;
  })();
  const customBase = Object.keys(sectionNums).length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
              <Text style={styles.name}>{pi.fullName}</Text>
              {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
              {contacts.length > 0 ? <Text style={styles.contactRow}>{contacts.join(' · ')}</Text> : null}

              {data.summary ? (
                <View style={styles.section}>
                  <DocketHead index={sectionNums.personal} title="Profile" />
                  <Text style={styles.profileText}>{data.summary}</Text>
                </View>
              ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <DocketHead index={sectionNums.experience} title="Experience" />
            {data.experience.map((exp, i) => (
              <View key={exp.id} style={styles.row}>
                <Text style={[styles.entryNum, { color: themeColor }]}>{num(i)}</Text>
                <View style={styles.entryBody}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {(exp.startDate || exp.endDate) ? (
                      <Text style={styles.dateMono}>{exp.startDate} - {exp.endDate}</Text>
                    ) : null}
                  </View>
                  {exp.company ? <Text style={styles.companyName}>{exp.company}</Text> : null}
                  {exp.description ? (
                    <View>
                      {exp.description
                        .split(/\n|\r\n/)
                        .filter((l) => l.trim())
                        .map((line, j) => (
                          <View key={j} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>{line}</Text>
                          </View>
                        ))}
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        ),

        education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <DocketHead index={sectionNums.education} title="Education" />
            {data.education.map((edu, i) => (
              <View key={edu.id} style={styles.row}>
                <Text style={[styles.entryNum, { color: themeColor }]}>{num(i)}</Text>
                <View style={styles.entryBody}>
                  <Text style={styles.roleTitle}>{edu.degree}</Text>
                  {edu.school ? <Text style={styles.lineText}>{edu.school}</Text> : null}
                  {edu.graduationYear ? <Text style={styles.inlineMono}>{edu.graduationYear}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ),

        skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <DocketHead index={sectionNums.skills} title="Skills" />
            <Text style={styles.lineText}>{data.skills.map((s) => s.name).join(', ')}</Text>
          </View>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <DocketHead index={sectionNums.projects} title="Projects" />
            {data.projects.map((p, i) => (
              <View key={p.id} style={styles.row}>
                <Text style={[styles.entryNum, { color: themeColor }]}>{num(i)}</Text>
                <View style={styles.entryBody}>
                  <Text style={styles.roleTitle}>
                    {p.name}
                    {p.link ? <Text style={styles.inlineMono}> — {p.link}</Text> : null}
                  </Text>
                  {p.description ? <Text style={styles.lineText}>{p.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <DocketHead index={sectionNums.certifications} title="Certifications" />
            {data.certifications.map((c, i) => (
              <View key={c.id} style={styles.row}>
                <Text style={[styles.entryNum, { color: themeColor }]}>{num(i)}</Text>
                <View style={styles.entryBody}>
                  <Text style={styles.lineText}>
                    <Text style={styles.lineBold}>{c.name}</Text>
                    {c.issuer ? <Text> — {c.issuer}</Text> : null}
                    {c.date ? <Text style={styles.inlineMono}>, {c.date}</Text> : null}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <DocketHead index={sectionNums.references} title="References" />
            {data.references.map((r) => (
              <View key={r.id} style={styles.refItem}>
                <Text style={styles.roleTitle}>{r.name}</Text>
                {(r.title || r.company) ? (
                  <Text style={styles.lineText}>{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</Text>
                ) : null}
                {r.contact ? <Text style={styles.inlineMono}>{r.contact}</Text> : null}
              </View>
            ))}
          </View>
        ),

        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section, si) => (
              <View key={section.id} style={styles.section}>
                <DocketHead index={customBase + si} title={section.title} />
                {section.items.map((item, i) => (
                  <View key={item.id} style={styles.row}>
                    <Text style={[styles.entryNum, { color: themeColor }]}>{num(i)}</Text>
                    <View style={styles.entryBody}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {item.date ? <Text style={styles.dateMono}>{item.date}</Text> : null}
                      </View>
                      {item.subtitle ? <Text style={styles.lineText}>{item.subtitle}</Text> : null}
                      {item.description ? <Text style={styles.lineText}>{item.description}</Text> : null}
                    </View>
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
