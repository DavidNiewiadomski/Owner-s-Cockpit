
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only throw error if we're not in development mode with placeholders
if ((!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') && import.meta.env.PROD) {
  console.warn('Supabase environment variables not configured. Using placeholder values for development.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  title: string
  description?: string
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  progress: number
  start_date?: string
  end_date?: string
  budget?: number
  actual_cost?: number
  location?: string
  client_name?: string
  project_manager_id?: string
  company_id?: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  avatar_url?: string
  company_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type VendorStatusEnum = 
  | 'Active'
  | 'Preferred'
  | 'Inactive'
  | 'On Hold';

export interface Vendor {
  id: string; // UUID
  name: string;
  category?: string;
  rating?: number; // NUMERIC(2,1) -> number
  location?: string;
  phone?: string;
  email?: string;
  status?: VendorStatusEnum; // Optional, as per SQL schema (can have default)
  notes?: string;
  created_at: string; // TIMESTAMPTZ
  updated_at: string; // TIMESTAMPTZ
}

// --- Preconstruction Specific Enums and Interfaces ---

export type SiteAssessmentStatusEnum = 
  | 'Pending'
  | 'In Progress'
  | 'Completed'
  | 'Delayed';

export interface SiteAssessment {
  id: string; // UUID
  project_id: string; // UUID, Foreign Key to projects table
  title: string;
  consultant?: string;
  assessment_date?: string; // DATE string
  status: SiteAssessmentStatusEnum;
  summary?: string;
  file_url?: string;
  created_at: string; // TIMESTAMPTZ
  updated_at: string; // TIMESTAMPTZ
}

export interface PreconstructionBudgetItem {
  id: string; // UUID
  project_id: string; // UUID, Foreign Key to projects table
  description: string;
  category?: string;
  estimated_amount: number; // NUMERIC
  actual_amount?: number; // NUMERIC, optional
  variance_amount?: number; // NUMERIC, optional
  notes?: string;
  created_at: string; // TIMESTAMPTZ
  updated_at: string; // TIMESTAMPTZ
}

export type ImpactLevelEnum = 
  | 'High'
  | 'Medium'
  | 'Low';

export type PreconstructionRiskStatusEnum =
  | 'Open'
  | 'Mitigated'
  | 'Monitoring'
  | 'Closed';

export interface PreconstructionRisk {
  id: string; // UUID
  project_id: string; // UUID, Foreign Key to projects table
  title: string;
  description?: string;
  impact_level: ImpactLevelEnum;
  probability_percentage?: number; // INTEGER (0-100)
  potential_cost_impact_min?: number; // NUMERIC
  potential_cost_impact_max?: number; // NUMERIC
  mitigation_plan?: string;
  status: PreconstructionRiskStatusEnum;
  created_at: string; // TIMESTAMPTZ
  updated_at: string; // TIMESTAMPTZ
}

// --- End Preconstruction Specific Enums and Interfaces ---

export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  due_date?: string
  assigned_to?: string
  project_id?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  name: string
  file_url: string
  file_type: string
  file_size?: number
  folder?: string
  project_id?: string
  uploaded_by?: string
  created_at: string
  updated_at: string
}

export interface Contract {
  id: string
  title: string
  contract_type: 'construction' | 'service' | 'equipment' | 'maintenance' | 'design' | 'other'
  status: 'draft' | 'in-review' | 'active' | 'expired' | 'terminated'
  value: number
  start_date: string
  end_date: string
  contractor_name: string
  project_id?: string
  created_at: string
  updated_at: string
}

export interface QualityInspection {
  id: string
  inspection_type: string
  status: 'scheduled' | 'in-progress' | 'passed' | 'failed' | 'pending-review'
  scheduled_date: string
  completed_date?: string
  inspector_id?: string
  project_id?: string
  notes?: string
  score?: number
  created_at: string
  updated_at: string
}

export interface Equipment {
  id: string
  name: string
  equipment_type: string
  status: 'available' | 'in-use' | 'maintenance' | 'out-of-service'
  location?: string
  project_id?: string
  acquisition_cost?: number
  maintenance_cost?: number
  created_at: string
  updated_at: string
}

export interface Material {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  unit_cost?: number
  supplier_name?: string
  project_id?: string
  created_at: string
  updated_at: string
}

export interface BudgetCategory {
  id: string
  name: string
  budgeted_amount: number
  actual_amount: number
  project_id?: string
  created_at: string
  updated_at: string
}

export interface TimelineEvent {
  id: string
  title: string
  description?: string
  event_date: string
  event_type: 'milestone' | 'task' | 'meeting' | 'inspection' | 'delivery'
  status: 'planned' | 'in-progress' | 'completed' | 'delayed'
  project_id?: string
  created_at: string
  updated_at: string
}

export interface Communication {
  id: string
  title: string
  content: string
  communication_type: 'email' | 'meeting' | 'call' | 'message'
  sender_id?: string
  recipient_ids?: string[]
  project_id?: string
  created_at: string
  updated_at: string
}
