
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('planning', 'active', 'on-hold', 'completed', 'cancelled')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  actual_cost DECIMAL(15,2) DEFAULT 0,
  location TEXT,
  client_name TEXT,
  project_manager_id UUID,
  company_id UUID REFERENCES companies(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users/Team Members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  company_id UUID REFERENCES companies(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks/Action Items table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  due_date DATE,
  assigned_to UUID REFERENCES team_members(id),
  project_id UUID REFERENCES projects(id),
  created_by UUID REFERENCES team_members(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  folder TEXT DEFAULT 'General',
  project_id UUID REFERENCES projects(id),
  uploaded_by UUID REFERENCES team_members(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contracts table
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('construction', 'service', 'equipment', 'maintenance', 'design', 'other')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'in-review', 'active', 'expired', 'terminated')),
  value DECIMAL(15,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  contractor_name TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quality Inspections table
CREATE TABLE quality_inspections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inspection_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in-progress', 'passed', 'failed', 'pending-review')),
  scheduled_date DATE NOT NULL,
  completed_date DATE,
  inspector_id UUID REFERENCES team_members(id),
  project_id UUID REFERENCES projects(id),
  notes TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Equipment table
CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'in-use', 'maintenance', 'out-of-service')),
  location TEXT,
  project_id UUID REFERENCES projects(id),
  acquisition_cost DECIMAL(12,2),
  maintenance_cost DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Materials table
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  unit_cost DECIMAL(10,2),
  supplier_name TEXT,
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Budget Categories table
CREATE TABLE budget_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  budgeted_amount DECIMAL(15,2) NOT NULL,
  actual_amount DECIMAL(15,2) DEFAULT 0,
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline Events table
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('milestone', 'task', 'meeting', 'inspection', 'delivery')),
  status TEXT NOT NULL CHECK (status IN ('planned', 'in-progress', 'completed', 'delayed')),
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communications table
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  communication_type TEXT NOT NULL CHECK (communication_type IN ('email', 'meeting', 'call', 'message')),
  sender_id UUID REFERENCES team_members(id),
  recipient_ids UUID[],
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_company_id ON projects(company_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_contracts_project_id ON contracts(project_id);
CREATE INDEX idx_quality_inspections_project_id ON quality_inspections(project_id);
CREATE INDEX idx_equipment_project_id ON equipment(project_id);
CREATE INDEX idx_materials_project_id ON materials(project_id);
CREATE INDEX idx_timeline_events_project_id ON timeline_events(project_id);
CREATE INDEX idx_communications_project_id ON communications(project_id);

-- Add foreign key for project manager
ALTER TABLE projects ADD CONSTRAINT fk_projects_manager FOREIGN KEY (project_manager_id) REFERENCES team_members(id);
