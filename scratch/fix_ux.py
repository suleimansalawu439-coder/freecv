import re

with open('app/build/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update main layout wrapper to include grain, dots, and Riso theme exactly like ClientAtsGrader
wrapper_replacement = """  return (
    <div className="cv-riso relative min-h-screen text-[#141312] bg-[#E8E7E1] overflow-x-hidden flex flex-col"
      style={{ "--ink": "#141312", "--verm": "#FF4326", "--cob": "#2233FF", "--hi": "#FFE14D", "--fd": "var(--font-display)", "--fh": "var(--font-head)", "--fb": "var(--font-body)", "--fm": "var(--font-mono)" } as any}>
      <style>{`
        .cv-riso .grain{position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.06;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .cv-riso .dots{background-image:radial-gradient(#14131222 1.2px,transparent 1.2px);background-size:22px 22px}
      `}</style>
      <div className="grain" />
      <div className="absolute inset-0 dots pointer-events-none opacity-50 mix-blend-multiply" />
"""
content = re.sub(r'  return \(\n    <div className="min-h-screen flex flex-col[^>]*">', wrapper_replacement, content)

# 2. Add isJobsModalOpen to handleDownload and handleDocxExport
content = content.replace("trackEvent('milestone_downloaded', data.templateId, getTelemetryMetadata('docx'));", "trackEvent('milestone_downloaded', data.templateId, getTelemetryMetadata('docx'));\n      setIsJobsModalOpen(true);")
content = content.replace("triggerPrint();", "triggerPrint();\n    setIsJobsModalOpen(true);")

# 3. Remove sticky class from the preview pane wrapper
content = re.sub(r'"hidden lg:flex lg:sticky lg:top-[^"]+"', '"hidden lg:flex"', content)
# Also remove sticky from anywhere else just in case, but let's be careful.
content = re.sub(r'lg:sticky lg:top-[0-9]+\s*', '', content)
content = re.sub(r'lg:h-screen\s*', '', content)

with open('app/build/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
