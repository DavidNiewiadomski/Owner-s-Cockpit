
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
  Download,
  ScrollText,
  HardHat,
  MapPin,
  Users,
  ClipboardCheck,
  Truck,
  Building2,
  Wrench
} from 'lucide-react';

export const navigationItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart
  },
  {
    path: "/action-items",
    label: "Action Items",
    icon: ListChecks
  },
  {
    path: "/budget-financials",
    label: "Budget & Financials",
    icon: Wallet
  },
  {
    path: "/timeline",
    label: "Timeline",
    icon: Calendar
  },
  {
    path: "/quality-control",
    label: "Quality Control",
    icon: ClipboardCheck
  },
  {
    path: "/safety-sustainability",
    label: "Safety & Sustainability",
    icon: ShieldCheck
  },
  {
    path: "/site-selection",
    label: "Site Selection",
    icon: MapPin
  },
  {
    path: "/preconstruction",
    label: "Preconstruction",
    icon: HardHat
  },
  {
    path: "/procurement",
    label: "Procurement",
    icon: Users
  },
  {
    path: "/resource-management",
    label: "Resources",
    icon: Truck
  },
  {
    path: "/investment-impact",
    label: "Investment Impact",
    icon: DollarSign
  },
  {
    path: "/contracts-insurance",
    label: "Contracts & Insurance",
    icon: ScrollText
  },
  {
    path: "/documents",
    label: "Documents",
    icon: FileText
  },
  {
    path: "/facilities-management",
    label: "Facilities Management",
    icon: Building2
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
