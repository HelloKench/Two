// WisdomQ Data Store & Catalog

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  iconName: string;
  accentColor: string;
  features: string[];
  deliverables: string[];
  turnaroundTime: string;
  languagesSupported: string[];
}

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  primaryLanguage: string;
  secondaryLanguage: string;
  fluencyLevel: 'Native' | 'C2 Mastery' | 'C1 Fluent' | 'JLPT N1' | 'DALF C1' | 'DALF C2';
  technicalSkills: string[];
  yearsExperience: number;
  location: string;
  availability: 'Immediate (48h)' | '2 Weeks' | '1 Month';
  rating: number;
  completedProjects: number;
}

export interface DepartmentContact {
  id: string;
  department: string;
  email: string;
  purpose: string;
  icon: string;
  sla: string;
  headName: string;
}

export const WISDOMQ_SERVICES: ServiceItem[] = [
  {
    id: 'staffing',
    category: 'Talent Acquisition',
    title: 'Specialized Staffing Solutions',
    shortDesc: 'Agile deployment of bilingual engineers, specialized linguists, and IT domain experts.',
    iconName: 'Briefcase',
    accentColor: '#ff4d6d',
    features: [
      'Contract Staffing: Rapid on-demand scale-up for mission-critical project timelines.',
      'Permanent Placement: Thoroughly pre-vetted domain and foreign-language talent.',
      'Niche Multilingual Talent Pool: Pre-screened candidates with dual tech & linguistic mastery.',
      'Global Payroll & Compliance: Seamless cross-border contractor management.'
    ],
    deliverables: [
      '48-hour shortlist turnaround',
      'Pre-vetted technical & linguistic grading reports',
      'Standardized NDA & IP protection agreements',
      'Dedicated delivery manager'
    ],
    turnaroundTime: '24 - 48 Hours',
    languagesSupported: ['Japanese', 'German', 'French', 'Mandarin', 'Spanish', 'Korean', 'Arabic']
  },
  {
    id: 'translation',
    category: 'Linguistic Services',
    title: 'Foreign Language Translation & Localization',
    shortDesc: 'High-precision contextual translations for technical blueprints, SOPs, legal contracts, and enterprise software.',
    iconName: 'Languages',
    accentColor: '#38bdf8',
    features: [
      'Technical Blueprints & Patent Documentation with ISO-certified accuracy.',
      'Standard Operating Procedures (SOPs) & Enterprise Knowledge Bases.',
      'Functional Cross-Border Business & Financial Workflows.',
      'Contextual localization managed by veteran native industry linguists.'
    ],
    deliverables: [
      'Multi-tier human proofreading (Dual-linguist protocol)',
      'Terminology Glossary & Memory Banks maintenance',
      'Certificate of Translation Authenticity (Notarized upon request)',
      'Format retention (CAD, DOCX, InDesign, JSON/XLIFF)'
    ],
    turnaroundTime: 'Same Day to 72 Hours',
    languagesSupported: ['French', 'German', 'Japanese', 'Mandarin', 'Spanish', 'Italian', 'Russian', 'Portuguese']
  },
  {
    id: 'coaching',
    category: 'Global Education',
    title: 'Executive & Academic Language Coaching',
    shortDesc: 'Standardized exam coaching (IELTS, DELF/DALF, JLPT) and enterprise immersion cohorts.',
    iconName: 'GraduationCap',
    accentColor: '#a855f7',
    features: [
      'IELTS Coaching: Band 7.5+ targeted programs for academic migration and global careers.',
      'DELF / DALF Programs: Official CEFR-aligned French modules (A1 through C2).',
      'JLPT & Goethe Preparation: Intensive grammar, listening, and kanji mastery cohorts.',
      'Corporate Cohorts: Custom customized business fluency tracks for international teams.'
    ],
    deliverables: [
      'Adaptive diagnostic test & progress dashboard',
      '1-on-1 mock speaking interviews with native evaluators',
      'Comprehensive study materials and digital flashcard engines',
      'WisdomQ Global Fluency Certification'
    ],
    turnaroundTime: 'Flexible 4 - 12 Week Cohorts',
    languagesSupported: ['English (IELTS)', 'French (DELF/DALF)', 'German (Goethe)', 'Japanese (JLPT)', 'Spanish (DELE)']
  },
  {
    id: 'skills',
    category: 'Digital Excellence',
    title: 'Smart & Soft Skill Development',
    shortDesc: 'Workplace AI enablement, Prompt Engineering masterclasses, and executive communication dynamics.',
    iconName: 'Brain',
    accentColor: '#10b981',
    features: [
      'Prompt Engineering & Enterprise GenAI Interaction frameworks.',
      'Foundational & Advanced Computing for modern cross-functional teams.',
      'High-Impact Professional Communication & Cross-Cultural Workplace Dynamics.',
      'Digital Productivity, Analytical Thought, and Structured Problem-Solving.'
    ],
    deliverables: [
      'Hands-on sandbox labs with real-world enterprise scenarios',
      'Interactive evaluation benchmarks and ROI dashboards',
      'Certified competency badges',
      'Post-training quarterly reinforcement webinars'
    ],
    turnaroundTime: '1-Day Intensive to 4-Week Tracks',
    languagesSupported: ['English', 'Multilingual Support']
  },
  {
    id: 'elearning',
    category: 'Knowledge Systems',
    title: 'E-Learning & IT Knowledge Systems',
    shortDesc: 'Curated technical write-ups, custom SCORM-compliant modules, and self-paced digital academies.',
    iconName: 'LaptopMinimal',
    accentColor: '#f59e0b',
    features: [
      'Curated technical write-ups and instructional system design (ISD).',
      'Industry-aligned technical skill progression maps (Cloud, DevOps, Full-Stack).',
      'Self-paced interactive e-learning paths with automated assessments.',
      'LMS integration & microlearning module delivery.'
    ],
    deliverables: [
      'SCORM/xAPI compliant interactive courseware',
      'Bilingual subtitles and localized audio voiceovers',
      'Admin analytics dashboard with completion tracking',
      'Offline-capable learning reader'
    ],
    turnaroundTime: 'Custom Project Timelines',
    languagesSupported: ['Global Localization Available']
  }
];

