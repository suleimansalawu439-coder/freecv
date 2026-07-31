import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
const envData = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
const apiKeyLine = envData.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
const GEMINI_API_KEY = apiKeyLine ? apiKeyLine.split('=')[1].trim() : '';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const templatesDir = path.join(__dirname, 'components/templates');

async function translateTemplate(filename) {
  const filePath = path.join(templatesDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already imported react-pdf
  if (content.includes('@react-pdf/renderer')) {
    console.log(`Skipping ${filename} (already translated)`);
    return;
  }

  console.log(`Translating ${filename}...`);

  const prompt = `
You are an expert React developer. I have a React resume template that uses standard HTML tags (div, p, h1, h2, h3, ul, li, section) and Tailwind CSS classes.
I need you to completely rewrite it using \`@react-pdf/renderer\` primitives (\`<Document>\`, \`<Page>\`, \`<View>\`, \`<Text>\`, \`<Link>\`, etc.).

RULES:
1. ONLY return the final raw TypeScript code (no markdown code blocks, no explanations, no \`\`\`tsx).
2. The component MUST accept the exact same \`TemplateProps\` interface: \`{ data: ResumeData }\` where ResumeData contains personalInfo, summary, experience, education, skills.
3. Import primitives: \`import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';\`
4. Convert ALL Tailwind classes to a \`const styles = StyleSheet.create({ ... })\` object.
5. Replace \`<div>\` and \`<section>\` with \`<View>\`. Replace \`<h1>\`-\`<h6>\`, \`<p>\`, \`<span>\` with \`<Text>\`. Replace \`<ul>\` and \`<li>\` with \`<View>\` and \`<Text>\` using flexbox for bullet points.
6. The root component MUST wrap everything in \`<Document>\` and \`<Page>\` with standard A4 sizing. Example:
   export default function TemplateName({ data }: TemplateProps) {
     return (
       <Document>
         <Page size="A4" style={styles.page}>
           ...
         </Page>
       </Document>
     );
   }
7. Make the design match the original Tailwind CSS visually by creating corresponding exact StyleSheet properties.
8. NEVER output HTML tags (div, span, etc.). \`@react-pdf/renderer\` will crash if it sees them.
9. Assume \`ResumeData\` interface is imported from \`@/lib/store\`.

Here is the original code:
---------------------
${content}
---------------------
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
          temperature: 0.1
      }
    });

    let newContent = response.text;
    if (newContent.startsWith('\`\`\`')) {
      newContent = newContent.replace(/^\`\`\`(tsx|ts)?\n/, '').replace(/\n\`\`\`$/, '');
    }

    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Successfully translated ${filename}`);
  } catch (err) {
    console.error(`Failed to translate ${filename}:`, err);
  }
}

async function main() {
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx'));
  // Run sequentially to avoid rate limits
  for (const file of files) {
    await translateTemplate(file);
    // 2 second delay between calls
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('All templates translated.');
}

main();
