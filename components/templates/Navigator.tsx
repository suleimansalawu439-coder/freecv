import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DEFAULT_THEME_COLOR = '#2563eb';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 44,
  },
  routeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
  },
  routeLine: {
    flex: 1,
    borderTopWidth: 1.5,
    borderTopColor: '#CBD5E1',
    borderTopStyle: 'dashed',
    marginHorizontal: 8,
  },
  routeEnd: {
    width: 12,
    height: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#475569',
    marginBottom: 6,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionDiamond: {
    width: 9,
    height: 9,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  sectionDash: {
    flex: 1,
    borderTopWidth: 1.5,
    borderTopColor: '#CBD5E1',
    borderTopStyle: 'dashed',
    marginLeft: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  timelineWrap: {
    marginLeft: 6,
  },
  timelineRail: {
    position: 'absolute',
    left: 5,
    top: 6,
    bottom: 6,
    width: 2,
  },
  stopItem: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2.5,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    marginTop: 2,
  },
  stopBody: {
    flex: 1,
  },
  stopTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  stopNum: {
    fontFamily: 'Courier',
    fontSize: 8,
    fontWeight: 'bold',
    marginRight: 6,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  stopDates: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748B',
  },
  companyName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 4,
  },
  bulletText: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: '#334155',
    marginBottom: 3,
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.9,
    color: '#1E293B',
  },
  waypointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  waypointMark: {
    width: 8,
    height: 8,
    marginTop: 3,
    marginRight: 10,
  },
  waypointBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  degreeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  schoolText: {
    fontSize: 8.5,
    color: '#475569',
  },
  section: {
    marginBottom: 4,
  },
});

function SectionHead({ title, themeColor }: { title: string; themeColor: string }) {
  return (
    <View style={styles.sectionHead}>
      <View style={[styles.sectionDiamond, { backgroundColor: themeColor }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionDash} />
    </View>
  );
}

export default function Navigator({ data }: { data: ResumeData }) {
  const themeColor = data.theme?.color || DEFAULT_THEME_COLOR;
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderSections(data, {
          personal: (
            <>
        <View style={styles.routeBar}>
          <View style={[styles.routeDot, { borderColor: themeColor }]} />
          <View style={styles.routeLine} />
          <View style={[styles.routeEnd, { backgroundColor: themeColor }]} />
        </View>
        {info.fullName ? <Text style={styles.name}>{info.fullName}</Text> : null}
        {info.jobTitle ? (
          <Text style={[styles.jobTitle, { color: themeColor }]}>{info.jobTitle}</Text>
        ) : null}
        {contactItems.length > 0 ? (
          <Text style={styles.contactLine}>{contactItems.join('  •  ')}</Text>
        ) : null}

        {data.summary ? (
          <View style={styles.section}>
            <SectionHead title="Route Overview" themeColor={themeColor} />
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        ) : null}
            </>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Career Route" themeColor={themeColor} />
            <View style={styles.timelineWrap}>
              <View style={[styles.timelineRail, { backgroundColor: themeColor }]} />
              {data.experience.map((exp, idx) => (
                <View key={exp.id} style={styles.stopItem}>
                  <View style={[styles.stopDot, { borderColor: themeColor }]} />
                  <View style={styles.stopBody}>
                    <View style={styles.stopTop}>
                      <Text style={styles.roleTitle}>
                        <Text style={[styles.stopNum, { color: themeColor }]}>
                          {String(idx + 1).padStart(2, '0')}{' '}
                        </Text>
                        {exp.role}
                      </Text>
                      <Text style={styles.stopDates}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.companyName}>{exp.company}</Text>
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <Text key={i} style={styles.bulletText}>
                          {line}
                        </Text>
                      ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ),

          skills: data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Capabilities" themeColor={themeColor} />
            <Text style={styles.skillsText}>
              {data.skills.map((s, i) => (
                <React.Fragment key={s.id}>
                  <Text style={{ fontWeight: 'bold' }}>{s.name}</Text>
                  {i < data.skills.length - 1 ? <Text>  •  </Text> : null}
                </React.Fragment>
              ))}
            </Text>
          </View>
        ),

          education: data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Education" themeColor={themeColor} />
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.waypointRow}>
                <View style={[styles.waypointMark, { backgroundColor: themeColor }]} />
                <View style={styles.waypointBody}>
                  <View>
                    <Text style={styles.degreeText}>{edu.degree}</Text>
                    <Text style={styles.schoolText}>{edu.school}</Text>
                  </View>
                  {edu.graduationYear ? (
                    <Text style={styles.stopDates}>{edu.graduationYear}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Expeditions" themeColor={themeColor} />
            {data.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 8 }}>
                <Text style={styles.degreeText}>
                  {proj.name}
                  {proj.link ? ` (${proj.link})` : ''}
                </Text>
                <Text style={styles.schoolText}>{proj.description}</Text>
              </View>
            ))}
          </View>
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="Checkpoints" themeColor={themeColor} />
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.waypointBody}>
                <Text style={styles.degreeText}>
                  {cert.name}
                  {cert.issuer ? ` · ${cert.issuer}` : ''}
                </Text>
                {cert.date ? <Text style={styles.stopDates}>{cert.date}</Text> : null}
              </View>
            ))}
          </View>
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <SectionHead title="References" themeColor={themeColor} />
            {data.references.map((ref) => (
              <View key={ref.id} style={{ marginBottom: 6 }}>
                <Text style={styles.degreeText}>{ref.name}</Text>
                <Text style={styles.schoolText}>
                  {ref.title}
                  {ref.company ? `, ${ref.company}` : ''}
                </Text>
                {ref.contact ? <Text style={styles.stopDates}>{ref.contact}</Text> : null}
              </View>
            ))}
          </View>
        ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <View key={section.id} style={styles.section}>
                <SectionHead title={section.title} themeColor={themeColor} />
                {section.items.map((item) => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    <View style={styles.waypointBody}>
                      <Text style={styles.degreeText}>{item.title}</Text>
                      {item.date ? <Text style={styles.stopDates}>{item.date}</Text> : null}
                    </View>
                    {item.subtitle ? (
                      <Text style={[styles.schoolText, { fontStyle: 'italic' }]}>
                        {item.subtitle}
                      </Text>
                    ) : null}
                    {item.description ? (
                      <Text style={styles.schoolText}>{item.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))
        )}
      </Page>
    </Document>
  );
}
