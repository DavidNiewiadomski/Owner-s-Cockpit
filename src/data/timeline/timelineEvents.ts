
export const timelineEvents = [
  {
    id: "1",
    title: "Foundation Complete",
    date: "March 12, 2024",
    description: "Foundation work completed ahead of schedule",
    status: "completed" as const,
    impact: "high" as const,
    financial: {
      amount: 15000,
      type: "under" as const
    },
    realityCapture: {
      available: true,
      date: "March 12, 2024",
      url: "https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg"
    }
  },
  {
    id: "2",
    title: "Structural Framework",
    date: "April 15, 2024",
    description: "Steel framework installation in progress",
    status: "in-progress" as const,
    realityCapture: {
      available: true,
      date: "April 10, 2024",
      url: "https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-construction-site-nav_0.jpg"
    }
  },
  {
    id: "3",
    title: "Equipment Delivery",
    date: "April 25, 2024",
    description: "Elevator equipment delivery scheduled",
    status: "upcoming" as const
  },
  {
    id: "4",
    title: "Window Installation",
    date: "May 1, 2024",
    description: "Custom window delivery delayed by supplier",
    status: "delayed" as const,
    impact: "medium" as const,
    financial: {
      amount: 12000,
      type: "over" as const
    }
  }
];
