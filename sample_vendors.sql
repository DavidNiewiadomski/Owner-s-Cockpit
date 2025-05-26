-- Sample INSERT statements for the 'vendors' table

-- Make sure to replace placeholder UUIDs for 'id' with actual UUIDs
-- if you are not relying on the default uuid_generate_v4() for the 'id' column.

INSERT INTO vendors (id, name, category, rating, location, phone, email, status, notes, created_at, updated_at)
VALUES 
  (
    uuid_generate_v4(), -- Or a specific UUID like 'vendor-uuid-1'
    'Global Construction Supplies Ltd.', 
    'General Building Materials', 
    4.5, 
    '123 Industrial Way, Anytown, USA',
    '+1-555-123-4567',
    'sales@globalconstructionsupplies.com',
    'Active',
    'Reliable supplier for bulk orders of cement, lumber, and standard fittings. Good payment terms.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'vendor-uuid-2'
    'Precision Electrical Co.', 
    'Electrical Systems & Components', 
    4.8, 
    '456 Tech Park, Circuit City, USA',
    '+1-555-987-6543',
    'info@precisionelectrical.co',
    'Preferred',
    'Specializes in high-voltage systems and custom control panels. Excellent technical support.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'vendor-uuid-3'
    'SafeGuard Security Solutions', 
    'Security Systems & Services', 
    4.2, 
    '789 Secure Ave, Metroville, USA',
    '+1-555-321-7890',
    'support@safeguard.com',
    'Active',
    'Provides installation and monitoring services. Some delays reported in Q2 but resolved.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(), -- Or a specific UUID like 'vendor-uuid-4'
    'EcoFriendly Landscapers Inc.', 
    'Landscaping & Site Work', 
    4.0, 
    '101 Green Valley Rd, Rural Town, USA',
    '+1-555-555-5555',
    'contact@ecolandscapers.net',
    'On Hold',
    'Currently on hold pending review of their new environmental certification. Past performance was satisfactory.',
    NOW(),
    NOW()
  );

-- Note: 
-- If your 'id' column in 'vendors' does not have uuid_generate_v4() as a default, 
-- you must provide unique UUIDs for each record.
-- The `created_at` and `updated_at` fields will be set to the current time by default.
-- The `status` field uses values from the `vendor_status_enum` type.
-- Optional fields like `category`, `rating`, `location`, `phone`, `email`, and `notes` are provided for these examples.
