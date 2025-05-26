-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define ENUM type for 'impact_level'
CREATE TYPE impact_level_enum AS ENUM (
  'High',
  'Medium',
  'Low'
);

-- Define ENUM type for 'status'
CREATE TYPE preconstruction_risk_status_enum AS ENUM (
  'Open',
  'Mitigated',
  'Monitoring',
  'Closed'
);

-- Create the 'preconstruction_risks' table
CREATE TABLE preconstruction_risks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  impact_level impact_level_enum,
  probability_percentage INTEGER CHECK (probability_percentage >= 0 AND probability_percentage <= 100), -- Store as integer 0-100
  potential_cost_impact_min NUMERIC(15, 2),
  potential_cost_impact_max NUMERIC(15, 2),
  mitigation_plan TEXT,
  status preconstruction_risk_status_enum DEFAULT 'Open',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Trigger function to update 'updated_at' timestamp
-- This function might already exist if created for other tables.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to execute the function before any update on the 'preconstruction_risks' table
CREATE TRIGGER trigger_update_preconstruction_risks_updated_at
BEFORE UPDATE ON preconstruction_risks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE preconstruction_risks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Allow public read access
CREATE POLICY "Allow public read access to preconstruction_risks"
  ON preconstruction_risks
  FOR SELECT
  USING (true);

-- 2. Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert preconstruction_risks"
  ON preconstruction_risks
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update preconstruction_risks"
  ON preconstruction_risks
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. Allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete preconstruction_risks"
  ON preconstruction_risks
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add comments to table and columns
COMMENT ON TABLE preconstruction_risks IS 'Stores potential risks identified during the preconstruction phase of projects.';
COMMENT ON COLUMN preconstruction_risks.id IS 'Unique identifier for the preconstruction risk.';
COMMENT ON COLUMN preconstruction_risks.project_id IS 'Foreign key linking to the project this risk is associated with.';
COMMENT ON COLUMN preconstruction_risks.title IS 'Title or name of the identified risk.';
COMMENT ON COLUMN preconstruction_risks.description IS 'Detailed description of the risk.';
COMMENT ON COLUMN preconstruction_risks.impact_level IS 'Assessed impact level of the risk (e.g., High, Medium, Low).';
COMMENT ON COLUMN preconstruction_risks.probability_percentage IS 'Estimated probability of the risk occurring, as a percentage (0-100).';
COMMENT ON COLUMN preconstruction_risks.potential_cost_impact_min IS 'Minimum potential financial impact if the risk occurs.';
COMMENT ON COLUMN preconstruction_risks.potential_cost_impact_max IS 'Maximum potential financial impact if the risk occurs.';
COMMENT ON COLUMN preconstruction_risks.mitigation_plan IS 'Description of the plan or strategy to mitigate this risk.';
COMMENT ON COLUMN preconstruction_risks.status IS 'Current status of the risk (e.g., Open, Mitigated, Monitoring, Closed).';
COMMENT ON COLUMN preconstruction_risks.created_at IS 'Timestamp of when the risk record was created.';
COMMENT ON COLUMN preconstruction_risks.updated_at IS 'Timestamp of when the risk record was last updated.';
