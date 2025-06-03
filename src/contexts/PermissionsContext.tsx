
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Permission = 
  | 'dashboard'
  | 'analytics'
  | 'action-items'
  | 'budget-financials'
  | 'timeline'
  | 'quality-control'
  | 'safety-sustainability'
  | 'site-selection'
  | 'preconstruction'
  | 'procurement'
  | 'resource-management'
  | 'investment-impact'
  | 'contracts-insurance'
  | 'documents'
  | 'facilities-management'
  | 'communications'
  | 'integrations'
  | 'settings';

interface PermissionsContextType {
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  updatePermissions: (newPermissions: Permission[]) => void;
  allPermissions: Permission[];
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const allPermissions: Permission[] = [
    'dashboard',
    'analytics',
    'action-items',
    'budget-financials',
    'timeline',
    'quality-control',
    'safety-sustainability',
    'site-selection',
    'preconstruction',
    'procurement',
    'resource-management',
    'investment-impact',
    'contracts-insurance',
    'documents',
    'facilities-management',
    'communications',
    'integrations',
    'settings'
  ];

  const [permissions, setPermissions] = useState<Permission[]>(() => {
    const saved = localStorage.getItem('userPermissions');
    return saved ? JSON.parse(saved) : allPermissions;
  });

  useEffect(() => {
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
  }, [permissions]);

  const hasPermission = (permission: Permission) => {
    return permissions.includes(permission);
  };

  const updatePermissions = (newPermissions: Permission[]) => {
    setPermissions(newPermissions);
  };

  return (
    <PermissionsContext.Provider value={{
      permissions,
      hasPermission,
      updatePermissions,
      allPermissions
    }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
}
