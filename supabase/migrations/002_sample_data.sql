
-- Insert sample company
INSERT INTO companies (id, name, logo_url, website, phone, email, address) VALUES 
('00000000-0000-0000-0000-000000000001', 'Premier Construction Group', '/lovable-uploads/249d967c-7ff4-46d6-952b-92274a485085.png', 'https://premierconstructiongroup.com', '+1-555-0123', 'info@premierconstructiongroup.com', '123 Construction Ave, Building City, BC 12345');

-- Insert team members
INSERT INTO team_members (id, name, email, role, phone, company_id) VALUES 
('00000000-0000-0000-0000-000000000001', 'Sarah Johnson', 'sarah.johnson@premierconstructiongroup.com', 'Project Manager', '+1-555-0124', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000002', 'Michael Chen', 'michael.chen@premierconstructiongroup.com', 'Site Supervisor', '+1-555-0125', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000003', 'Emily Rodriguez', 'emily.rodriguez@premierconstructiongroup.com', 'Quality Control Manager', '+1-555-0126', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000004', 'David Wilson', 'david.wilson@premierconstructiongroup.com', 'Safety Coordinator', '+1-555-0127', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000005', 'Jennifer Martinez', 'jennifer.martinez@premierconstructiongroup.com', 'Architect', '+1-555-0128', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000006', 'Robert Taylor', 'robert.taylor@premierconstructiongroup.com', 'Equipment Manager', '+1-555-0129', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000007', 'Amanda White', 'amanda.white@premierconstructiongroup.com', 'Materials Coordinator', '+1-555-0130', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000008', 'James Brown', 'james.brown@premierconstructiongroup.com', 'Financial Manager', '+1-555-0131', '00000000-0000-0000-0000-000000000001');

-- Insert sample projects
INSERT INTO projects (id, title, description, status, progress, start_date, end_date, budget, actual_cost, location, client_name, project_manager_id, company_id) VALUES 
('00000000-0000-0000-0000-000000000001', 'Riverfront Tower', 'Luxury 32-story mixed-use development with retail, office, and residential spaces', 'active', 65, '2023-03-15', '2024-12-30', 45000000.00, 29250000.00, '123 Riverfront Drive, Downtown', 'Skyline Development Corp', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000002', 'Westview Residences', 'Sustainable residential complex with 150 units and community amenities', 'active', 42, '2023-09-01', '2025-06-15', 28000000.00, 11760000.00, '456 Westview Avenue, Suburb', 'Green Living Communities', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000003', 'Harbor Bridge Reconstruction', 'Complete reconstruction of 2.5km harbor bridge with enhanced safety features', 'active', 78, '2023-01-10', '2024-08-20', 18500000.00, 14430000.00, 'Harbor District', 'City Transportation Authority', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000004', 'Metro Medical Center', 'State-of-the-art medical facility with emergency services and surgical suites', 'planning', 15, '2024-06-01', '2026-03-30', 65000000.00, 9750000.00, '789 Medical Plaza, Healthcare District', 'Metropolitan Health System', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

-- Insert budget categories
INSERT INTO budget_categories (name, budgeted_amount, actual_amount, project_id) VALUES 
('Labor', 15000000.00, 9750000.00, '00000000-0000-0000-0000-000000000001'),
('Materials', 18000000.00, 11700000.00, '00000000-0000-0000-0000-000000000001'),
('Equipment', 8000000.00, 5200000.00, '00000000-0000-0000-0000-000000000001'),
('Subcontractors', 3500000.00, 2275000.00, '00000000-0000-0000-0000-000000000001'),
('Permits & Fees', 500000.00, 325000.00, '00000000-0000-0000-0000-000000000001'),
('Labor', 9800000.00, 4116000.00, '00000000-0000-0000-0000-000000000002'),
('Materials', 12600000.00, 5292000.00, '00000000-0000-0000-0000-000000000002'),
('Equipment', 4200000.00, 1764000.00, '00000000-0000-0000-0000-000000000002'),
('Subcontractors', 1200000.00, 504000.00, '00000000-0000-0000-0000-000000000002'),
('Permits & Fees', 200000.00, 84000.00, '00000000-0000-0000-0000-000000000002');

-- Insert tasks
INSERT INTO tasks (title, description, status, priority, due_date, assigned_to, project_id, created_by) VALUES 
('Foundation Inspection', 'Complete structural foundation inspection for Tower Block A', 'completed', 'high', '2024-01-15', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Steel Frame Installation', 'Install steel framework for floors 15-20', 'in-progress', 'critical', '2024-02-28', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Electrical System Review', 'Review and approve electrical plans for residential units', 'pending', 'medium', '2024-02-10', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Safety Equipment Check', 'Monthly safety equipment inspection and maintenance', 'pending', 'high', '2024-01-30', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Material Delivery Coordination', 'Coordinate delivery of concrete for foundation work', 'in-progress', 'medium', '2024-02-05', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001'),
('Environmental Compliance Check', 'Ensure all environmental regulations are met', 'pending', 'high', '2024-02-15', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001'),
('Bridge Deck Installation', 'Install new bridge deck sections', 'completed', 'critical', '2024-01-20', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002'),
('Cable Stay Tensioning', 'Adjust cable stay tension for optimal load distribution', 'in-progress', 'critical', '2024-02-08', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');

-- Insert equipment
INSERT INTO equipment (name, equipment_type, status, location, project_id, acquisition_cost, maintenance_cost) VALUES 
('Caterpillar 320 Excavator', 'Heavy Machinery', 'in-use', 'Riverfront Tower - Site A', '00000000-0000-0000-0000-000000000001', 125000.00, 8500.00),
('Liebherr Tower Crane LTM-1050', 'Crane', 'in-use', 'Riverfront Tower - Main Site', '00000000-0000-0000-0000-000000000001', 850000.00, 15000.00),
('Bobcat S650 Skid Steer', 'Light Machinery', 'available', 'Equipment Yard', NULL, 45000.00, 2200.00),
('Concrete Mixer Truck', 'Delivery Vehicle', 'in-use', 'Westview Residences', '00000000-0000-0000-0000-000000000002', 180000.00, 6800.00),
('Manitowoc Boom Truck', 'Crane', 'maintenance', 'Maintenance Facility', NULL, 320000.00, 12000.00),
('JCB Backhoe Loader', 'Heavy Machinery', 'in-use', 'Harbor Bridge Site', '00000000-0000-0000-0000-000000000003', 95000.00, 4500.00);

-- Insert materials
INSERT INTO materials (name, category, quantity, unit, unit_cost, supplier_name, project_id) VALUES 
('Portland Cement', 'Concrete', 2500, 'tons', 95.00, 'BuildMaster Supply Co.', '00000000-0000-0000-0000-000000000001'),
('Steel Rebar #4', 'Structural Steel', 15000, 'feet', 1.25, 'Metro Steel Solutions', '00000000-0000-0000-0000-000000000001'),
('Tempered Glass Panels', 'Facade', 450, 'pieces', 285.00, 'Crystal Clear Glass Ltd.', '00000000-0000-0000-0000-000000000001'),
('Insulation Boards', 'Insulation', 1800, 'sq ft', 2.75, 'ThermalTech Industries', '00000000-0000-0000-0000-000000000002'),
('Copper Wire 12 AWG', 'Electrical', 8500, 'feet', 0.85, 'ElectroMax Supplies', '00000000-0000-0000-0000-000000000002'),
('Bridge Deck Membrane', 'Waterproofing', 12000, 'sq ft', 4.50, 'AquaShield Systems', '00000000-0000-0000-0000-000000000003'),
('High-Strength Cables', 'Structural', 2400, 'feet', 12.50, 'CableTech Engineering', '00000000-0000-0000-0000-000000000003');

-- Insert contracts
INSERT INTO contracts (title, contract_type, status, value, start_date, end_date, contractor_name, project_id) VALUES 
('Main Construction Contract - Riverfront Tower', 'construction', 'active', 32000000.00, '2023-03-15', '2024-12-30', 'BuildRight Construction Inc.', '00000000-0000-0000-0000-000000000001'),
('Electrical Systems Installation', 'service', 'active', 4500000.00, '2023-06-01', '2024-10-15', 'PowerTech Electrical Services', '00000000-0000-0000-0000-000000000001'),
('HVAC System Installation', 'equipment', 'active', 3200000.00, '2023-08-15', '2024-11-30', 'Climate Control Specialists', '00000000-0000-0000-0000-000000000001'),
('Residential Construction - Westview', 'construction', 'active', 18500000.00, '2023-09-01', '2025-06-15', 'GreenBuild Contractors', '00000000-0000-0000-0000-000000000002'),
('Sustainable Energy Systems', 'equipment', 'active', 2800000.00, '2024-01-15', '2025-04-30', 'EcoEnergy Solutions', '00000000-0000-0000-0000-000000000002'),
('Bridge Reconstruction - Harbor', 'construction', 'active', 14200000.00, '2023-01-10', '2024-08-20', 'Infrastructure Masters LLC', '00000000-0000-0000-0000-000000000003'),
('Traffic Control Systems', 'equipment', 'active', 1650000.00, '2023-05-01', '2024-07-15', 'SmartTraffic Technologies', '00000000-0000-0000-0000-000000000003');

-- Insert quality inspections
INSERT INTO quality_inspections (inspection_type, status, scheduled_date, completed_date, inspector_id, project_id, notes, score) VALUES 
('Foundation Structural', 'passed', '2023-08-15', '2023-08-15', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Foundation meets all structural requirements. Concrete strength test passed.', 95),
('Electrical Safety', 'passed', '2023-11-20', '2023-11-20', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'All electrical installations comply with safety codes.', 92),
('Steel Frame Integrity', 'in-progress', '2024-01-25', NULL, '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Scheduled inspection for steel framework floors 15-20.', NULL),
('Environmental Compliance', 'passed', '2023-12-10', '2023-12-10', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Site meets all environmental protection standards.', 88),
('Fire Safety Systems', 'scheduled', '2024-02-05', NULL, '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Upcoming inspection of fire suppression systems.', NULL),
('Bridge Load Testing', 'passed', '2023-12-15', '2023-12-15', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Load testing completed successfully. Bridge exceeds design specifications.', 97),
('Cable Tension Verification', 'scheduled', '2024-02-10', NULL, '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Scheduled verification of cable stay tension.', NULL);

-- Insert timeline events
INSERT INTO timeline_events (title, description, event_date, event_type, status, project_id) VALUES 
('Project Kickoff', 'Official project commencement ceremony', '2023-03-15', 'milestone', 'completed', '00000000-0000-0000-0000-000000000001'),
('Foundation Completion', 'Completion of all foundation work', '2023-07-30', 'milestone', 'completed', '00000000-0000-0000-0000-000000000001'),
('Steel Structure - 50% Complete', 'Half of steel structure installation finished', '2023-12-15', 'milestone', 'completed', '00000000-0000-0000-0000-000000000001'),
('Facade Installation Begins', 'Start of exterior facade installation', '2024-03-01', 'milestone', 'planned', '00000000-0000-0000-0000-000000000001'),
('Mechanical Systems Testing', 'Testing of HVAC and electrical systems', '2024-09-15', 'task', 'planned', '00000000-0000-0000-0000-000000000001'),
('Site Preparation Complete', 'All site preparation work finished', '2023-10-15', 'milestone', 'completed', '00000000-0000-0000-0000-000000000002'),
('Foundation Work - Phase 1', 'First phase of foundation work', '2023-12-20', 'milestone', 'completed', '00000000-0000-0000-0000-000000000002'),
('Utility Connections', 'Connection of water, power, and sewer systems', '2024-04-10', 'task', 'planned', '00000000-0000-0000-0000-000000000002'),
('Bridge Demolition Complete', 'Old bridge structure completely removed', '2023-04-30', 'milestone', 'completed', '00000000-0000-0000-0000-000000000003'),
('New Foundation Installation', 'Installation of new bridge foundation', '2023-08-15', 'milestone', 'completed', '00000000-0000-0000-0000-000000000003'),
('Deck Construction Complete', 'Bridge deck construction finished', '2024-01-20', 'milestone', 'completed', '00000000-0000-0000-0000-000000000003'),
('Final Inspection', 'Comprehensive final safety and quality inspection', '2024-08-01', 'inspection', 'planned', '00000000-0000-0000-0000-000000000003');

-- Insert communications
INSERT INTO communications (title, content, communication_type, sender_id, recipient_ids, project_id) VALUES 
('Weekly Progress Update - Week 42', 'Riverfront Tower project continues on schedule. Steel installation for floors 15-20 is progressing well. Expected completion by end of month.', 'email', '00000000-0000-0000-0000-000000000001', ARRAY['00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000008'], '00000000-0000-0000-0000-000000000001'),
('Safety Meeting - January 2024', 'Monthly safety briefing conducted. Reviewed ladder safety protocols and fall protection procedures. All team members attended.', 'meeting', '00000000-0000-0000-0000-000000000004', ARRAY['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003'], '00000000-0000-0000-0000-000000000001'),
('Material Delivery Schedule Update', 'Concrete delivery has been rescheduled from Feb 5th to Feb 8th due to weather conditions. Please adjust work schedules accordingly.', 'email', '00000000-0000-0000-0000-000000000007', ARRAY['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'], '00000000-0000-0000-0000-000000000002'),
('Client Review Meeting', 'Conducted progress review with Green Living Communities. Client expressed satisfaction with current progress and quality of work.', 'meeting', '00000000-0000-0000-0000-000000000001', ARRAY['00000000-0000-0000-0000-000000000008'], '00000000-0000-0000-0000-000000000002'),
('Bridge Load Test Results', 'Load testing completed successfully. Bridge structure exceeds design specifications by 15%. Ready for final phase of construction.', 'email', '00000000-0000-0000-0000-000000000003', ARRAY['00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000008'], '00000000-0000-0000-0000-000000000003');

-- Insert sample documents
INSERT INTO documents (name, file_url, file_type, file_size, folder, project_id, uploaded_by) VALUES 
('Architectural Plans - Floor 1-5.pdf', '/documents/riverfront-tower/architectural-plans-1-5.pdf', 'pdf', 15840000, 'Design', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005'),
('Structural Engineering Report.pdf', '/documents/riverfront-tower/structural-report.pdf', 'pdf', 8920000, 'Engineering', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005'),
('Building Permit - City Approval.pdf', '/documents/riverfront-tower/building-permit.pdf', 'pdf', 2450000, 'Permits', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('MEP Installation Guidelines.docx', '/documents/riverfront-tower/mep-guidelines.docx', 'docx', 1250000, 'Technical', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005'),
('Site Safety Protocol.pdf', '/documents/riverfront-tower/safety-protocol.pdf', 'pdf', 3680000, 'Safety', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004'),
('Sustainable Design Specifications.pdf', '/documents/westview-residences/sustainable-design.pdf', 'pdf', 12300000, 'Design', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005'),
('Environmental Impact Assessment.pdf', '/documents/westview-residences/environmental-assessment.pdf', 'pdf', 6700000, 'Environmental', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003'),
('Material Procurement Schedule.xlsx', '/documents/westview-residences/procurement-schedule.xlsx', 'xlsx', 890000, 'Procurement', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000007'),
('Bridge Load Analysis.pdf', '/documents/harbor-bridge/load-analysis.pdf', 'pdf', 18500000, 'Engineering', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005'),
('Traffic Management Plan.pdf', '/documents/harbor-bridge/traffic-management.pdf', 'pdf', 4200000, 'Planning', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002'),
('Cable Stay Installation Manual.pdf', '/documents/harbor-bridge/cable-installation.pdf', 'pdf', 9800000, 'Technical', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');
