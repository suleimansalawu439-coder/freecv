export interface JobPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  sampleData: {
    fullName: string;
    jobTitle: string;
    summary: string;
    skills: string[];
  };
}

export const jobPages: JobPageData[] = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    metaTitle: 'Free Software Engineer Resume Templates | FreeCV',
    metaDescription: 'Build a standout Software Engineer resume with our free, professional templates. Optimized for ATS and modern tech hiring.',
    sampleData: {
      fullName: 'Alex Johnson',
      jobTitle: 'Software Engineer',
      summary: 'Results-oriented Software Engineer with 5+ years of experience designing and implementing scalable web applications. Proficient in modern JavaScript frameworks and cloud infrastructure.',
      skills: ['JavaScript / TypeScript', 'React & Next.js', 'Node.js', 'Python', 'AWS', 'Docker & Kubernetes', 'System Design']
    }
  },
  {
    slug: 'product-manager',
    title: 'Product Manager',
    metaTitle: 'Free Product Manager Resume Templates | FreeCV',
    metaDescription: 'Create a winning Product Manager resume using our free templates. Highlight your leadership, roadmap planning, and product lifecycle experience.',
    sampleData: {
      fullName: 'Sarah Chen',
      jobTitle: 'Product Manager',
      summary: 'Strategic Product Manager with a proven track record of launching successful SaaS products. Skilled in agile methodologies, cross-functional leadership, and user-centric design.',
      skills: ['Product Strategy', 'Agile / Scrum', 'Data Analysis', 'User Research', 'Roadmapping', 'Stakeholder Management', 'Jira / Confluence']
    }
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    metaTitle: 'Free Data Scientist Resume Templates | FreeCV',
    metaDescription: 'Showcase your analytical skills with our free Data Scientist resume templates. Perfect for highlighting machine learning, python, and statistical modeling.',
    sampleData: {
      fullName: 'David Smith',
      jobTitle: 'Data Scientist',
      summary: 'Data Scientist specializing in machine learning and predictive modeling. Adept at turning complex datasets into actionable business insights.',
      skills: ['Python / R', 'Machine Learning', 'SQL', 'TensorFlow / PyTorch', 'Data Visualization', 'Statistical Analysis', 'Big Data']
    }
  },
  {
    slug: 'ux-designer',
    title: 'UX Designer',
    metaTitle: 'Free UX Designer Resume Templates | FreeCV',
    metaDescription: 'Design your future with our free UX Designer resume templates. Emphasize your user research, wireframing, and UI design skills.',
    sampleData: {
      fullName: 'Elena Rodriguez',
      jobTitle: 'UX Designer',
      summary: 'Creative UX Designer with a passion for building intuitive, accessible digital experiences. Strong background in user research and interactive prototyping.',
      skills: ['User Research', 'Wireframing', 'Figma', 'Prototyping', 'Usability Testing', 'Interaction Design', 'HTML/CSS']
    }
  },
  {
    slug: 'marketing-manager',
    title: 'Marketing Manager',
    metaTitle: 'Free Marketing Manager Resume Templates | FreeCV',
    metaDescription: 'Boost your career with our free Marketing Manager resume templates. Ideal for showcasing campaign management, SEO, and growth strategies.',
    sampleData: {
      fullName: 'Michael Chang',
      jobTitle: 'Marketing Manager',
      summary: 'Data-driven Marketing Manager with 7 years of experience in digital marketing and brand strategy. Proven success in increasing ROI and customer acquisition.',
      skills: ['Digital Marketing', 'SEO / SEM', 'Content Strategy', 'Social Media Management', 'Google Analytics', 'Campaign Optimization', 'CRM']
    }
  },
  {
    slug: 'project-manager',
    title: 'Project Manager',
    metaTitle: 'Free Project Manager Resume Templates | FreeCV',
    metaDescription: 'Lead the way with our free Project Manager resume templates. Highlight your PMP, agile skills, and team leadership.',
    sampleData: {
      fullName: 'Emily Davis',
      jobTitle: 'Project Manager',
      summary: 'Certified Project Manager (PMP) delivering complex projects on time and under budget. Excellent communicator and cross-functional team leader.',
      skills: ['Project Planning', 'Risk Management', 'Agile / Scrum', 'Budgeting', 'Stakeholder Communication', 'Resource Allocation', 'Asana / Trello']
    }
  },
  {
    slug: 'financial-analyst',
    title: 'Financial Analyst',
    metaTitle: 'Free Financial Analyst Resume Templates | FreeCV',
    metaDescription: 'Secure your next finance role with our free Financial Analyst resume templates. Optimized for forecasting, modeling, and data analysis.',
    sampleData: {
      fullName: 'James Wilson',
      jobTitle: 'Financial Analyst',
      summary: 'Detail-oriented Financial Analyst with expertise in financial modeling, forecasting, and corporate finance. Strong analytical skills and business acumen.',
      skills: ['Financial Modeling', 'Data Analysis', 'Excel (Advanced)', 'Forecasting', 'Valuation', 'Corporate Finance', 'SQL']
    }
  },
  {
    slug: 'nurse',
    title: 'Nurse',
    metaTitle: 'Free Registered Nurse Resume Templates | FreeCV',
    metaDescription: 'Compassionate and professional Nurse resume templates. Free to use and perfect for showcasing your clinical skills and patient care.',
    sampleData: {
      fullName: 'Jessica Thompson, RN',
      jobTitle: 'Registered Nurse',
      summary: 'Dedicated Registered Nurse with over 6 years of experience in acute care and emergency settings. Committed to providing high-quality, patient-centered care.',
      skills: ['Patient Care', 'Clinical Assessment', 'EMR Systems', 'Medication Administration', 'Triage', 'BLS / ACLS Certified', 'Patient Education']
    }
  },
  {
    slug: 'teacher',
    title: 'Teacher',
    metaTitle: 'Free Teacher Resume Templates | FreeCV',
    metaDescription: 'Educator resume templates tailored for teachers. Highlight your lesson planning, classroom management, and student engagement.',
    sampleData: {
      fullName: 'Robert Brown',
      jobTitle: 'High School Teacher',
      summary: 'Passionate Educator with a decade of experience fostering engaging learning environments. Skilled in curriculum development and differentiated instruction.',
      skills: ['Curriculum Development', 'Classroom Management', 'Lesson Planning', 'Differentiated Instruction', 'Educational Technology', 'Student Assessment', 'Parent Communication']
    }
  },
  {
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    metaTitle: 'Free Graphic Designer Resume Templates | FreeCV',
    metaDescription: 'Showcase your portfolio with our free Graphic Designer resume templates. Perfect for creative professionals in print and digital media.',
    sampleData: {
      fullName: 'Sophia Martinez',
      jobTitle: 'Graphic Designer',
      summary: 'Innovative Graphic Designer specializing in brand identity, typography, and visual communication. Proficient in Adobe Creative Suite and digital illustration.',
      skills: ['Adobe Creative Suite', 'Typography', 'Branding & Identity', 'Print Design', 'UI Design', 'Illustration', 'Layout Design']
    }
  },
  {
    slug: 'sales-representative',
    title: 'Sales Representative',
    metaTitle: 'Free Sales Representative Resume Templates | FreeCV',
    metaDescription: 'Close more deals with our free Sales Representative resume templates. Emphasize your quotas, lead generation, and CRM skills.',
    sampleData: {
      fullName: 'Daniel Lee',
      jobTitle: 'Sales Representative',
      summary: 'High-performing Sales Representative consistently exceeding quotas. Expert in B2B sales, account management, and pipeline development.',
      skills: ['B2B Sales', 'Account Management', 'Lead Generation', 'Salesforce CRM', 'Negotiation', 'Cold Calling', 'Client Presentations']
    }
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst',
    metaTitle: 'Free Business Analyst Resume Templates | FreeCV',
    metaDescription: 'Professional Business Analyst resume templates. Free and optimized for highlighting requirements gathering and process improvement.',
    sampleData: {
      fullName: 'Olivia Taylor',
      jobTitle: 'Business Analyst',
      summary: 'Analytical Business Analyst experienced in bridging the gap between IT and business operations. Skilled in requirements gathering and process mapping.',
      skills: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'Agile Methodologies', 'SQL', 'User Acceptance Testing (UAT)', 'Visio']
    }
  },
  {
    slug: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    metaTitle: 'Free Mechanical Engineer Resume Templates | FreeCV',
    metaDescription: 'Build a solid Mechanical Engineer resume with our free templates. Highlight CAD, thermodynamics, and product design experience.',
    sampleData: {
      fullName: 'William Anderson',
      jobTitle: 'Mechanical Engineer',
      summary: 'Detail-driven Mechanical Engineer with experience in product design, thermal analysis, and manufacturing processes. Proficient in SolidWorks and AutoCAD.',
      skills: ['SolidWorks / CAD', 'Thermodynamics', 'Product Design', 'Manufacturing Processes', 'FEA (Finite Element Analysis)', 'Prototyping', 'Project Management']
    }
  },
  {
    slug: 'civil-engineer',
    title: 'Civil Engineer',
    metaTitle: 'Free Civil Engineer Resume Templates | FreeCV',
    metaDescription: 'Construct a professional Civil Engineer resume with our free templates. Showcase your structural design and project management skills.',
    sampleData: {
      fullName: 'Thomas Jackson',
      jobTitle: 'Civil Engineer',
      summary: 'Licensed Civil Engineer with a strong background in structural analysis, site development, and infrastructure planning. Expert in AutoCAD Civil 3D.',
      skills: ['AutoCAD Civil 3D', 'Structural Analysis', 'Site Planning', 'Project Management', 'Environmental Compliance', 'Surveying', 'Construction Management']
    }
  },
  {
    slug: 'accountant',
    title: 'Accountant',
    metaTitle: 'Free Accountant Resume Templates | FreeCV',
    metaDescription: 'Balance your career with our free Accountant resume templates. Perfect for CPAs, auditors, and financial professionals.',
    sampleData: {
      fullName: 'Chloe White',
      jobTitle: 'Certified Public Accountant',
      summary: 'Meticulous CPA with extensive experience in tax preparation, auditing, and financial reporting. Adept at ensuring compliance and optimizing tax strategies.',
      skills: ['Tax Preparation', 'Financial Reporting', 'Auditing', 'QuickBooks / SAP', 'GAAP Compliance', 'Reconciliation', 'Excel']
    }
  },
  {
    slug: 'human-resources-manager',
    title: 'Human Resources Manager',
    metaTitle: 'Free HR Manager Resume Templates | FreeCV',
    metaDescription: 'Lead your organization with a standout HR Manager resume. Free templates for human resources, recruiting, and employee relations.',
    sampleData: {
      fullName: 'Ashley Harris',
      jobTitle: 'HR Manager',
      summary: 'Empathetic Human Resources Manager focused on employee engagement, talent acquisition, and organizational development. SHRM-CP certified.',
      skills: ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HRIS', 'Onboarding', 'Compliance & Labor Laws', 'Conflict Resolution']
    }
  },
  {
    slug: 'content-writer',
    title: 'Content Writer',
    metaTitle: 'Free Content Writer Resume Templates | FreeCV',
    metaDescription: 'Craft a compelling Content Writer resume with our free templates. Highlight your SEO writing, copywriting, and editorial skills.',
    sampleData: {
      fullName: 'Christopher Martin',
      jobTitle: 'Content Writer',
      summary: 'Versatile Content Writer with a knack for creating engaging, SEO-optimized copy. Experienced in writing for blogs, social media, and marketing campaigns.',
      skills: ['SEO Writing', 'Copywriting', 'Content Strategy', 'Editing & Proofreading', 'WordPress', 'Social Media', 'Research']
    }
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    metaTitle: 'Free DevOps Engineer Resume Templates | FreeCV',
    metaDescription: 'Automate your job search with our free DevOps Engineer resume templates. Showcase CI/CD, cloud architecture, and infrastructure as code.',
    sampleData: {
      fullName: 'Ryan Clark',
      jobTitle: 'DevOps Engineer',
      summary: 'Experienced DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation. Dedicated to improving system reliability and deployment speed.',
      skills: ['AWS / Azure', 'Docker & Kubernetes', 'CI/CD (Jenkins/GitLab)', 'Terraform', 'Linux Administration', 'Python / Bash', 'Monitoring (Prometheus/Grafana)']
    }
  },
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    metaTitle: 'Free Cybersecurity Analyst Resume Templates | FreeCV',
    metaDescription: 'Secure your next role with our free Cybersecurity Analyst resume templates. Highlight network security, threat intelligence, and incident response.',
    sampleData: {
      fullName: 'Kevin Lewis',
      jobTitle: 'Cybersecurity Analyst',
      summary: 'Proactive Cybersecurity Analyst skilled in threat detection, vulnerability assessment, and incident response. CompTIA Security+ and CISSP certified.',
      skills: ['Network Security', 'Incident Response', 'Vulnerability Assessment', 'SIEM', 'Firewalls', 'Ethical Hacking', 'Risk Management']
    }
  },
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    metaTitle: 'Free Full Stack Developer Resume Templates | FreeCV',
    metaDescription: 'Build your career with our free Full Stack Developer resume templates. Perfect for showcasing frontend and backend programming skills.',
    sampleData: {
      fullName: 'Amanda Walker',
      jobTitle: 'Full Stack Developer',
      summary: 'Dynamic Full Stack Developer proficient in building complete web applications from the ground up. Strong expertise in MERN stack and relational databases.',
      skills: ['React / Vue.js', 'Node.js / Express', 'MongoDB', 'PostgreSQL', 'RESTful APIs', 'Git / GitHub', 'Tailwind CSS']
    }
  }
];
