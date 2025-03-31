
export const projects = [
  {
    id: '1',
    title: 'East Tower Construction',
    description: 'Multi-story residential building with 200 units in downtown area.',
    progress: 75,
    status: 'on-track' as const,
    dueDate: 'Sep 30, 2024',
    teamMembers: [
      { name: 'Alice Smith' },
      { name: 'Bob Johnson' },
      { name: 'Carol Williams' },
      { name: 'David Brown' },
    ]
  },
  {
    id: '2',
    title: 'Westside Park Development',
    description: 'Public park with recreational facilities and gardens.',
    progress: 45,
    status: 'at-risk' as const,
    dueDate: 'Nov 15, 2024',
    teamMembers: [
      { name: 'Eve Taylor' },
      { name: 'Frank Miller' },
      { name: 'Grace Davis' },
    ]
  },
  {
    id: '3',
    title: 'North Bridge Repair',
    description: 'Structural repairs and renovation of existing bridge.',
    progress: 30,
    status: 'delayed' as const,
    dueDate: 'Dec 10, 2024',
    teamMembers: [
      { name: 'Henry Wilson' },
      { name: 'Irene Martin' },
    ]
  },
];

// Project-specific timeline events
export const projectTimelineEvents = {
  '1': [
    {
      id: '1-1',
      title: 'East Tower Foundation Complete',
      date: 'May 12, 2024',
      description: 'Foundation work finished ahead of schedule',
      status: 'completed' as const,
      financial: {
        amount: 15000,
        type: 'under' as const,
      }
    },
    {
      id: '1-2',
      title: 'Structural Framework',
      date: 'Today',
      description: 'Building primary structural components',
      status: 'in-progress' as const,
      impact: 'high' as const
    },
    {
      id: '1-3',
      title: 'Facade Installation',
      date: 'August 30, 2024',
      description: 'Installation of exterior glass panels',
      status: 'upcoming' as const
    },
    {
      id: '1-4',
      title: 'Interior Finishing',
      date: 'October 15, 2024',
      status: 'upcoming' as const
    },
  ],
  '2': [
    {
      id: '2-1',
      title: 'Land Clearing Complete',
      date: 'April 20, 2024',
      description: 'Site preparation and land clearing finished',
      status: 'completed' as const,
      financial: {
        amount: 8000,
        type: 'over' as const,
      }
    },
    {
      id: '2-2',
      title: 'Drainage System Installation',
      date: 'Today',
      description: 'Installing park-wide drainage systems',
      status: 'in-progress' as const,
      impact: 'medium' as const
    },
    {
      id: '2-3',
      title: 'Pathway Construction',
      date: 'July 25, 2024',
      description: 'Building walking and biking paths',
      status: 'upcoming' as const
    },
    {
      id: '2-4',
      title: 'Playground Equipment',
      date: 'September 5, 2024',
      status: 'upcoming' as const
    },
  ],
  '3': [
    {
      id: '3-1',
      title: 'Bridge Assessment',
      date: 'March 10, 2024',
      description: 'Structural inspection and assessment completed',
      status: 'completed' as const,
      financial: {
        amount: 0,
        type: 'neutral' as const,
      }
    },
    {
      id: '3-2',
      title: 'Traffic Diversion Plan',
      date: 'April 28, 2024',
      description: 'Finalizing alternative traffic routes',
      status: 'completed' as const
    },
    {
      id: '3-3',
      title: 'Bridge Reinforcement',
      date: 'Today',
      description: 'Structural reinforcement of support columns',
      status: 'in-progress' as const,
      impact: 'high' as const
    },
    {
      id: '3-4',
      title: 'Surface Repaving',
      date: 'August 15, 2024',
      status: 'upcoming' as const
    },
  ],
  'all': [
    {
      id: 'all-1',
      title: 'Project Portfolio Review',
      date: 'April 15, 2024',
      description: 'Quarterly review of all active construction projects',
      status: 'completed' as const,
      financial: {
        amount: 0,
        type: 'neutral' as const,
      }
    },
    {
      id: 'all-2',
      title: 'Safety Policy Update',
      date: 'Today',
      description: 'Company-wide safety protocol implementation',
      status: 'in-progress' as const,
      impact: 'high' as const
    },
    {
      id: 'all-3',
      title: 'Vendor Contract Renewals',
      date: 'July 30, 2024',
      description: 'Annual review and renewal of key supplier contracts',
      status: 'upcoming' as const
    },
    {
      id: 'all-4',
      title: 'Year-End Financial Close',
      date: 'December 15, 2024',
      status: 'upcoming' as const
    },
  ]
};

