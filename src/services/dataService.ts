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

export const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'created_by'>): Promise<Task> => {
  if (!isSupabaseConfigured()) {
    console.log('Mock: Creating task with data:', taskData);
    // For development: Create a mock task object
    const mockTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: undefined, // Or a mock user ID string like 'mock-user-id'
      // Ensure all other non-optional fields from Task type are present if not in taskData
      // For example, if status or priority were not in Omit but had defaults in DB, mock them.
      // However, 'status' and 'priority' are expected in taskData based on current Omit type.
    };
    return mockTask;
  }

  try {
    // The 'created_by' field will be handled by Supabase policies based on the authenticated user.
    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData]) // taskData should already match the expected insert structure
      .select()
      .single(); // Assuming you want to return the single created record

    if (error) {
      console.error('Supabase createTask error:', error);
      throw error;
    }
    if (!data) {
      throw new Error('Failed to create task or no data returned.');
    }
    return data as Task; // Ensure the returned data is cast to Task
  } catch (error) {
    console.error('Error in createTask:', error);
    // Re-throw the error or handle it as per application's error strategy
    // For example, could return a custom error object or throw a more specific error type
    throw error;
  }
};

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

// Document File Upload
export const uploadDocumentFile = async (
  file: File,
  bucketName: string, // e.g., 'project_documents'
  path: string       // e.g., `${projectId}/${folderNameIfAny}/${file.name}`
): Promise<{ publicUrl: string; fullPath: string }> => {
  if (!isSupabaseConfigured()) {
    console.log(`Mock: Uploading file ${file.name} to ${bucketName}/${path}`);
    // In a real mock, you might want to simulate a delay
    // await new Promise(resolve => setTimeout(resolve, 1000)); 
    return {
      publicUrl: `https://mockstorage.com/${bucketName}/${path}`,
      fullPath: path,
    };
  }

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(path, file);

    if (uploadError) {
      console.error('Supabase uploadDocumentFile error:', uploadError);
      throw uploadError;
    }

    // The 'path' returned by uploadData.path is the same as the 'path' argument.
    // We need to construct the public URL.
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);

    if (!urlData || !urlData.publicUrl) {
      throw new Error('Failed to get public URL for uploaded document.');
    }
    
    return { publicUrl: urlData.publicUrl, fullPath: path }; // path from arg is the fullPath
  } catch (error) {
    console.error('Error in uploadDocumentFile:', error);
    throw error;
  }
};

// Document Record Creation
export const createDocumentRecord = async (
  documentMetaData: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'uploaded_by'>
): Promise<Document> => {
  if (!isSupabaseConfigured()) {
    console.log('Mock: Creating document record with data:', documentMetaData);
    const mockDocument: Document = {
      ...documentMetaData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      uploaded_by: 'mock-user-id', // Or undefined if your policies handle it
    };
    return mockDocument;
  }

  try {
    // 'uploaded_by' will likely be set by RLS policies based on auth.uid()
    const { data, error } = await supabase
      .from('documents')
      .insert([documentMetaData])
      .select()
      .single();

    if (error) {
      console.error('Supabase createDocumentRecord error:', error);
      throw error;
    }
    if (!data) {
      throw new Error('Failed to create document record or no data returned.');
    }
    return data as Document;
  } catch (error) {
    console.error('Error in createDocumentRecord:', error);
    throw error;
  }
};

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

export const createCommunication = async (
  communicationData: Omit<Communication, 'id' | 'created_at' | 'updated_at' | 'sender_id'>
): Promise<Communication> => {
  if (!isSupabaseConfigured()) {
    console.log('Mock: Creating communication with data:', communicationData);
    const mockCommunication: Communication = {
      ...communicationData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sender_id: 'mock-sender-id', // Or undefined if your RLS policies handle it
    };
    return mockCommunication;
  }

  try {
    // sender_id will likely be set by RLS policies based on auth.uid() if not provided
    const { data, error } = await supabase
      .from('communications')
      .insert([communicationData])
      .select()
      .single();

    if (error) {
      console.error('Supabase createCommunication error:', error);
      throw error;
    }
    if (!data) {
      throw new Error('Failed to create communication or no data returned.');
    }
    return data as Communication;
  } catch (error) {
    console.error('Error in createCommunication:', error);
    throw error;
  }
};

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
