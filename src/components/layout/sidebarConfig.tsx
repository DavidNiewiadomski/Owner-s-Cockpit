
import { 
  LayoutDashboard, 
  ListChecks, 
  BarChart, 
  Wallet, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Layers, 
  Settings,
  Brush,
  Download
} from 'lucide-react';

export const navigationItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/action-items",
    label: "Action Items",
    icon: ListChecks
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart
  },
  {
    path: "/budget-financials",
    label: "Budget & Financials",
    icon: Wallet
  },
  {
    path: "/investment-impact",
    label: "Investment Impact",
    icon: DollarSign
  },
  {
    path: "/timeline",
    label: "Timeline",
    icon: Calendar
  },
  {
    path: "/safety-sustainability",
    label: "Safety & Sustainability",
    icon: ShieldCheck
  },
  {
    path: "/documents",
    label: "Documents",
    icon: FileText
  },
  {
    path: "/communications",
    label: "Communications",
    icon: MessageSquare
  }
];

export const utilityItems = [
  {
    path: "/integrations",
    label: "Integrations",
    icon: Layers
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
    path: "/export",
    label: "Export",
    icon: Download
  }
];
