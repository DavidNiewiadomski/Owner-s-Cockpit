-- Sample INSERT statements for the 'site_assessments' table

-- Make sure to replace placeholder UUIDs for 'id' and 'project_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific project UUIDs you want to link to.

INSERT INTO site_assessments (id, project_id, title, consultant, assessment_date, status, summary, file_url, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'sa-uuid-1'
    'your-project-id-1', -- Replace with actual project UUID
    'Environmental Impact Study - Phase 1', 
    'EcoConsultants Group', 
    '2024-02-15',
    'Completed', 
    'Initial environmental screening completed. No major red flags identified. Recommends proceeding to Phase 2 soil analysis.',
    'https://example.com/project1/env_impact_phase1.pdf',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'sa-uuid-2'
    'your-project-id-1', -- Replace with actual project UUID
    'Geotechnical Investigation - Site Alpha', 
    'GeoSupport Engineering', 
    '2024-03-20',
    'In Progress', 
    'Borehole drilling and soil sampling currently underway. Preliminary results expected by end of month.',
    NULL, -- No file URL yet
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'sa-uuid-3'
    'your-project-id-2', -- Replace with actual project UUID
    'Traffic Flow Analysis for Project Beta Access Roads', 
    'Urban Mobility Planners', 
    '2024-01-30',
    'Completed',
    'Analysis of existing traffic patterns and projected impact of construction and operational phases. Recommendations for new traffic signals and road widening included.',
    'https://example.com/project2/traffic_analysis.pdf',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'sa-uuid-4'
    'your-project-id-2', -- Replace with actual project UUID
    'Noise Pollution Assessment', 
    'Acoustic Solutions Ltd.', 
    '2024-05-05',
    'Pending',
    'Scheduled assessment of current noise levels and potential impact during and after construction.',
    NULL,
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-project-id-1' and 'your-project-id-2' with actual UUIDs from your 'projects' table.
-- If your 'id' column in 'site_assessments' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `status` field uses values from the `site_assessment_status_enum` type.
-- Optional fields like `consultant`, `assessment_date`, `summary`, and `file_url` are provided in these examples.
