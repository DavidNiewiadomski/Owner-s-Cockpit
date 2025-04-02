
export interface Communication {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'video' | 'message';
  contact: {
    name: string;
    avatar?: string;
  };
  subject?: string;
  excerpt?: string;
  date: string;
  time: string;
  project: string;
}

export interface ScheduledEvent {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'video';
  date: string;
  time: string;
  duration: string;
  participants: string[];
  project: string;
}

export interface CommunicationInsight {
  title: string;
  content: string;
  type: 'warning' | 'info' | 'success';
}

export const recentCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    contact: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    subject: 'Downtown Project Update',
    excerpt: 'Just wanted to update you on the latest developments with the facade materials for the Downtown High-Rise project...',
    date: 'Today',
    time: '10:30 AM',
    project: 'Downtown High-Rise'
  },
  {
    id: '2',
    type: 'call',
    contact: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    subject: 'Budget Discussion',
    date: 'Yesterday',
    time: '3:45 PM',
    project: 'Riverside Complex'
  },
  {
    id: '3',
    type: 'meeting',
    contact: {
      name: 'Project Team Meeting',
    },
    subject: 'Weekly Progress Update',
    excerpt: 'Discussed timeline adjustments and resource allocation for the next phase of the East Tower project.',
    date: 'May 15',
    time: '2:00 PM',
    project: 'East Tower'
  },
  {
    id: '4',
    type: 'video',
    contact: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    subject: 'Design Review',
    date: 'May 12',
    time: '11:15 AM',
    project: 'Corporate Office Park'
  },
  {
    id: '5',
    type: 'message',
    contact: {
      name: 'Mark Johnson',
    },
    excerpt: 'The updated project timeline with the latest milestones has been approved by the board.',
    date: 'May 10',
    time: '4:20 PM',
    project: 'Waterfront Development'
  }
];

export const scheduledEvents: ScheduledEvent[] = [
  {
    id: '1',
    title: 'Weekly Project Status Meeting',
    type: 'meeting',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '1h',
    participants: ['Sarah Wilson', 'Alex Rodriguez', 'Lisa Chen', 'Mark Johnson'],
    project: 'Downtown High-Rise'
  },
  {
    id: '2',
    title: 'Budget Review Call',
    type: 'call',
    date: 'May 20',
    time: '2:30 PM',
    duration: '45m',
    participants: ['Alex Rodriguez', 'Finance Team'],
    project: 'Riverside Complex'
  },
  {
    id: '3',
    title: 'Design Team Presentation',
    type: 'video',
    date: 'May 22',
    time: '11:00 AM',
    duration: '1h 30m',
    participants: ['Lisa Chen', 'Design Team', 'Stakeholders'],
    project: 'East Tower'
  }
];

export const communicationInsights: CommunicationInsight[] = [
  {
    title: 'Response Needed',
    content: 'Alex Rodriguez is waiting for your approval on the revised budget for Riverside Complex.',
    type: 'warning'
  },
  {
    title: 'Meeting Reminder',
    content: 'Weekly project status meeting scheduled for tomorrow at 10am with the Downtown High-Rise team.',
    type: 'info'
  },
  {
    title: 'Communication Suggestion',
    content: 'You haven\'t updated the Waterfront Development team in 5 days. Consider scheduling a check-in.',
    type: 'info'
  }
];
