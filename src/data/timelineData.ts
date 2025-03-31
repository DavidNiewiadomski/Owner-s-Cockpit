
// Timeline data exports

export const timelineData = [
  {
    date: new Date(),
    formattedDate: 'Today',
    events: [
      {
        id: '1',
        title: 'Concrete pour completed',
        time: '9:30 AM',
        type: 'construction',
        project: 'Downtown High-Rise',
        description: 'Foundation concrete pour completed on schedule',
        realityCapture: {
          available: true,
          date: 'Today, 9:30 AM',
          url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg'
        },
        user: {
          name: 'John Contractor',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
        }
      },
      {
        id: '2',
        title: 'Material delivery delayed',
        time: '11:45 AM',
        type: 'delivery',
        project: 'Riverside Complex',
        description: 'Steel beam delivery delayed by 2 days due to transportation issues',
        user: {
          name: 'Sarah Logistics',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e'
        }
      },
      {
        id: '3',
        title: 'Inspection scheduled',
        time: '2:15 PM',
        type: 'inspection',
        project: 'Corporate Offices',
        description: 'Electrical inspection scheduled for tomorrow at 10:00 AM',
        user: {
          name: 'Mike Inspector',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f'
        }
      }
    ]
  },
  {
    date: new Date(Date.now() - 86400000),
    formattedDate: 'Yesterday',
    events: [
      {
        id: '4',
        title: 'Design review meeting',
        time: '10:00 AM',
        type: 'meeting',
        project: 'Downtown High-Rise',
        description: 'Final design review with architects and engineers',
        users: [
          {
            name: 'Jennifer Architect',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g'
          },
          {
            name: 'David Engineer',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h'
          },
          {
            name: 'Lisa Project Manager',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i'
          },
          {
            name: 'Robert Owner',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704j'
          }
        ]
      },
      {
        id: '5',
        title: 'Budget adjustment approved',
        time: '3:30 PM',
        type: 'document',
        project: 'Riverside Complex',
        description: 'Additional $250,000 approved for foundation reinforcement',
        user: {
          name: 'Robert Owner',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704j'
        }
      }
    ]
  },
  {
    date: new Date(Date.now() - 172800000),
    formattedDate: '2 days ago',
    events: [
      {
        id: '6',
        title: 'Safety incident reported',
        time: '8:45 AM',
        type: 'incident',
        project: 'Corporate Offices',
        description: 'Minor injury reported, worker treated and returned to work',
        user: {
          name: 'Tom Safety',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704k'
        }
      },
      {
        id: '7',
        title: 'Weather delay',
        time: '12:00 PM',
        type: 'delay',
        project: 'Downtown High-Rise',
        description: 'Work suspended due to high winds, expected to resume tomorrow',
        user: {
          name: 'Lisa Project Manager',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i'
        }
      }
    ]
  }
];

export const ganttData = [
  { name: 'Site Preparation', actualStart: 0, actualEnd: 4, plannedStart: 0, plannedEnd: 5, completion: 100 },
  { name: 'Foundation', actualStart: 4, actualEnd: 8, plannedStart: 5, plannedEnd: 10, completion: 100 },
  { name: 'Structural Framework', actualStart: 8, actualEnd: 15, plannedStart: 10, plannedEnd: 18, completion: 100 },
  { name: 'Exterior Walls', actualStart: 15, actualEnd: 18, plannedStart: 18, plannedEnd: 22, completion: 60 },
  { name: 'Roofing', actualStart: 18, actualEnd: null, plannedStart: 22, plannedEnd: 26, completion: 20 },
  { name: 'Interior Rough-In', actualStart: null, actualEnd: null, plannedStart: 26, plannedEnd: 32, completion: 0 },
  { name: 'Drywall', actualStart: null, actualEnd: null, plannedStart: 32, plannedEnd: 36, completion: 0 },
  { name: 'Interior Finishes', actualStart: null, actualEnd: null, plannedStart: 36, plannedEnd: 42, completion: 0 },
  { name: 'Flooring', actualStart: null, actualEnd: null, plannedStart: 42, plannedEnd: 46, completion: 0 },
  { name: 'Painting', actualStart: null, actualEnd: null, plannedStart: 46, plannedEnd: 50, completion: 0 },
  { name: 'Fixtures & Equipment', actualStart: null, actualEnd: null, plannedStart: 50, plannedEnd: 54, completion: 0 },
  { name: 'Final Inspection', actualStart: null, actualEnd: null, plannedStart: 54, plannedEnd: 55, completion: 0 },
  { name: 'Handover', actualStart: null, actualEnd: null, plannedStart: 55, plannedEnd: 56, completion: 0 }
];