export const TALENT_BENCH: TalentProfile[] = [
  {
    id: 'wq-tal-01',
    name: 'Hiroshi T. / Tanaka H.',
    role: 'Senior Bilingual Cloud Architect (AWS/GCP)',
    primaryLanguage: 'Japanese (Native)',
    secondaryLanguage: 'English (Fluent C1)',
    fluencyLevel: 'JLPT N1',
    technicalSkills: ['Kubernetes', 'Terraform', 'Go', 'Microservices', 'Enterprise Security'],
    yearsExperience: 9,
    location: 'Bangalore / Tokyo Remote',
    availability: 'Immediate (48h)',
    rating: 4.98,
    completedProjects: 42
  },
  {
    id: 'wq-tal-02',
    name: 'Camille Dubois',
    role: 'Lead Legal & Technical French Linguist',
    primaryLanguage: 'French (Native)',
    secondaryLanguage: 'English (Fluent C2)',
    fluencyLevel: 'DALF C2',
    technicalSkills: ['Patent Review', 'Cross-border Contracts', 'ISO Compliance', 'CAT Tools (Trados, MemoQ)'],
    yearsExperience: 11,
    location: 'Chennai / Paris Liaison',
    availability: 'Immediate (48h)',
    rating: 5.0,
    completedProjects: 88
  },
  {
    id: 'wq-tal-03',
    name: 'Klaus Weber',
    role: 'Automotive & Embedded Systems German SME',
    primaryLanguage: 'German (Native)',
    secondaryLanguage: 'English (Fluent C2)',
    fluencyLevel: 'C2 Mastery',
    technicalSkills: ['AUTOSAR', 'Embedded C/C++', 'CAN Protocol', 'Technical SOP Translation'],
    yearsExperience: 8,
    location: 'Bangalore Hub',
    availability: '2 Weeks',
    rating: 4.95,
    completedProjects: 36
  },
  {
    id: 'wq-tal-04',
    name: 'Sofia Hernandez',
    role: 'Full-Stack Bilingual AI Prompt Engineer',
    primaryLanguage: 'Spanish (Native)',
    secondaryLanguage: 'English (Fluent C1)',
    fluencyLevel: 'C1 Fluent',
    technicalSkills: ['Python', 'TypeScript', 'LLM Evaluation', 'React', 'RAG Pipelines'],
    yearsExperience: 6,
    location: 'Bangalore / Remote',
    availability: 'Immediate (48h)',
    rating: 4.92,
    completedProjects: 29
  },
  {
    id: 'wq-tal-05',
    name: 'Wei Zhang',
    role: 'Semiconductor & Hardware Localization Specialist',
    primaryLanguage: 'Mandarin (Native)',
    secondaryLanguage: 'English (Fluent C1)',
    fluencyLevel: 'Native',
    technicalSkills: ['Schematics Localization', 'ASIC/FPGA Documentation', 'Technical Manuals'],
    yearsExperience: 12,
    location: 'Chennai Tech Center',
    availability: '1 Month',
    rating: 4.97,
    completedProjects: 64
  }
];

