-- Sample INSERT statements for the 'insurances' table

-- Make sure to replace placeholder UUIDs for 'id' and 'project_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific project UUIDs you want to link to.

INSERT INTO insurances (id, title, type, status, premium, coverage, start_date, end_date, provider, policy_number, project_id, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'ins-uuid-1'
    'General Liability for Downtown Complex', 
    'Liability', 
    'Active', 
    25000.00,
    10000000.00,
    '2024-01-01',
    '2025-01-01',
    'SecureGuard Insurance Co.',
    'POL-GL-2024-001A',
    'your-project-id-1', -- Replace with actual project UUID
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'ins-uuid-2'
    'Builders Risk - Riverside Tower Construction', 
    'Builder''s Risk', 
    'Active', 
    17500.50,
    15000000.00,
    '2024-03-01',
    '2025-08-30',
    'ConstructSafe Insurers',
    'POL-BR-2024-002B',
    'your-project-id-2', -- Replace with actual project UUID
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'ins-uuid-3'
    'Workers Compensation - All Sites', 
    'Workers Comp', 
    'Active', 
    55000.75,
    5000000.00,
    '2024-01-01',
    '2025-01-01',
    'WorkWell Indemnity',
    'POL-WC-2024-003C',
    NULL, -- Company-wide policy, not linked to a specific project
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'ins-uuid-4'
    'Professional Liability for Design Phase - Downtown Complex', 
    'Professional Liability', 
    'Expired', 
    12000.00,
    2000000.00,
    '2023-05-01',
    '2024-05-01',
    'DesignGuard Pro',
    'POL-PL-2023-004D',
    'your-project-id-1', -- Replace with actual project UUID
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-project-id-1' and 'your-project-id-2' with actual UUIDs from your 'projects' table if needed.
-- If your 'id' column in 'insurances' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `type` and `status` fields use values from their respective ENUM types.
-- Optional fields like `provider`, `policy_number`, and `project_id` are provided in these examples.
-- `premium` and `coverage` are NUMERIC values.
-- Dates are in 'YYYY-MM-DD' format.
