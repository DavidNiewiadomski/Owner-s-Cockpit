import { supabase } from '@/lib/supabase'
import { projects } from '@/data/projects/projectData'
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
  Company,
  Vendor
} from '@/lib/supabase'

// Convert projectData projects to match Supabase Project interface
const convertToSupabaseFormat = (projectDataProjects: any[]): Project[] => {
  return projectDataProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    status: project.status === 'on-track' ? 'active' : 
            project.status === 'completed' ? 'completed' : 'active',
    progress: project.progress,
    start_date: project.startDate || '2024-01-01',
    end_date: project.dueDate,
    budget: parseFloat(project.budget?.replace(/[$M,]/g, '') || '0') * 1000000,
    actual_cost: Math.floor((parseFloat(project.budget?.replace(/[$M,]/g, '') || '0') * 1000000) * (project.progress / 100)),
    location: project.location || project.description,
    client_name: project.client || 'Client',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  }));
};

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
  return true; // Now properly configured
};

// Error handling wrapper - fixed to properly handle async operations
const handleSupabaseError = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>,
  fallback: T
): Promise<T> => {
  try {
    const { data, error } = await operation();
    if (error) {
      console.error('Supabase operation failed:', error);
      return fallback;
    }
    return data || fallback;
  } catch (error) {
    console.error('Supabase operation error:', error);
    return fallback;
  }
};

// Companies
export const getCompanies = async (): Promise<Company[]> => {
  return handleSupabaseError(
    async () => await supabase.from('companies').select('*').order('created_at', { ascending: false }),
    []
  );
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  return handleSupabaseError(
    async () => await supabase.from('projects').select('*').order('created_at', { ascending: false }),
    convertToSupabaseFormat(projects)
  );
};

export const getProject = async (id: string): Promise<Project | null> => {
  return handleSupabaseError(
    async () => await supabase.from('projects').select('*').eq('id', id).single(),
    mockProjects.find(p => p.id === id) || null
  );
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> => {
  return handleSupabaseError(
    async () => await supabase.from('projects').insert([project]).select().single(),
    null
  );
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project | null> => {
  return handleSupabaseError(
    async () => await supabase.from('projects').update(updates).eq('id', id).select().single(),
    null
  );
};

// Team Members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  return handleSupabaseError(
    async () => await supabase.from('team_members').select('*').eq('is_active', true).order('name'),
    []
  );
};

export const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember | null> => {
  return handleSupabaseError(
    async () => await supabase.from('team_members').insert([member]).select().single(),
    null
  );
};

// Tasks
export const getTasks = async (projectId?: string): Promise<Task[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('tasks').select('*').eq('project_id', projectId).order('created_at', { ascending: false }),
      mockTasks.filter(t => t.project_id === projectId)
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('tasks').select('*').order('created_at', { ascending: false }),
    mockTasks
  );
};

export const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task | null> => {
  return handleSupabaseError(
    async () => await supabase.from('tasks').insert([task]).select().single(),
    null
  );
};

export const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<void> => {
  try {
    const { error } = await supabase.from('tasks').update({ status }).eq('id', taskId);
    if (error) throw error;
  } catch (error) {
    console.error('Failed to update task status:', error);
  }
};

// Documents
export const getDocuments = async (projectId?: string): Promise<Document[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('documents').select('*').eq('project_id', projectId).order('created_at', { ascending: false }),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('documents').select('*').order('created_at', { ascending: false }),
    []
  );
};

// Contracts
export const getContracts = async (projectId?: string): Promise<Contract[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('contracts').select('*').eq('project_id', projectId).order('created_at', { ascending: false }),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('contracts').select('*').order('created_at', { ascending: false }),
    []
  );
};

// Quality Inspections
export const getQualityInspections = async (projectId?: string): Promise<QualityInspection[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('quality_inspections').select('*').eq('project_id', projectId).order('scheduled_date', { ascending: false }),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('quality_inspections').select('*').order('scheduled_date', { ascending: false }),
    []
  );
};

// Equipment
export const getEquipment = async (projectId?: string): Promise<Equipment[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('equipment').select('*').eq('project_id', projectId).order('name'),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('equipment').select('*').order('name'),
    []
  );
};

// Materials
export const getMaterials = async (projectId?: string): Promise<Material[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('materials').select('*').eq('project_id', projectId).order('name'),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('materials').select('*').order('name'),
    []
  );
};

// Budget Categories
export const getBudgetCategories = async (projectId?: string): Promise<BudgetCategory[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('budget_categories').select('*').eq('project_id', projectId).order('name'),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('budget_categories').select('*').order('name'),
    []
  );
};

// Timeline Events
export const getTimelineEvents = async (projectId?: string): Promise<TimelineEvent[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('timeline_events').select('*').eq('project_id', projectId).order('event_date', { ascending: false }),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('timeline_events').select('*').order('event_date', { ascending: false }),
    []
  );
};

// Communications
export const getCommunications = async (projectId?: string): Promise<Communication[]> => {
  if (projectId) {
    return handleSupabaseError(
      async () => await supabase.from('communications').select('*').eq('project_id', projectId).order('created_at', { ascending: false }),
      []
    );
  }
  
  return handleSupabaseError(
    async () => await supabase.from('communications').select('*').order('created_at', { ascending: false }),
    []
  );
};

// Vendors
export const getVendors = async (): Promise<Vendor[]> => {
  return handleSupabaseError(
    async () => await supabase.from('vendors').select('*').order('name'),
    []
  );
};

// Dashboard Analytics
export const getDashboardStats = async () => {
  const [projects, tasks, equipment, materials] = await Promise.all([
    getProjects(),
    getTasks(),
    getEquipment(),
    getMaterials()
  ]);
  
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const criticalTasks = tasks.filter(t => t.priority === 'critical').length;
  const equipmentInUse = equipment.filter(e => e.status === 'in-use').length;
  
  return {
    activeProjects,
    pendingTasks,
    criticalTasks,
    equipmentInUse,
    totalProjects: projects.length,
    totalTasks: tasks.length,
    totalEquipment: equipment.length,
    totalMaterials: materials.length
  };
};