// Project-specific documents
export const projectDocuments = {
  '1': [
    {
      id: '1-1',
      name: 'East Tower Blueprint.pdf',
      type: 'pdf' as const,
      size: '12.7 MB',
      updatedAt: '2 days ago',
      project: 'East Tower'
    },
    {
      id: '1-2',
      name: 'Residential Unit Layouts.pdf',
      type: 'pdf' as const,
      size: '8.3 MB',
      updatedAt: '1 week ago',
      project: 'East Tower'
    },
    {
      id: '1-3',
      name: 'Material Specifications.docx',
      type: 'text' as const,
      size: '1.5 MB',
      updatedAt: '3 days ago',
      project: 'East Tower'
    },
    {
      id: '1-4',
      name: 'Construction Timeline.xlsx',
      type: 'spreadsheet' as const,
      size: '0.9 MB',
      updatedAt: '5 days ago',
      project: 'East Tower'
    },
  ],
  '2': [
    {
      id: '2-1',
      name: 'Park Layout Design.pdf',
      type: 'pdf' as const,
      size: '9.2 MB',
      updatedAt: '3 days ago',
      project: 'Westside Park'
    },
    {
      id: '2-2',
      name: 'Landscaping Plan.pdf',
      type: 'pdf' as const,
      size: '7.8 MB',
      updatedAt: '1 week ago',
      project: 'Westside Park'
    },
    {
      id: '2-3',
      name: 'Site Survey Images.jpg',
      type: 'image' as const,
      size: '15.3 MB',
      updatedAt: '2 days ago',
      project: 'Westside Park'
    },
    {
      id: '2-4',
      name: 'Environmental Impact Report.docx',
      type: 'text' as const,
      size: '2.3 MB',
      updatedAt: '1 day ago',
      project: 'Westside Park'
    },
  ],
  '3': [
    {
      id: '3-1',
      name: 'Bridge Structural Analysis.pdf',
      type: 'pdf' as const,
      size: '11.5 MB',
      updatedAt: '4 days ago',
      project: 'North Bridge'
    },
    {
      id: '3-2',
      name: 'Traffic Flow Models.xlsx',
      type: 'spreadsheet' as const,
      size: '1.7 MB',
      updatedAt: '2 days ago',
      project: 'North Bridge'
    },
    {
      id: '3-3',
      name: 'Bridge Inspection Photos.jpg',
      type: 'image' as const,
      size: '18.2 MB',
      updatedAt: '1 week ago',
      project: 'North Bridge'
    },
    {
      id: '3-4',
      name: 'Material Testing Results.pdf',
      type: 'pdf' as const,
      size: '3.5 MB',
      updatedAt: '3 days ago',
      project: 'North Bridge'
    },
  ],
  'all': [
    {
      id: 'all-1',
      name: 'Company Safety Manual.pdf',
      type: 'pdf' as const,
      size: '5.2 MB',
      updatedAt: '1 week ago',
      project: 'All Projects'
    },
    {
      id: 'all-2',
      name: 'Quarterly Financial Report.xlsx',
      type: 'spreadsheet' as const,
      size: '1.8 MB',
      updatedAt: '3 days ago',
      project: 'All Projects'
    },
    {
      id: 'all-3',
      name: 'Project Management Guidelines.docx',
      type: 'text' as const,
      size: '1.2 MB',
      updatedAt: '5 days ago',
      project: 'All Projects'
    },
    {
      id: 'all-4',
      name: 'Corporate Branding Assets.zip',
      type: 'text' as const,
      size: '25.7 MB',
      updatedAt: '2 weeks ago',
      project: 'All Projects'
    },
  ]
};

