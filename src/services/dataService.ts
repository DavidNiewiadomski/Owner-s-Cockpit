import { supabase } from '@/lib/supabase'
import type { 
  Project, 
  TeamMember, 
  Task, 
  Document, 
  Contract, 
  QualityInspection, 
  Equipment, 
  Material, 
  BudgetCategory, 
  TimelineEvent, 
  Communication 
} from '@/lib/supabase'

// Mock data for development when Supabase isn't configured
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Downtown Office Complex',
    description: 'Modern 12-story office building with retail space',
    status: 'active',
    progress: 65,
    start_date: '2024-01-15',
    end_date: '2024-12-30',
    budget: 15000000,
    actual_cost: 9750000,
    location: 'Downtown Business District',
    client_name: 'Metro Development Corp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'Riverside Residential Tower',
    description: '25-story luxury residential building',
    status: 'active',
    progress: 42,
    start_date: '2024-03-01',
    end_date: '2025-06-15',
    budget: 28000000,
    actual_cost: 11760000,
    location: 'Riverside District',
    client_name: 'Luxury Living LLC',
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Foundation concrete pour',
    description: 'Complete foundation concrete pour for Building A',
    status: 'completed',
    priority: 'high',
    due_date: '2024-02-15',
    project_id: '1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Electrical rough-in inspection',
    description: 'Schedule and complete electrical rough-in inspection',
    status: 'in-progress',
    priority: 'critical',
    due_date: '2024-03-01',
    project_id: '1',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-20T00:00:00Z'
  }
];

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key';
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  if (!isSupabaseConfigured()) {
    console.log('Using mock data - Supabase not configured');
    return mockProjects;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.warn('Supabase query failed, using mock data:', error);
    return mockProjects;
  }
}

export const getProject = async (id: string): Promise<Project | null> => {
  if (!isSupabaseConfigured()) {
    return mockProjects.find(p => p.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.warn('Supabase query failed, using mock data:', error);
    return mockProjects.find(p => p.id === id) || null;
  }
}

// Team Members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.warn('Supabase query failed:', error);
    return [];
  }
}

// Tasks
export const getTasks = async (projectId?: string): Promise<Task[]> => {
  if (!isSupabaseConfigured()) {
    return projectId ? mockTasks.filter(t => t.project_id === projectId) : mockTasks;
  }

  try {
    let query = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.warn('Supabase query failed, using mock data:', error);
    return projectId ? mockTasks.filter(t => t.project_id === projectId) : mockTasks;
  }
}

export const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Mock: Task status updated');
    return;
  }

  try {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
    
    if (error) throw error
  } catch (error) {
    console.warn('Supabase update failed:', error);
  }
}

// Documents
export const getDocuments = async (projectId?: string): Promise<Document[]> => {
  let query = supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Contracts
export const getContracts = async (projectId?: string): Promise<Contract[]> => {
  let query = supabase
    .from('contracts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Quality Inspections
export const getQualityInspections = async (projectId?: string): Promise<QualityInspection[]> => {
  let query = supabase
    .from('quality_inspections')
    .select('*')
    .order('scheduled_date', { ascending: false })
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Equipment
export const getEquipment = async (projectId?: string): Promise<Equipment[]> => {
  let query = supabase
    .from('equipment')
    .select('*')
    .order('name')
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Materials
export const getMaterials = async (projectId?: string): Promise<Material[]> => {
  let query = supabase
    .from('materials')
    .select('*')
    .order('name')
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Budget Categories
export const getBudgetCategories = async (projectId?: string): Promise<BudgetCategory[]> => {
  let query = supabase
    .from('budget_categories')
    .select('*')
    .order('name')
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Timeline Events
export const getTimelineEvents = async (projectId?: string): Promise<TimelineEvent[]> => {
  let query = supabase
    .from('timeline_events')
    .select('*')
    .order('event_date', { ascending: false })
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Communications
export const getCommunications = async (projectId?: string): Promise<Communication[]> => {
  let query = supabase
    .from('communications')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}

// Dashboard Analytics
export const getDashboardStats = async () => {
  const [projects, tasks, equipment, materials] = await Promise.all([
    getProjects(),
    getTasks(),
    getEquipment(),
    getMaterials()
  ])
  
  const activeProjects = projects.filter(p => p.status === 'active').length
  const pendingTasks = tasks.filter(t => t.status === 'pending').length
  const criticalTasks = tasks.filter(t => t.priority === 'critical').length
  const equipmentInUse = equipment.filter(e => e.status === 'in-use').length
  
  return {
    activeProjects,
    pendingTasks,
    criticalTasks,
    equipmentInUse,
    totalProjects: projects.length,
    totalTasks: tasks.length,
    totalEquipment: equipment.length,
    totalMaterials: materials.length
  }
}
