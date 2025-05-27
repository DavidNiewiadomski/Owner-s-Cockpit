
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://prfggewuqbaenxedlywg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZmdnZXd1cWJhZW54ZWRseXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzg3NTEsImV4cCI6MjA2Mzg1NDc1MX0.nu3VUfHQE-olR1Lu4inPXu05UCHZEb4u-sqRWhpSf8o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types with improved type safety
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
  email?: string
  role: string
  phone?: string
  avatar_url?: string
  company_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

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

export interface Company {
  id: string
  name: string
  logo_url?: string
  website?: string
  phone?: string
  email?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  name: string
  category?: string
  email?: string
  phone?: string
  location?: string
  status?: string
  rating?: number
  notes?: string
  created_at: string
  updated_at: string
}
