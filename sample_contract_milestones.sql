-- Sample INSERT statements for the 'contract_milestones' table

-- Make sure to replace placeholder UUIDs for 'id' and 'contract_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific contract UUIDs you want to link to.

INSERT INTO contract_milestones (id, contract_id, title, due_date, status, value, description, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'cm-uuid-1'
    'your-contract-id-1', -- Replace with actual contract UUID
    'Phase 1 Completion: Foundation and Site Prep', 
    '2024-07-31',
    'Pending', 
    150000.00,
    'Completion of all foundational work and site preparation as per section 2.1 of the contract.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'cm-uuid-2'
    'your-contract-id-1', -- Replace with actual contract UUID
    'Phase 2 Completion: Structural Framework', 
    '2024-09-30',
    'Pending', 
    250000.00,
    'Erection and approval of the main structural framework for building A.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'cm-uuid-3'
    'your-contract-id-2', -- Replace with actual contract UUID
    'Initial Design Draft Submission', 
    '2024-06-15',
    'Completed', 
    50000.00,
    'Submission of the initial design drafts for client review. Approved on 2024-06-20.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'cm-uuid-4'
    'your-contract-id-2', -- Replace with actual contract UUID
    'Final Design Approval', 
    '2024-08-01',
    'Delayed', 
    75000.00,
    'Final approval of all design specifications. Delayed due to additional client feedback rounds.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'cm-uuid-5'
    'your-contract-id-1', -- Replace with actual contract UUID
    'Phase 3 Completion: Building Envelope', 
    '2024-12-15',
    'Pending', 
    200000.00,
    NULL, -- No specific description for this one
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-contract-id-1' and 'your-contract-id-2' with actual UUIDs from your 'contracts' table.
-- If your 'id' column in 'contract_milestones' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `status` field uses values from the `milestone_status_enum` type ('Pending', 'Completed', 'Delayed').
-- `value` and `description` are optional fields.
-- `due_date` is a DATE.
