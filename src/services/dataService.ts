
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

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export const getProject = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Team Members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('name')
  
  if (error) throw error
  return data || []
}

// Tasks
export const getTasks = async (projectId?: string): Promise<Task[]> => {
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
}

export const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', taskId)
  
  if (error) throw error
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
