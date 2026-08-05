import re

with open('app/build/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove useState for isDarkMode
content = re.sub(r'const\s+\[isDarkMode,\s*setIsDarkMode\]\s*=\s*useState\(false\);\n', '', content)

# 2. Remove toggleDarkMode function and its useEffect logic
content = re.sub(r'const\s+savedDark\s*=\s*localStorage\.getItem\(\'cvyon-dark-mode\'\);\n\s*if\s*\(savedDark\s*===\s*\'true\'\)\s*setIsDarkMode\(true\);\n', '', content)
content = re.sub(r'\s*//\s*Toggle dark mode\n\s*const\s+toggleDarkMode.*?},\s*\[\]\);\n', '\n', content, flags=re.DOTALL)

# 3. Replace isDarkMode ternaries in cn()
# e.g. isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-[#FAFAFA] text-gray-900'
content = re.sub(r'isDarkMode\s*\?\s*\'[^\']*\'\s*:\s*\'([^\']*)\'', r'\1', content)
content = re.sub(r'isDarkMode\s*\?\s*\"[^\"]*\"\s*:\s*\"([^\"]*)\"', r'\1', content)
# For nested ternary: data.consents.recruiterShare ? 'bg-blue-600' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-300')
content = re.sub(r'\(isDarkMode\s*\?\s*\'[^\']*\'\s*:\s*\'([^\']*)\'\)', r"'\1'", content)

# 4. Remove the Sun/Moon button entirely
content = re.sub(r'<button\s*onClick=\{toggleDarkMode\}[^>]*>\s*\{isDarkMode[^}]*\}\s*</button>', '', content, flags=re.DOTALL)

# 5. Replace the overall layout classes with brutalist/riso style
content = content.replace('bg-[#FAFAFA] text-gray-900', 'bg-[#E8E7E1] text-[#141312] cv-riso')
content = content.replace('bg-white border-gray-200', 'bg-white border-r-[3px] border-[#141312]')
content = content.replace('bg-[#141312]', 'bg-[#141312] border-[3px] border-[#141312]')

with open('app/build/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
