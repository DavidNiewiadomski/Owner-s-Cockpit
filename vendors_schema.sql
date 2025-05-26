-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define ENUM type for 'status'
CREATE TYPE vendor_status_enum AS ENUM (
  'Active',
  'Preferred',
  'Inactive',
  'On Hold'
);

-- Create the 'vendors' table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  rating NUMERIC(2,1), -- For values like 4.8
  location TEXT,
  phone TEXT,
  email TEXT, -- Consider adding UNIQUE constraint if emails should be unique
  status vendor_status_enum, -- Using the ENUM type
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

-- Trigger to execute the function before any update on the 'vendors' table
CREATE TRIGGER trigger_update_vendors_updated_at
BEFORE UPDATE ON vendors
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Allow public read access
CREATE POLICY "Allow public read access to vendors"
  ON vendors
  FOR SELECT
  USING (true);

-- 2. Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert vendors"
  ON vendors
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow authenticated users to update (can be restricted further)
CREATE POLICY "Allow authenticated users to update vendors"
  ON vendors
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. Allow authenticated users to delete (can be restricted further)
CREATE POLICY "Allow authenticated users to delete vendors"
  ON vendors
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add comments to table and columns for better understanding (optional but good practice)
COMMENT ON TABLE vendors IS 'Stores information about suppliers and vendors.';
COMMENT ON COLUMN vendors.id IS 'Unique identifier for the vendor.';
COMMENT ON COLUMN vendors.name IS 'Name of the vendor company or individual.';
COMMENT ON COLUMN vendors.category IS 'Category of goods or services the vendor provides (e.g., Construction Materials, Electrical Systems).';
COMMENT ON COLUMN vendors.rating IS 'Numerical rating of the vendor (e.g., 4.8 out of 5).';
COMMENT ON COLUMN vendors.location IS 'Physical location or address of the vendor.';
COMMENT ON COLUMN vendors.phone IS 'Contact phone number for the vendor.';
COMMENT ON COLUMN vendors.email IS 'Contact email address for the vendor.';
COMMENT ON COLUMN vendors.status IS 'Current status of the vendor relationship (e.g., Active, Preferred).';
COMMENT ON COLUMN vendors.notes IS 'Additional notes or comments about the vendor.';
COMMENT ON COLUMN vendors.created_at IS 'Timestamp of when the vendor record was created.';
COMMENT ON COLUMN vendors.updated_at IS 'Timestamp of when the vendor record was last updated.';
