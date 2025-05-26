-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define ENUM type for 'status'
CREATE TYPE site_assessment_status_enum AS ENUM (
  'Pending',
  'In Progress',
  'Completed',
  'Delayed'
);

-- Create the 'site_assessments' table
CREATE TABLE site_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  consultant TEXT,
  assessment_date DATE, -- Corresponds to 'date' in mock data
  status site_assessment_status_enum, -- Using the ENUM type
  summary TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Trigger function to update 'updated_at' timestamp
-- This function might already exist if created for other tables.
-- If it does, this CREATE OR REPLACE FUNCTION statement will update it or do nothing if it's identical.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to execute the function before any update on the 'site_assessments' table
CREATE TRIGGER trigger_update_site_assessments_updated_at
BEFORE UPDATE ON site_assessments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE site_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Allow public read access
CREATE POLICY "Allow public read access to site_assessments"
  ON site_assessments
  FOR SELECT
  USING (true);

-- 2. Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert site_assessments"
  ON site_assessments
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow authenticated users to update (can be restricted further)
CREATE POLICY "Allow authenticated users to update site_assessments"
  ON site_assessments
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. Allow authenticated users to delete (can be restricted further)
CREATE POLICY "Allow authenticated users to delete site_assessments"
  ON site_assessments
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add comments to table and columns for better understanding (optional but good practice)
COMMENT ON TABLE site_assessments IS 'Stores information about various site assessments conducted for projects.';
COMMENT ON COLUMN site_assessments.id IS 'Unique identifier for the site assessment.';
COMMENT ON COLUMN site_assessments.project_id IS 'Foreign key linking to the project this assessment is related to.';
COMMENT ON COLUMN site_assessments.title IS 'Title or name of the site assessment (e.g., Environmental Impact Assessment).';
COMMENT ON COLUMN site_assessments.consultant IS 'Name of the consultant or firm that performed the assessment.';
COMMENT ON COLUMN site_assessments.assessment_date IS 'Date when the assessment was conducted or reported.';
COMMENT ON COLUMN site_assessments.status IS 'Current status of the site assessment (e.g., Pending, In Progress, Completed).';
COMMENT ON COLUMN site_assessments.summary IS 'Optional summary of key findings or description of the assessment.';
COMMENT ON COLUMN site_assessments.file_url IS 'Optional URL pointing to the stored assessment report document.';
COMMENT ON COLUMN site_assessments.created_at IS 'Timestamp of when the site assessment record was created.';
COMMENT ON COLUMN site_assessments.updated_at IS 'Timestamp of when the site assessment record was last updated.';
