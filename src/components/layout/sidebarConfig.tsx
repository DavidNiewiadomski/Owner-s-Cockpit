
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
import { Permission } from '@/contexts/PermissionsContext';

interface NavItem {
  path: string;
  label: string;
  icon: any;
  permission: Permission;
}

export const navigationItems: NavItem[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    permission: 'dashboard'
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart,
    permission: 'analytics'
  },
  {
    path: "/action-items",
    label: "Action Items",
    icon: ListChecks,
    permission: 'action-items'
  },
  {
    path: "/budget-financials",
    label: "Budget & Financials",
    icon: Wallet,
    permission: 'budget-financials'
  },
  {
    path: "/timeline",
    label: "Timeline",
    icon: Calendar,
    permission: 'timeline'
  },
  {
    path: "/quality-control",
    label: "Quality Control",
    icon: ClipboardCheck,
    permission: 'quality-control'
  },
  {
    path: "/safety-sustainability",
    label: "Safety & Sustainability",
    icon: ShieldCheck,
    permission: 'safety-sustainability'
  },
  {
    path: "/site-selection",
    label: "Site Selection",
    icon: MapPin,
    permission: 'site-selection'
  },
  {
    path: "/preconstruction",
    label: "Preconstruction",
    icon: HardHat,
    permission: 'preconstruction'
  },
  {
    path: "/procurement",
    label: "Procurement",
    icon: Users,
    permission: 'procurement'
  },
  {
    path: "/resource-management",
    label: "Resources",
    icon: Truck,
    permission: 'resource-management'
  },
  {
    path: "/investment-impact",
    label: "Investment Impact",
    icon: DollarSign,
    permission: 'investment-impact'
  },
  {
    path: "/contracts-insurance",
    label: "Contracts & Insurance",
    icon: ScrollText,
    permission: 'contracts-insurance'
  },
  {
    path: "/documents",
    label: "Documents",
    icon: FileText,
    permission: 'documents'
  },
  {
    path: "/facilities-management",
    label: "Facilities Management",
    icon: Building2,
    permission: 'facilities-management'
  },
  {
    path: "/communications",
    label: "Communications",
    icon: MessageSquare,
    permission: 'communications'
  }
];

export const utilityItems: NavItem[] = [
  {
    path: "/integrations",
    label: "Integrations",
    icon: Layers,
    permission: 'integrations'
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
    permission: 'settings'
  },
  {
    path: "/customize",
    label: "Customize",
    icon: Brush,
    permission: 'settings' // Use settings permission for customize
  },
  {
    path: "/export",
    label: "Export",
    icon: Download,
    permission: 'settings' // Use settings permission for export
  }
];