// Project-specific performance data
export const projectPerformanceData = {
  '1': [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 25 },
    { name: 'Mar', value: 40 },
    { name: 'Apr', value: 55 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 75 },
    { name: 'Jul', value: 75 },
  ],
  '2': [
    { name: 'Jan', value: 5 },
    { name: 'Feb', value: 15 },
    { name: 'Mar', value: 20 },
    { name: 'Apr', value: 30 },
    { name: 'May', value: 35 },
    { name: 'Jun', value: 40 },
    { name: 'Jul', value: 45 },
  ],
  '3': [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 5 },
    { name: 'Mar', value: 10 },
    { name: 'Apr', value: 15 },
    { name: 'May', value: 20 },
    { name: 'Jun', value: 25 },
    { name: 'Jul', value: 30 },
  ],
  'all': [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 55 },
    { name: 'Apr', value: 57 },
    { name: 'May', value: 62 },
    { name: 'Jun', value: 68 },
    { name: 'Jul', value: 72 },
  ]
};

// Project-specific property data
export const projectPropertyData = {
  '1': {
    propertyName: "East Tower Residences",
    propertyType: "Residential High-Rise",
    location: "Downtown Metro Area",
    squareFootage: 320000,
    floors: 32,
    constructionStartDate: "January 10, 2024",
    estimatedCompletionDate: "September 30, 2025",
    currentPhase: "Structural Framework",
    completionPercentage: 75,
    keyContacts: [
      { role: "Project Manager", name: "Alice Smith", contact: "alice.smith@example.com" },
      { role: "Site Engineer", name: "Bob Johnson", contact: "bob.johnson@example.com" },
      { role: "Architect", name: "Carol Williams", contact: "carol.williams@example.com" },
      { role: "Owner Representative", name: "David Brown", contact: "david.brown@example.com" }
    ],
    permits: [
      { type: "Building Permit", status: "approved" as const, date: "2023-12-10" },
      { type: "Electrical Permit", status: "approved" as const, date: "2024-01-15" },
      { type: "Plumbing Permit", status: "approved" as const, date: "2024-01-20" }
    ],
    inspections: [
      { type: "Foundation", status: "passed" as const, date: "2024-03-05", notes: "Passed with no issues" },
      { type: "Structural Framing", status: "passed" as const, date: "2024-05-10", notes: "Minor adjustments required" },
      { type: "Electrical Rough-In", status: "scheduled" as const, date: "2024-08-15" }
    ]
  },
  '2': {
    propertyName: "Westside Park",
    propertyType: "Public Recreation Area",
    location: "Western District",
    squareFootage: 580000,
    floors: 0,
    constructionStartDate: "February 20, 2024",
    estimatedCompletionDate: "November 15, 2025",
    currentPhase: "Landscaping and Drainage",
    completionPercentage: 45,
    keyContacts: [
      { role: "Project Manager", name: "Eve Taylor", contact: "eve.taylor@example.com" },
      { role: "Landscape Architect", name: "Frank Miller", contact: "frank.miller@example.com" },
      { role: "Civil Engineer", name: "Grace Davis", contact: "grace.davis@example.com" },
      { role: "City Representative", name: "Hannah Jones", contact: "hannah.jones@example.com" }
    ],
    permits: [
      { type: "Land Development Permit", status: "approved" as const, date: "2024-01-25" },
      { type: "Environmental Clearance", status: "approved" as const, date: "2024-02-10" },
      { type: "Water Management Permit", status: "pending" as const, date: "2024-05-15" }
    ],
    inspections: [
      { type: "Soil Testing", status: "passed" as const, date: "2024-03-20", notes: "Soil composition suitable for planned structures" },
      { type: "Drainage System", status: "scheduled" as const, date: "2024-06-30" },
      { type: "Playground Safety", status: "not-scheduled" as const }
    ]
  },
  '3': {
    propertyName: "North Bridge",
    propertyType: "Infrastructure",
    location: "Northern District",
    squareFootage: 125000,
    floors: 0,
    constructionStartDate: "March 15, 2024",
    estimatedCompletionDate: "December 10, 2025",
    currentPhase: "Structural Reinforcement",
    completionPercentage: 30,
    keyContacts: [
      { role: "Project Manager", name: "Henry Wilson", contact: "henry.wilson@example.com" },
      { role: "Structural Engineer", name: "Irene Martin", contact: "irene.martin@example.com" },
      { role: "Transportation Coordinator", name: "Jack Thompson", contact: "jack.thompson@example.com" },
      { role: "Public Works Officer", name: "Katherine Lee", contact: "katherine.lee@example.com" }
    ],
    permits: [
      { type: "Infrastructure Permit", status: "approved" as const, date: "2024-02-28" },
      { type: "Traffic Management Plan", status: "approved" as const, date: "2024-03-10" },
      { type: "Waterway Construction Permit", status: "approved" as const, date: "2024-03-25" }
    ],
    inspections: [
      { type: "Pre-Construction Assessment", status: "passed" as const, date: "2024-03-05", notes: "Additional reinforcement required" },
      { type: "Foundation Support", status: "passed" as const, date: "2024-04-30", notes: "Meets engineering specifications" },
      { type: "Structural Integrity", status: "scheduled" as const, date: "2024-07-25" }
    ]
  },
  'all': {
    propertyName: "Portfolio Overview",
    propertyType: "Mixed-Use",
    location: "Multiple Locations",
    squareFootage: 1025000,
    floors: "Various",
    constructionStartDate: "January 10, 2024",
    estimatedCompletionDate: "December 10, 2025",
    currentPhase: "Multiple Phases",
    completionPercentage: 50,
    keyContacts: [
      { role: "Construction Director", name: "Lawrence Parker", contact: "lawrence.parker@example.com" },
      { role: "Financial Controller", name: "Michelle Roberts", contact: "michelle.roberts@example.com" },
      { role: "Operations Manager", name: "Nathan Scott", contact: "nathan.scott@example.com" },
      { role: "Client Relations", name: "Olivia Wilson", contact: "olivia.wilson@example.com" }
    ],
    permits: [
      { type: "Various Building Permits", status: "approved" as const, date: "Multiple" },
      { type: "Environmental Permits", status: "approved" as const, date: "Multiple" },
      { type: "Special Use Permits", status: "pending" as const, date: "Multiple" }
    ],
    inspections: [
      { type: "Safety Compliance", status: "passed" as const, date: "Ongoing", notes: "Regular safety audits" },
      { type: "Quality Assurance", status: "passed" as const, date: "Quarterly", notes: "Continuous improvement process" },
      { type: "Regulatory Compliance", status: "scheduled" as const, date: "July 30, 2024" }
    ]
  }
};

