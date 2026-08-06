"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Terminal, Copy, Check, ChevronRight, Server, Database, Shield } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CodeBlock = ({ language, code }: { language: string, code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#0d1117] border border-gray-800 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function DevelopersPage() {
  const [activeSection, setActiveSection] = useState('authentication');

  const curlExample = `curl -X GET "https://api.cvyon.com/v1/talent?query=software+engineer" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

  const nodeExample = `const fetchCandidates = async () => {
  const response = await fetch('https://api.cvyon.com/v1/talent?query=software+engineer', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log(data);
};`;

  const pythonExample = `import requests

url = "https://api.cvyon.com/v1/talent"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
params = {
    "query": "software engineer"
}

response = requests.get(url, headers=headers, params=params)
print(response.json())`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-light-no-background.png"
              alt="Cvyon"
              width={120}
              height={32}
              priority
              className="h-7 w-auto object-contain"
            />
            <span className="text-gray-800 text-sm font-bold bg-gray-100 px-2 py-0.5 rounded">API</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/recruiter" className="hover:text-blue-600 transition-colors">Recruiter Portal</Link>
            <Link href="/support" className="hover:text-blue-600 transition-colors">Support</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 hidden md:block pt-12 pr-8 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="space-y-1">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-3 px-3">Getting Started</h4>
            <a href="#authentication" className={cn("block px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeSection === 'authentication' ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100")}>Authentication</a>
            <a href="#rate-limits" className={cn("block px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeSection === 'rate-limits' ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100")}>Rate Limits</a>
            
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-3 mt-8 px-3">Endpoints</h4>
            <a href="#search-talent" className={cn("block px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeSection === 'search-talent' ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100")}>Search Talent</a>
            <a href="#get-candidate" className={cn("block px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeSection === 'get-candidate' ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100")}>Get Candidate</a>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 py-12 md:pl-12 px-4 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4">Cvyon B2B API</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Integrate Cvyon's highly-structured talent pool directly into your ATS, CRM, or custom internal tools. Our REST API provides programmatic access to candidates who have opted in to be contacted by recruiters.
            </p>
          </div>

          <div id="authentication" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" /> Authentication
            </h2>
            <p className="text-gray-600 mb-4">
              Authenticate your API requests by including your secret API key in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-sm">Authorization</code> HTTP header.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-800 text-sm font-medium">
              You must have an active Pro Recruiter subscription to generate and use API keys. Keys can be managed in the <Link href="/recruiter" className="underline">Recruiter Portal</Link>.
            </div>
            
            <CodeBlock language="HTTP" code="Authorization: Bearer YOUR_API_KEY" />
          </div>

          <div id="rate-limits" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <Server className="text-blue-600" /> Rate Limits
            </h2>
            <p className="text-gray-600 mb-4">
              To ensure platform stability, API requests are subject to rate limiting based on your subscription tier.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
              <li><strong>Pro Tier:</strong> 100 requests per minute, up to 10,000 requests per day.</li>
            </ul>
            <p className="text-gray-600">
              If you exceed the rate limit, the API will return a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-sm">429 Too Many Requests</code> HTTP status code.
            </p>
          </div>

          <div className="w-full h-px bg-gray-200 my-12"></div>

          <div id="search-talent" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <Database className="text-blue-600" /> Search Talent
            </h2>
            <p className="text-gray-600 mb-4">
              Search for candidates across the Cvyon database. You can filter by keywords, job titles, or location.
            </p>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold uppercase tracking-wider text-xs rounded-md">GET</span>
              <code className="font-mono text-gray-800">/v1/talent</code>
            </div>

            <h3 className="font-bold text-lg mb-3">Query Parameters</h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Parameter</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr>
                    <td className="px-4 py-3 font-mono">query</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3">Search term (e.g. "software engineer", "marketing").</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono">country</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3">Filter by candidate location.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono">limit</td>
                    <td className="px-4 py-3">integer</td>
                    <td className="px-4 py-3">Max results to return (default 20, max 100).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-lg mb-3">Examples</h3>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">cURL</h4>
              <CodeBlock language="bash" code={curlExample} />
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Node.js</h4>
              <CodeBlock language="javascript" code={nodeExample} />
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Python</h4>
              <CodeBlock language="python" code={pythonExample} />
            </div>

            <h3 className="font-bold text-lg mb-3">Response</h3>
            <CodeBlock language="json" code={`{
  "success": true,
  "data": [
    {
      "id": "cnd_123456789",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "target_role": "Senior Software Engineer",
      "country": "United States",
      "skills": ["React", "TypeScript", "Node.js"],
      "resume_url": "https://cvyon.com/resume/jane-doe"
    }
  ],
  "meta": {
    "total_count": 145,
    "has_more": true
  }
}`} />
          </div>

        </div>
      </main>
    </div>
  );
}
