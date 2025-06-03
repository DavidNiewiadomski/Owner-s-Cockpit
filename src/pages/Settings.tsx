
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PermissionsManager } from '@/components/permissions/PermissionsManager';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ProjectSettings } from '@/components/settings/ProjectSettings';
import { BillingSettings } from '@/components/settings/BillingSettings';
import { TeamSettings } from '@/components/settings/TeamSettings';

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader onSearch={() => {}} />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-6 bg-muted">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
            
            <TabsContent value="permissions">
              <PermissionsManager />
            </TabsContent>
            
            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectSettings />
            </TabsContent>
            
            <TabsContent value="billing">
              <BillingSettings />
            </TabsContent>
            
            <TabsContent value="team">
              <TeamSettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
