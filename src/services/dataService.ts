
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
  Communication,
  Vendor
} from '@/lib/supabase'

// Projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export const getProject = async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching project:', error)
      throw error
    }
    return data
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

// Team Members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) {
      console.error('Error fetching team members:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch team members:', error)
    return []
  }
}

// Tasks
export const getTasks = async (projectId?: string): Promise<Task[]> => {
  try {
    let query = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return []
  }
}

export const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<void> => {
  try {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
    
    if (error) {
      console.error('Error updating task status:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to update task status:', error)
  }
}

// Vendors
export const getVendors = async (): Promise<Vendor[]> => {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching vendors:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch vendors:', error)
    return []
  }
}

export const createVendor = async (
  vendorData: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>
): Promise<Vendor> => {
  try {
    const dataToInsert = {
      ...vendorData,
      status: vendorData.status || 'Active',
    }
    const { data, error } = await supabase
      .from('vendors')
      .insert([dataToInsert])
      .select()
      .single()

    if (error) {
      console.error('Error creating vendor:', error)
      throw error
    }
    if (!data) {
      throw new Error('Failed to create vendor or no data returned.')
    }
    return data as Vendor
  } catch (error) {
    console.error('Error in createVendor:', error)
    throw error
  }
}

// Documents
export const getDocuments = async (projectId?: string): Promise<Document[]> => {
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching documents:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch documents:', error)
    return []
  }
}

// Contracts
export const getContracts = async (projectId?: string): Promise<Contract[]> => {
  try {
    let query = supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching contracts:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch contracts:', error)
    return []
  }
}

// Quality Inspections
export const getQualityInspections = async (projectId?: string): Promise<QualityInspection[]> => {
  try {
    let query = supabase
      .from('quality_inspections')
      .select('*')
      .order('scheduled_date', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching quality inspections:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch quality inspections:', error)
    return []
  }
}

// Equipment
export const getEquipment = async (projectId?: string): Promise<Equipment[]> => {
  try {
    let query = supabase
      .from('equipment')
      .select('*')
      .order('name')
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching equipment:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch equipment:', error)
    return []
  }
}

// Materials
export const getMaterials = async (projectId?: string): Promise<Material[]> => {
  try {
    let query = supabase
      .from('materials')
      .select('*')
      .order('name')
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching materials:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch materials:', error)
    return []
  }
}

// Budget Categories
export const getBudgetCategories = async (projectId?: string): Promise<BudgetCategory[]> => {
  try {
    let query = supabase
      .from('budget_categories')
      .select('*')
      .order('name')
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching budget categories:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch budget categories:', error)
    return []
  }
}

// Timeline Events
export const getTimelineEvents = async (projectId?: string): Promise<TimelineEvent[]> => {
  try {
    let query = supabase
      .from('timeline_events')
      .select('*')
      .order('event_date', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching timeline events:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch timeline events:', error)
    return []
  }
}

// Communications
export const getCommunications = async (projectId?: string): Promise<Communication[]> => {
  try {
    let query = supabase
      .from('communications')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching communications:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Failed to fetch communications:', error)
    return []
  }
}

// Dashboard Analytics
export const getDashboardStats = async () => {
  try {
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
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return {
      activeProjects: 0,
      pendingTasks: 0,
      criticalTasks: 0,
      equipmentInUse: 0,
      totalProjects: 0,
      totalTasks: 0,
      totalEquipment: 0,
      totalMaterials: 0
    }
  }
}
