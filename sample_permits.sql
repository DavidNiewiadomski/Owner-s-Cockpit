-- Sample INSERT statements for the 'permits' table

-- Make sure to replace placeholder UUIDs for 'id' and 'project_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific project UUIDs you want to link to.

INSERT INTO permits (id, project_id, name, type, status, application_date, expected_approval_date, actual_approval_date, description, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'permit-uuid-1'
    'your-project-id-1', -- Replace with actual project UUID
    'General Building Permit', 
    'Construction', 
    'Approved', 
    '2024-01-10',
    '2024-02-15',
    '2024-02-10',
    'Main building permit covering general construction activities for Project Alpha.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'permit-uuid-2'
    'your-project-id-1', -- Replace with actual project UUID
    'Electrical Systems Permit', 
    'Utilities', 
    'In Progress', 
    '2024-03-01',
    '2024-04-15',
    NULL, -- Not yet approved
    'Permit for all electrical installations and systems for Project Alpha.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'permit-uuid-3'
    'your-project-id-2', -- Replace with actual project UUID
    'Environmental Impact Clearance', 
    'Regulatory', 
    'Pending', 
    '2024-02-20',
    '2024-05-20',
    NULL,
    'Environmental clearance required before site mobilization for Project Beta.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'permit-uuid-4'
    'your-project-id-2', -- Replace with actual project UUID
    'Demolition Permit - Phase 1', 
    'Site Work', 
    'Approved', 
    '2023-12-01',
    '2023-12-20',
    '2023-12-18',
    NULL, -- No specific description
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-project-id-1' and 'your-project-id-2' with actual UUIDs from your 'projects' table.
-- If your 'id' column in 'permits' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `status` field uses values from the `permit_status_enum` type.
-- Optional fields like `type`, `application_date`, `expected_approval_date`, `actual_approval_date`, and `description` can be NULL or omitted if not applicable (though all are provided in these examples for fullness).