export const delayMetricsData = [
  { name: 'Site Preparation', planned: 5, actual: 4, variance: -1 },
  { name: 'Foundation', planned: 5, actual: 4, variance: -1 },
  { name: 'Structural Framework', planned: 8, actual: 7, variance: -1 },
  { name: 'Exterior Walls', planned: 4, actual: 3, variance: -1 },
  { name: 'Roofing', planned: 4, actual: 5, variance: 1 },
  { name: 'Interior Rough-In', planned: 6, actual: null, variance: null },
  { name: 'Drywall', planned: 4, actual: null, variance: null },
  { name: 'Interior Finishes', planned: 6, actual: null, variance: null },
  { name: 'Flooring', planned: 4, actual: null, variance: null },
  { name: 'Painting', planned: 4, actual: null, variance: null },
  { name: 'Fixtures & Equipment', planned: 4, actual: null, variance: null },
  { name: 'Final Inspection', planned: 1, actual: null, variance: null },
  { name: 'Handover', planned: 1, actual: null, variance: null }
];

export const milestoneData = [
  { 
    name: 'Project Kickoff', 
    plannedDate: 'Nov 15, 2023', 
    actualDate: 'Nov 15, 2023', 
    status: 'completed' as const,
    description: 'Initial meeting with all stakeholders to define project scope',
    realityCapture: {
      available: false
    } 
  },
  { 
    name: 'Permits Approved', 
    plannedDate: 'Dec 05, 2023', 
    actualDate: 'Dec 20, 2023', 
    status: 'delayed' as const,
    description: 'Building permits approved by local authorities',
    realityCapture: {
      available: false
    } 
  },
  { 
    name: 'Foundation Complete', 
    plannedDate: 'Jan 30, 2024', 
    actualDate: 'Jan 25, 2024', 
    status: 'completed' as const,
    description: 'Foundation work completed and inspected',
    realityCapture: {
      available: true,
      date: 'Jan 25, 2024',
      url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-construction-site-nav_0.jpg'
    } 
  },
  { 
    name: 'Structural Framework', 
    plannedDate: 'Mar 15, 2024', 
    actualDate: 'Mar 10, 2024', 
    status: 'completed' as const,
    description: 'Main building structure completed',
    realityCapture: {
      available: true,
      date: 'Mar 10, 2024',
      url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-apartments-nav.jpg'
    } 
  },
  { 
    name: 'Exterior Closure', 
    plannedDate: 'Apr 30, 2024', 
    actualDate: 'In Progress', 
    status: 'in-progress' as const,
    description: 'Building envelope and exterior walls completed',
    realityCapture: {
      available: true,
      date: 'Apr 15, 2024',
      url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg'
    } 
  },
  { 
    name: 'Roofing Complete', 
    plannedDate: 'May 30, 2024', 
    actualDate: 'Not Started', 
    status: 'upcoming' as const,
    description: 'Roof installation and weatherproofing' 
  },
  { 
    name: 'Interior Rough-In', 
    plannedDate: 'Jul 15, 2024', 
    actualDate: 'Not Started', 
    status: 'upcoming' as const,
    description: 'Electrical, plumbing, and HVAC rough-in work' 
  }
];

export const timelineInsights = [
  {
    title: 'Critical Path Impact',
    content: 'Roofing delay of 1 week may impact Interior Rough-In schedule. Consider resource reallocation.',
    type: 'warning' as const
  },
  {
    title: 'Completion Forecast',
    content: 'Project is currently tracking to complete 2 weeks early. Potential for early occupancy.',
    type: 'success' as const
  },
  {
    title: 'Investment Impact',
    content: 'Early completion could provide additional rental income of $125,000 in Q3 2024.',
    type: 'info' as const
  }
];

export const getEventIcon = (type: string) => {
  switch (type) {
    case 'construction':
      return 'HardHat';
    case 'delivery':
      return 'Truck';
    case 'inspection':
      return 'CheckCircle';
    case 'meeting':
      return 'Calendar';
    case 'document':
      return 'FileText';
    case 'incident':
      return 'AlertTriangle';
    case 'delay':
      return 'Clock';
    default:
      return 'Building';
  }
};

export const getEventBadgeClass = (type: string) => {
  switch (type) {
    case 'construction':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
    case 'delivery':
      return 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400';
    case 'inspection':
      return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
    case 'meeting':
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
    case 'document':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    case 'incident':
      return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    case 'delay':
      return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  }
};