// General data that doesn't need to be project-specific
export const timelineEvents = [
  {
    id: '1',
    title: 'Project Kickoff',
    date: 'March 15, 2024',
    description: 'Initial project meeting and scope definition',
    status: 'completed' as const,
    financial: {
      amount: 0,
      type: 'neutral' as const,
    }
  },
  {
    id: '2',
    title: 'Design Approval',
    date: 'April 10, 2024',
    description: 'Final design approval by stakeholders',
    status: 'completed' as const,
    financial: {
      amount: 25000,
      type: 'under' as const,
    }
  },
  {
    id: '3',
    title: 'Foundation Work',
    date: 'Today',
    description: 'Laying building foundation',
    status: 'in-progress' as const,
    impact: 'high' as const
  },
  {
    id: '4',
    title: 'Structural Framework',
    date: 'August 20, 2024',
    description: 'Building primary structural components',
    status: 'upcoming' as const
  },
  {
    id: '5',
    title: 'Project Completion',
    date: 'December 5, 2024',
    status: 'upcoming' as const
  },
];

export const documents = [
  {
    id: '1',
    name: 'Project Blueprint.pdf',
    type: 'pdf' as const,
    size: '8.5 MB',
    updatedAt: '2 days ago',
    project: 'East Tower'
  },
  {
    id: '2',
    name: 'Site Survey Images.jpg',
    type: 'image' as const,
    size: '12.3 MB',
    updatedAt: '3 days ago',
    project: 'Westside Park'
  },
  {
    id: '3',
    name: 'Budget Forecast.xlsx',
    type: 'spreadsheet' as const,
    size: '1.2 MB',
    updatedAt: '1 week ago',
    project: 'North Bridge'
  },
  {
    id: '4',
    name: 'Contractor Agreement.docx',
    type: 'text' as const,
    size: '567 KB',
    updatedAt: '2 weeks ago',
    project: 'East Tower'
  },
];

export const performanceData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 57 },
  { name: 'May', value: 62 },
  { name: 'Jun', value: 68 },
  { name: 'Jul', value: 72 },
];

