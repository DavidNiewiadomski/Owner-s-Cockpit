-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the 'preconstruction_budget_items' table
CREATE TABLE preconstruction_budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  category TEXT,
  estimated_amount NUMERIC(15, 2), -- Assuming precision 15, scale 2 for currency
  actual_amount NUMERIC(15, 2),    -- Optional, for tracking actuals later
  variance_amount NUMERIC(15, 2),  -- Optional, can be calculated or stored
  notes TEXT,
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

-- Trigger to execute the function before any update on the 'preconstruction_budget_items' table
CREATE TRIGGER trigger_update_preconstruction_budget_items_updated_at
BEFORE UPDATE ON preconstruction_budget_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE preconstruction_budget_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Allow public read access
CREATE POLICY "Allow public read access to preconstruction_budget_items"
  ON preconstruction_budget_items
  FOR SELECT
  USING (true);

-- 2. Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert preconstruction_budget_items"
  ON preconstruction_budget_items
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow authenticated users to update (can be restricted further)
CREATE POLICY "Allow authenticated users to update preconstruction_budget_items"
  ON preconstruction_budget_items
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. Allow authenticated users to delete (can be restricted further)
CREATE POLICY "Allow authenticated users to delete preconstruction_budget_items"
  ON preconstruction_budget_items
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add comments to table and columns for better understanding (optional but good practice)
COMMENT ON TABLE preconstruction_budget_items IS 'Stores detailed budget line items for the preconstruction phase of projects.';
COMMENT ON COLUMN preconstruction_budget_items.id IS 'Unique identifier for the budget item.';
COMMENT ON COLUMN preconstruction_budget_items.project_id IS 'Foreign key linking to the project this budget item belongs to.';
COMMENT ON COLUMN preconstruction_budget_items.description IS 'Description of the budget line item (e.g., Site Preparation).';
COMMENT ON COLUMN preconstruction_budget_items.category IS 'Category of the budget item (e.g., Site Work, Structural).';
COMMENT ON COLUMN preconstruction_budget_items.estimated_amount IS 'The estimated cost for this budget item.';
COMMENT ON COLUMN preconstruction_budget_items.actual_amount IS 'The actual cost incurred for this budget item (optional, for later tracking).';
COMMENT ON COLUMN preconstruction_budget_items.variance_amount IS 'The difference between estimated and actual amounts (optional, can be calculated).';
COMMENT ON COLUMN preconstruction_budget_items.notes IS 'Additional notes or comments about the budget item.';
COMMENT ON COLUMN preconstruction_budget_items.created_at IS 'Timestamp of when the budget item record was created.';
COMMENT ON COLUMN preconstruction_budget_items.updated_at IS 'Timestamp of when the budget item record was last updated.';
