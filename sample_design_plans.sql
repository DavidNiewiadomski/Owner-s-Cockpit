-- Sample INSERT statements for the 'design_plans' table

-- Make sure to replace placeholder UUIDs for 'id' and 'project_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific project UUIDs you want to link to.

INSERT INTO design_plans (id, project_id, name, version, designer, status, last_updated, file_url, description, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'dp-uuid-1'
    'your-project-id-1', -- Replace with actual project UUID
    'Initial Architectural Layout', 
    'v1.0', 
    'ArchDesign Firm LLC', 
    'Draft', 
    '2024-01-15',
    'https://example.com/project1/arch_layout_v1.pdf',
    'First draft of the primary architectural floor plans and elevations.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'dp-uuid-2'
    'your-project-id-1', -- Replace with actual project UUID
    'Structural Engineering Blueprints - Phase 1', 
    'v2.1', 
    'Structura Engineers Inc.', 
    'Approved', 
    '2024-03-20',
    'https://example.com/project1/structural_phase1_v2.1.dwg',
    'Approved structural plans for the foundation and main support structures of Phase 1.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'dp-uuid-3'
    'your-project-id-2', -- Replace with actual project UUID
    'MEP System Design - Preliminary', 
    'v0.5-alpha', 
    'Total MEP Solutions', 
    'In Review', 
    '2024-04-10',
    NULL, -- Optional: No file URL provided for this preliminary review
    'Preliminary designs for Mechanical, Electrical, and Plumbing systems. Awaiting initial feedback.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'dp-uuid-4'
    'your-project-id-1', -- Replace with actual project UUID
    'Revised Architectural Layout', 
    'v1.1', 
    'ArchDesign Firm LLC', 
    'Pending', 
    '2024-02-28',
    'https://example.com/project1/arch_layout_v1.1_revised.pdf',
    'Revised architectural layouts based on client feedback. Pending final review before approval.',
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-project-id-1' and 'your-project-id-2' with actual UUIDs from your 'projects' table.
-- If your 'id' column in 'design_plans' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record (e.g., 'dp-uuid-1', 'dp-uuid-2', etc.).
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `status` field uses values from the `design_plan_status_enum` type.
-- Optional fields like `file_url` and `description` can be NULL or omitted if not applicable.