export const notifications = [
  { id: 1, title: 'Budget Approval', message: 'East Tower budget increase approved', time: '2 hours ago', read: false },
  { id: 2, title: 'Permit Issued', message: 'Building permit for North Bridge received', time: '5 hours ago', read: false },
  { id: 3, title: 'Inspection Scheduled', message: 'Foundation inspection set for Westside Park', time: 'Yesterday', read: true },
  { id: 4, title: 'Document Updated', message: 'Project Blueprint.pdf has been updated', time: '2 days ago', read: true },
];

export const propertyData = {
  propertyName: "Downtown High-Rise",
  propertyType: "Mixed-Use",
  location: "San Francisco, CA",
  squareFootage: 250000,
  floors: 23,
  constructionStartDate: "November 15, 2023",
  estimatedCompletionDate: "June 30, 2025",
  currentPhase: "Structural Framework",
  completionPercentage: 35,
  keyContacts: [
    { role: "Project Manager", name: "Sarah Wilson", contact: "sarah.wilson@example.com" },
    { role: "General Contractor", name: "Alex Rodriguez", contact: "alex.rodriguez@example.com" },
    { role: "Architect", name: "Lisa Chen", contact: "lisa.chen@example.com" },
    { role: "Permit Coordinator", name: "Robert Smith", contact: "robert.smith@example.com" }
  ],
  permits: [
    { type: "Building Permit", status: "approved" as const, date: "2023-10-15" },
    { type: "Electrical Permit", status: "approved" as const, date: "2023-10-20" },
    { type: "Plumbing Permit", status: "pending" as const, date: "2023-11-05" }
  ],
  inspections: [
    { type: "Foundation", status: "passed" as const, date: "2023-12-10", notes: "Passed with minor recommendations" },
    { type: "Framing", status: "scheduled" as const, date: "2024-01-15" },
    { type: "Electrical Rough-In", status: "not-scheduled" as const }
  ]
};

export const financialData = {
  projectName: "Downtown High-Rise",
  totalBudget: 42500000,
  spending: [
    { category: "Land Acquisition", amount: 12000000, color: "#4c1d95", status: "normal" as const },
    { category: "Site Preparation", amount: 2500000, color: "#2563eb", status: "under" as const, variance: 150000 },
    { category: "Foundation", amount: 3800000, color: "#0891b2", status: "normal" as const },
    { category: "Structural Frame", amount: 4200000, color: "#059669", status: "over" as const, variance: 250000 },
    { category: "Exterior", amount: 1500000, color: "#65a30d", status: "normal" as const },
    { category: "Mechanical/Electrical", amount: 800000, color: "#a5b4fc", status: "normal" as const }
  ],
  changeOrders: [
    { id: "CO-001", description: "Foundation Redesign", amount: 120000, status: "approved" as const, date: "Jan 18, 2024" },
    { id: "CO-002", description: "Material Substitution Savings", amount: -45000, status: "approved" as const, date: "Feb 02, 2024" },
    { id: "CO-003", description: "Additional HVAC Capacity", amount: 85000, status: "pending" as const, date: "Mar 25, 2024" },
    { id: "CO-004", description: "Design Change: Interior Layout", amount: 35000, status: "rejected" as const, date: "Apr 05, 2024" }
  ]
};

export const budgetCategories = [
  { category: "Materials", amount: 2250000, color: "#10B981", status: "normal" as const },
  { category: "Labor", amount: 1850000, color: "#3B82F6", status: "under" as const, variance: -50000 },
  { category: "Equipment", amount: 920000, color: "#8B5CF6", status: "over" as const, variance: 75000 },
  { category: "Permits", amount: 320000, color: "#F97316", status: "normal" as const }
];

export const recentTransactions = [
  { id: "INV-001", description: "Steel Delivery - Downtown Project", amount: 125000, status: "approved" as const, date: "2023-12-15" },
  { id: "INV-002", description: "Concrete Work - Phase 1", amount: 85000, status: "pending" as const, date: "2023-12-18" },
  { id: "INV-003", description: "Electrical Contractor Payment", amount: 42500, status: "approved" as const, date: "2023-12-20" },
  { id: "INV-004", description: "Architect Fees - Design Revisions", amount: 28500, status: "rejected" as const, date: "2023-12-22" }
];
