import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    padding: 26,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  contactLine: {
    fontSize: 8,
    color: '#64748B',
  },
  rule: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    marginTop: 6,
    marginBottom: 12,
  },
  microHead: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionBody: {
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cellWrap4: {
    width: '25%',
    padding: 2,
  },
  cellWrap2: {
    width: '50%',
    padding: 3,
  },
  cellWrap3: {
    width: '33.33%',
    padding: 3,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 5,
    padding: 7,
  },
  skillText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'center',
  },
  roleTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  cellMeta: {
    fontSize: 7.5,
    color: '#64748B',
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bulletDot: {
    width: 7,
    fontSize: 7,
    color: '#475569',
  },
  bulletText: {
    flex: 1,
    fontSize: 7.5,
    color: '#475569',
    lineHeight: 1.35,
  },
  cellBody: {
    fontSize: 7.5,
    color: '#475569',
    marginTop: 3,
    lineHeight: 1.35,
  },
});

export default function Throttle({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const MicroHead = ({ title }: { title: string }) => (
    <Text style={[styles.microHead, { color: themeColor }]}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{pi.fullName}</Text>
          {contacts.length > 0 ? <Text style={styles.contactLine}>{contacts.join(' · ')}</Text> : null}
        </View>
        <View style={styles.rule} />

        {data.summary ? (
          <View style={styles.sectionBody}>
            <MicroHead title="Summary" />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.skills && data.skills.length > 0 && (
          <View style={styles.sectionBody}>
            <MicroHead title="Skills" />
            <View style={styles.grid}>
              {data.skills.map((s) => (
                <View key={s.id} style={styles.cellWrap4}>
                  <View style={styles.cell}>
                    <Text style={styles.skillText}>{s.name}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.experience && data.experience.length > 0 && (
          <View style={styles.sectionBody}>
            <MicroHead title="Experience" />
            <View style={styles.grid}>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.cellWrap2}>
                  <View style={styles.cell}>
                    <Text style={styles.roleTitle}>{exp.role}</Text>
                    {(exp.company || exp.startDate || exp.endDate) ? (
                      <Text style={styles.cellMeta}>
                        {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' · ' : ''}{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                      </Text>
                    ) : null}
                    {exp.description ? (
                      <View>
                        {exp.description
                          .split(/\n|\r\n/)
                          .filter((l) => l.trim())
                          .slice(0, 3)
                          .map((line, i) => (
                            <View key={i} style={styles.bulletRow}>
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
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles.sectionBody}>
            <MicroHead title="Education" />
            <View style={styles.grid}>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.cellWrap2}>
                  <View style={styles.cell}>
                    <Text style={styles.roleTitle}>{edu.degree}</Text>
                    {edu.school ? <Text style={styles.cellBody}>{edu.school}</Text> : null}
                    {edu.graduationYear ? <Text style={styles.cellMeta}>{edu.graduationYear}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.sectionBody}>
            <MicroHead title="Projects" />
            <View style={styles.grid}>
              {data.projects.map((p) => (
                <View key={p.id} style={styles.cellWrap2}>
                  <View style={styles.cell}>
                    <Text style={styles.roleTitle}>{p.name}</Text>
                    {p.link ? <Text style={styles.cellMeta}>{p.link}</Text> : null}
                    {p.description ? <Text style={styles.cellBody}>{p.description}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.sectionBody}>
            <MicroHead title="Certifications" />
            <View style={styles.grid}>
              {data.certifications.map((c) => (
                <View key={c.id} style={styles.cellWrap3}>
                  <View style={styles.cell}>
                    <Text style={styles.skillText}>{c.name}</Text>
                    {(c.issuer || c.date) ? (
                      <Text style={[styles.cellMeta, { textAlign: 'center' }]}>
                        {[c.issuer, c.date].filter(Boolean).join(' · ')}
                      </Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.sectionBody}>
            <MicroHead title="References" />
            <View style={styles.grid}>
              {data.references.map((r) => (
                <View key={r.id} style={styles.cellWrap2}>
                  <View style={styles.cell}>
                    <Text style={styles.roleTitle}>{r.name}</Text>
                    {(r.title || r.company) ? (
                      <Text style={styles.cellBody}>{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</Text>
                    ) : null}
                    {r.contact ? <Text style={styles.cellMeta}>{r.contact}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <View key={section.id} style={styles.sectionBody}>
                <MicroHead title={section.title} />
                <View style={styles.grid}>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.cellWrap2}>
                      <View style={styles.cell}>
                        <Text style={styles.roleTitle}>{item.title}</Text>
                        {(item.subtitle || item.date) ? (
                          <Text style={styles.cellMeta}>
                            {[item.subtitle, item.date].filter(Boolean).join(' · ')}
                          </Text>
                        ) : null}
                        {item.description ? <Text style={styles.cellBody}>{item.description}</Text> : null}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : null
          )}
      </Page>
    </Document>
  );
}
