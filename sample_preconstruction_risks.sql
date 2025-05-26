-- Sample INSERT statements for the 'preconstruction_risks' table

-- Make sure to replace placeholder UUIDs for 'id' and 'project_id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column
-- and if you have specific project UUIDs you want to link to.

INSERT INTO preconstruction_risks (id, project_id, title, description, impact_level, probability_percentage, potential_cost_impact_min, potential_cost_impact_max, mitigation_plan, status, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'prr-uuid-1'
    'your-project-id-1', -- Replace with actual project UUID
    'Unexpected Soil Contamination', 
    'Risk of encountering contaminated soil during excavation, requiring remediation and causing delays.',
    'High', 
    30, -- 30% probability
    50000.00,
    200000.00,
    'Conduct thorough pre-excavation soil testing. Allocate contingency funds for potential remediation. Identify alternative disposal sites.',
    'Open',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'prr-uuid-2'
    'your-project-id-1', -- Replace with actual project UUID
    'Permit Approval Delays from City Planning', 
    'Potential delays in receiving critical building permits from the city planning department due to new zoning reviews.',
    'Medium', 
    50, -- 50% probability
    10000.00,
    50000.00,
    'Early submission of all permit applications. Regular follow-up meetings with city officials. Prepare for phased construction if possible.',
    'Monitoring',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'prr-uuid-3'
    'your-project-id-2', -- Replace with actual project UUID
    'Fluctuation in Material Costs (Steel & Copper)', 
    'Risk of significant price increases for steel and copper components due to market volatility.',
    'High', 
    65, -- 65% probability
    75000.00,
    250000.00,
    'Explore early procurement options or fixed-price contracts with suppliers. Identify alternative material suppliers.',
    'Open',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'prr-uuid-4'
    'your-project-id-2', -- Replace with actual project UUID
    'Skilled Labor Shortage for Specialized Welding', 
    'Potential shortage of certified welders for specialized structural components, impacting schedule.',
    'Medium', 
    40, -- 40% probability
    20000.00, -- Cost impact mainly due to potential project delays or higher rates
    60000.00,
    'Early engagement with labor unions and subcontractors. Investigate training programs or sourcing from wider geographical area.',
    'Mitigated', -- Assuming some steps have been taken
    NOW(),
    NOW()
  );

-- Note: 
-- Replace 'your-project-id-1' and 'your-project-id-2' with actual UUIDs from your 'projects' table.
-- If your 'id' column in 'preconstruction_risks' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `impact_level` and `status` fields use values from their respective ENUM types.
-- `probability_percentage` is an INTEGER between 0 and 100.
-- `potential_cost_impact_min` and `potential_cost_impact_max` are NUMERIC values.
-- Optional fields like `description` and `mitigation_plan` are provided in these examples.