export const DEPARTMENT_CONTACTS: DepartmentContact[] = [
  {
    id: 'careers',
    department: 'Job Search & Careers',
    email: 'careers@wisdomq.in',
    purpose: 'Submit CVs, explore bilingual openings, contractor roster admission.',
    icon: 'UserCheck',
    sla: '< 24 Hours Response',
    headName: 'Talent Acquisition Desk'
  },
  {
    id: 'recruitment',
    department: 'Enterprise Hiring',
    email: 'recruitment@wisdomq.in',
    purpose: 'Enterprise talent requests, bulk staffing contracts, bespoke hiring drives.',
    icon: 'Briefcase',
    sla: '< 4 Hours Response',
    headName: 'Client Staffing Team'
  },
  {
    id: 'hr',
    department: 'Human Resources',
    email: 'hr@wisdomq.in',
    purpose: 'Employee verification, benefits, contractor compliance, policy inquiries.',
    icon: 'ShieldCheck',
    sla: '< 24 Hours Response',
    headName: 'People Operations'
  },
  {
    id: 'sales',
    department: 'Corporate Sales & Solutions',
    email: 'sales@wisdomq.in',
    purpose: 'RFP/RFI submissions, translation MSAs, institutional training proposals.',
    icon: 'TrendingUp',
    sla: '< 2 Hours Response',
    headName: 'Enterprise Growth'
  },
  {
    id: 'accounts',
    department: 'Business & Billing Enquiries',
    email: 'accounts@wisdomq.in',
    purpose: 'Invoicing, tax compliance, international wire transfers, billing queries.',
    icon: 'CreditCard',
    sla: '< 24 Hours Response',
    headName: 'Finance & Treasury'
  },
  {
    id: 'support',
    department: 'Technical & LMS Support',
    email: 'support@wisdomq.in',
    purpose: 'Portal access, e-learning platform assistance, SLA escalation tickets.',
    icon: 'Headphones',
    sla: '< 1 Hour Response (24/7)',
    headName: 'Global Helpdesk'
  },
  {
    id: 'general',
    department: 'General Queries',
    email: 'info@wisdomq.in',
    purpose: 'General partnerships, media, vendor onboarding, community initiatives.',
    icon: 'Mail',
    sla: '< 12 Hours Response',
    headName: 'Corporate Secretariat'
  }
];

export const HUBS_DATA = [
  {
    city: 'Bangalore',
    title: 'Global Innovation & Staffing Center',
    phone: '080-1234567890',
    fullPhone: '+91 80 1234 5678',
    address: 'Embassy TechVillage, Outer Ring Road, Devarabisanahalli, Bangalore, KA 560103',
    timezone: 'IST (UTC+5:30)',
    focus: 'Tech Architecture, AI Enablement, Staffing Logistics'
  },
  {
    city: 'Chennai',
    title: 'Center of Linguistic & Translation Excellence',
    phone: '044-1234567890',
    fullPhone: '+91 44 1234 5678',
    address: 'TIDEL Park, Rajiv Gandhi Salai (OMR), Taramani, Chennai, TN 600113',
    timezone: 'IST (UTC+5:30)',
    focus: 'Multilingual Translation, DELF/IELTS Cohorts, Quality Audits'
  }
];
