
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { usePermissions, Permission } from '@/contexts/PermissionsContext';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

const permissionLabels: Record<Permission, string> = {
  'dashboard': 'Dashboard',
  'analytics': 'Analytics',
  'action-items': 'Action Items',
  'budget-financials': 'Budget & Financials',
  'timeline': 'Timeline',
  'quality-control': 'Quality Control',
  'safety-sustainability': 'Safety & Sustainability',
  'site-selection': 'Site Selection',
  'preconstruction': 'Preconstruction',
  'procurement': 'Procurement',
  'resource-management': 'Resource Management',
  'investment-impact': 'Investment Impact',
  'contracts-insurance': 'Contracts & Insurance',
  'documents': 'Documents',
  'facilities-management': 'Facilities Management',
  'communications': 'Communications',
  'integrations': 'Integrations',
  'settings': 'Settings'
};

export function PermissionsManager() {
  const { permissions, updatePermissions, allPermissions } = usePermissions();

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    if (checked) {
      updatePermissions([...permissions, permission]);
    } else {
      updatePermissions(permissions.filter(p => p !== permission));
    }
  };

  const selectAll = () => {
    updatePermissions(allPermissions);
  };

  const selectNone = () => {
    updatePermissions(['dashboard', 'settings']); // Keep essential pages
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Navigation Permissions
          <Badge variant="secondary">{permissions.length}/{allPermissions.length}</Badge>
        </CardTitle>
        <CardDescription>
          Control which navigation items are visible in the sidebar. Unchecked items will be hidden from the navigation menu.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={selectNone}>
            <XCircle className="h-4 w-4 mr-2" />
            Essential Only
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPermissions.map((permission) => (
            <div key={permission} className="flex items-center space-x-2 p-3 border rounded-lg">
              <Checkbox
                id={permission}
                checked={permissions.includes(permission)}
                onCheckedChange={(checked) => 
                  handlePermissionChange(permission, checked as boolean)
                }
                disabled={permission === 'dashboard' || permission === 'settings'}
              />
              <label
                htmlFor={permission}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  permission === 'dashboard' || permission === 'settings' 
                    ? 'text-muted-foreground' 
                    : ''
                }`}
              >
                {permissionLabels[permission]}
                {(permission === 'dashboard' || permission === 'settings') && (
                  <span className="text-xs text-muted-foreground block">Required</span>
                )}
              </label>
            </div>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <strong>Note:</strong> Dashboard and Settings are required and cannot be disabled. 
          Changes are saved automatically and will take effect immediately.
        </div>
      </CardContent>
    </Card>
  );
}
