
import React from 'react';

const ResumeContent: React.FC = () => {
  return (
    <div className="p-8 text-sm font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-800">RICHARD T. CUBERO</h1>
      <p className="text-center mb-6">Purok Saturn, Telaje, Tandag City | +63 995 323 6145 | richardcubero2021@gamil.com | www.realchardportfolio.vercel.app</p>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-blue-700 pb-1 mb-2">Summary</h2>
        <p>
          Computer Science graduate (June 2025, NEMSU) with 15+ years of IT experience in full-stack development, AI integration, and tech support. Skilled in building AI-powered web apps, SaaS tools, and Chabot integrations using Next.js, Tailwind, ChatGPT, and Gemini. Strong background in software and hardware troubleshooting. Open to opportunities in innovative tech-driven environments where problem-solving and development skills can make an impact.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-blue-700 pb-1 mb-2">Work Experience</h2>
        <div className="mb-4">
          <h3 className="font-bold">AI-Enhanced Web Developer, Freelance</h3>
          <p className="italic">August 2024 – Present</p>
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Developed and deployed AI-powered websites and SaaS tools, increasing client conversion rates by up to 30%.</li>
            <li>Automated repetitive workflows using ChatGPT, Gemini, and n8n, saving clients over 15 hours of manual work per week.</li>
            <li>Implemented cost-effective, modular frontend solutions using Next.js and TailwindCSS.</li>
            <li>Streamlined client development cycles by integrating Git-based version control and low-overhead deployment strategies.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">ICT Intern, DepEd Surigao del Sur Division – ICT Unit</h3>
          <p className="italic">Jun 2024 – Aug 2024</p>
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Provided technical support to employees by troubleshooting hardware and software issues across departments.</li>
            <li>Developed a simple ICT ticketing system to track and manage internal tech support requests.</li>
            <li>Collaborated with ICT staff to document common issues and improve user support procedures.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Technical Support Specialist, ECPAC Davao</h3>
          <p className="italic">Jan 2015 – Dec 2019</p>
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Resolved software and hardware issues across 15+ government agency clients, cutting downtime by 40%.</li>
            <li>Trained over 20 personnel on system usage, resulting in a 30% boost in operational productivity.</li>
            <li>Spearheaded the troubleshooting and recovery of legacy accounting systems in multiple LGUs.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">IT Systems Technician | DPWH Tandag City</h3>
          <p className="italic">2013–2014</p>
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Supported the ICT department by maintaining and updating 20+ workstations and assisting with day-to-day technical operations.</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-blue-700 pb-1 mb-2">Education</h2>
        <p><span className="font-bold">Bachelor of Science in Computer Science</span></p>
        <p>North Eastern Mindanao State University (NEMSU)</p>
        <p>Batch 2025</p>
      </div>

      <div>
        <h2 className="text-xl font-bold border-b-2 border-blue-700 pb-1 mb-2">Certifications & Training</h2>
        <ul className="list-disc list-inside ml-4 mt-1">
            <li>CSS NC-II (Computer Systems Servicing) – TESDA</li>
            <li>Ethical Hacking & Capture-the-Flag (CTF) Training – DICT Caraga (June 2024)</li>
            <li>Flood Projection & GIS Mapping – Google Earth Engine (GEE) Practice Project (2024)</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeContent;
