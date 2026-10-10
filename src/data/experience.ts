export interface Role {
  title: string
  dates: string
}

export interface Position {
  org: string
  orgNote?: string
  years: string
  roles: Role[]
  summary?: string
  highlights?: string[]
  clients?: Position[]
}

// Newest first. `years` is what shows in the timeline gutter.
export const experience: Position[] = [
  {
    org: 'Independent',
    years: '2023–',
    roles: [{ title: 'Fractional CTO', dates: 'Sep 2023 – present' }],
    summary:
      'Technical and product leadership for healthcare startups and similarly regulated companies (life insurance, fintech). The work centers on HIPAA compliance, regulatory strategy and platform architecture that scales.',
    clients: [
      {
        org: 'imaware',
        years: '2023–',
        roles: [{ title: 'Consulting CTO', dates: 'Sep 2023 – present' }],
        summary:
          'Hands-on leader across product, technology, security, sales, regulatory and logistics. Completed the company’s move from direct-to-consumer to B2B.',
        highlights: [
          'Consolidated two platforms into one and retired the paid third-party services the old one depended on, cutting cloud spend 76% from 2024 levels',
          'Cut cost of goods per at-home test about 22% by moving to a new lab partner, simplifying kitting and changing shipping speeds',
          'Led the repositioning from DTC to B2B, including new MSAs and pricing',
          'Own technology, security, regulatory and operational initiatives',
        ],
      },
      {
        // Unnamed: the consulting agreement bars using the company's name without written approval
        org: 'Cancer diagnostics company',
        years: '2026–',
        roles: [{ title: 'Technical and product advisor', dates: 'Aug 2026 – present' }],
        summary:
          'Architecture and product direction for the clinician and patient software around the company’s first test.',
        highlights: [
          'Designing the clinician portal for ordering tests and reviewing results, and its integrations with CRM, LIMS and billing',
          'Defining patient registration, e-consent, payment and results delivery, starting with patient pay and leaving room for insurance billing',
          'Advising on HIPAA handling of PHI, SOC 2 readiness, staffing and launch sequencing',
        ],
      },
      {
        org: 'Yosa',
        orgNote: 'mental health platform',
        years: '2025–',
        roles: [{ title: 'Advisor', dates: 'Mar 2025 – present' }],
        summary:
          'Advise the founders on product, technology and strategy, and join calls with prospective clients and partners.',
      },
      {
        // Unnamed: the consulting agreement bars using the company's name without written approval
        org: 'Life insurance agency',
        years: '2024–',
        roles: [{ title: 'Technical advisor', dates: 'Nov 2024 – present' }],
        summary: 'Planned, and now oversee, the build of a platform to automate the agency’s operations.',
        highlights: [
          'Turned requirements into a prioritized roadmap, architecture decisions, a resourcing plan and a tooling budget so the build could start in Q1 2025',
          'Oversee the outside developer: review code, infrastructure and architecture, and keep tooling and hosting spend on budget',
          'Assessed the security posture, planned the path to SOC 2 Type 2 and HIPAA, and worked with the IT provider on security projects',
        ],
      },
    ],
  },
  {
    org: 'BalancedWork',
    years: '2023–24',
    roles: [{ title: 'Co-founder & CTO', dates: 'Nov 2023 – May 2024' }],
    summary:
      'Built an application that ingested calendar, organizational and related data to recommend ways to improve team relationships and hybrid work schedules.',
  },
  {
    org: 'binx health',
    orgNote: 'digital business acquired by imaware',
    years: '2018–23',
    roles: [
      { title: 'VP, Digital Product & Technology', dates: 'Feb 2022 – Aug 2023' },
      { title: 'Head of Digital Product', dates: 'Jul 2021 – Feb 2022' },
      { title: 'Head of Software Engineering', dates: 'Apr 2019 – Jul 2021' },
      { title: 'Director, Software Engineering', dates: 'May 2018 – Apr 2019' },
    ],
    summary:
      'Co-founded and architected binx everywhere, the digital platform that delivered diagnostics as a service at population scale. The platform was HIPAA-compliant, completed SOC 2 Type 2 audits, and served state health departments, universities and healthcare organizations.',
    highlights: [
      'Built teams that combined in-person, remote, hybrid and near-shore engineers',
      'Wrote and executed the business plan for COVID-19 population screening programs and UK expansion',
      'Led the usability study and FDA filing for one of the first EUAs for a self-collected nasal swab',
      'Set the product roadmap for the digital platform and the instrument software',
      'Supported the existing binx io instrument software through its 510(k) filing and Windows 10 IoT migration',
      'Prepared the digital business for a Series A spinout, pitched investors, and supported its sale to imaware',
    ],
  },
  {
    org: 'Good Start Genetics',
    orgNote: 'acquired by Invitae',
    years: '2012–18',
    roles: [
      { title: 'Engineering Manager', dates: 'Apr 2016 – May 2018' },
      { title: 'Lead Software Engineer', dates: 'Mar 2015 – Apr 2016' },
      { title: 'Senior Software Engineer', dates: 'May 2014 – Mar 2015' },
      { title: 'Software Engineer', dates: 'May 2012 – May 2014' },
    ],
    summary:
      'Technical lead and manager for the development organization: code quality, staffing, software design, enterprise architecture and people management.',
    highlights: [
      'Designed a hiring program that brought on 7+ developers in 6 months, plus 5 more departmental hires',
      'Led development and architecture of VeriYou, the company’s first consumer-initiated carrier screening product',
      'Launched a patient-first experience with insurance price transparency that improved cash flow',
      'Ran an agile turnaround of the department that raised velocity and contributed to the sale of the company',
      'Moved the company’s infrastructure from on-premise to AWS',
    ],
  },
  {
    org: 'Wellington Management',
    years: '2009–12',
    roles: [
      { title: 'Systems Engineer', dates: 'Jan 2011 – May 2012' },
      { title: 'Systems Support Engineer', dates: 'Jul 2009 – Jan 2011' },
    ],
    summary:
      'Built software for the Legal and Compliance department that checked trades against client and government rules.',
  },
]

export const services = [
  {
    name: 'Product and technology strategy',
    detail:
      'Taking products from first idea to commercial launch, mostly in digital health and lab diagnostics.',
    covers:
      'Roadmaps, platform design, GCP and AWS, Kubernetes, cloud cost, LIS/LIMS, patient portals, M&A support',
  },
  {
    name: 'Teams',
    detail: 'Hiring and growing engineering teams that work in person, remote, hybrid and near-shore.',
    covers: 'Hiring programs, engineering management, cross-functional leadership',
  },
  {
    name: 'Security and compliance',
    detail: 'Building platforms and security programs that hold up to HIPAA, SOC 2 and FDA scrutiny.',
    covers: 'HIPAA and PHI handling, SOC 2 Type 2, FDA EUA, security operations',
  },
  {
    name: 'Business operations',
    detail:
      'Working with operations, partnerships, regulatory, finance and legal so the technology serves the business.',
    covers: 'MSAs and pricing, vendor and partner integrations, DTC-to-B2B transitions',
  },
]
