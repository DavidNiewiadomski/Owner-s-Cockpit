
import { 
  BarChart2, 
  Calendar, 
  FileText, 
  Home, 
  Layers, 
  MessageSquare, 
  Settings, 
  Zap, 
  HandCoins,
  Brush,
  Brain
} from 'lucide-react';

export const navigationItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: Home
  },
  {
    path: "/projects",
    label: "Projects",
    icon: Layers
  },
  {
    path: "/timeline",
    label: "Timeline",
    icon: Calendar
  },
  {
    path: "/documents",
    label: "Documents",
    icon: FileText
  },
  {
    path: "/budget-financials",
    label: "Budget",
    icon: BarChart2
  },
  {
    path: "/investment-impact",
    label: "Investment",
    icon: HandCoins
  },
  {
    path: "/safety-sustainability",
    label: "Safety",
    icon: Zap
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart2
  }
];

export const utilityItems = [
  {
    path: "/messages",
    label: "Messages",
    icon: MessageSquare
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings
  },
  {
    path: "/customize",
    label: "Customize",
    icon: Brush
  },
  {
    path: "/assistant",
    label: "AI Assistant",
    icon: Brain
  }
];
