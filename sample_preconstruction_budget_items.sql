-- Sample INSERT statements for the 'preconstruction_budget_items' table

-- Make sure to replace placeholder UUIDs for 'id' and 'project_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific project UUIDs you want to link to.

INSERT INTO preconstruction_budget_items (id, project_id, description, category, estimated_amount, actual_amount, variance_amount, notes, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'pbi-uuid-1'
    'your-project-id-1', -- Replace with actual project UUID
    'Initial Site Survey & Topography', 
    'Site Work', 
    15000.00,
    14500.00,
    500.00,
    'Completed by GeoSurveyors Inc. Slightly under budget due to efficient routing.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'pbi-uuid-2'
    'your-project-id-1', -- Replace with actual project UUID
    'Architectural Design - Schematic Phase', 
    'Design Fees', 
    75000.00,
    78000.00,
    -3000.00,
    'Additional client revisions requested during schematic design led to increased hours.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'pbi-uuid-3'
    'your-project-id-2', -- Replace with actual project UUID
    'Preliminary Geotechnical Investigation', 
    'Consulting Fees', 
    25000.00,
    NULL, -- Actual amount not yet available
    NULL, -- Variance not yet calculated
    'Report pending from GeoTest Solutions.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'pbi-uuid-4'
    'your-project-id-2', -- Replace with actual project UUID
    'Permit Application & Filing Fees (Initial Set)', 
    'Administrative', 
    5500.00,
    5500.00,
    0.00,
    'Includes city building permit, zoning, and initial environmental filing fees.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'pbi-uuid-5'
    'your-project-id-1', -- Replace with actual project UUID
    'Utility Connection Feasibility Study', 
    'Consulting Fees', 
    12000.00,
    11500.00,
    500.00,
    'Study for electricity, water, and sewage connections.',
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-project-id-1' and 'your-project-id-2' with actual UUIDs from your 'projects' table.
-- If your 'id' column in 'preconstruction_budget_items' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- `actual_amount` and `variance_amount` are optional and can be NULL.
-- `category` and `notes` are optional TEXT fields.
-- `estimated_amount` is a NUMERIC value.
