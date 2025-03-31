
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Settings" 
          subtitle="Manage your account and preferences"
          onSearch={() => {}} 
        />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-6 bg-muted">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <div className="grid gap-6 md:grid-cols-6">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account information and how we contact you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" defaultValue="Jane" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="SkyLine Properties LLC" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="owner">
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Property Owner</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="manager">Property Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between space-x-2 border-t px-6 py-4">
                    <div className="text-xs text-muted-foreground">
                      Last updated: April 12, 2024
                    </div>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
                
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Your Avatar</CardTitle>
                    <CardDescription>
                      Change your profile picture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Upload</Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-6">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update password</Button>
                  </CardFooter>
                </Card>
                
                <Card className="col-span-6">
                  <CardHeader>
                    <CardTitle>Owner Preferences</CardTitle>
                    <CardDescription>
                      Configure how you want to monitor your properties and projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="budget-alerts">Budget Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when project budgets exceed thresholds
                          </p>
                        </div>
                        <Switch id="budget-alerts" defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="schedule-alerts">Schedule Deviation Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when projects deviate from planned schedules
                          </p>
                        </div>
                        <Switch id="schedule-alerts" defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="quality-issues">Quality Issue Reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive detailed reports about quality issues
                          </p>
                        </div>
                        <Switch id="quality-issues" defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="financial-summary">Weekly Financial Summary</Label>
                          <p className="text-sm text-muted-foreground">
                            Get weekly reports on financial status of all projects
                          </p>
                        </div>
                        <Switch id="financial-summary" defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="milestone-alerts">Milestone Completion</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when project milestones are completed
                          </p>
                        </div>
                        <Switch id="milestone-alerts" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the dashboard looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        <span className="h-4 w-4 rounded-full bg-background border mr-2"></span>
                        Light
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <span className="h-4 w-4 rounded-full bg-gray-900 mr-2"></span>
                        Dark
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <span className="h-4 w-4 rounded-full bg-background border mr-2 relative">
                          <span className="absolute inset-0 transform rotate-90 overflow-hidden rounded-full">
                            <span className="absolute inset-0 bg-gray-900 w-1/2 right-0"></span>
                          </span>
                        </span>
                        System
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Dashboard Layout</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="expanded">Expanded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Choose what updates you receive and how
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your projects
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts on your devices
                        </p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get text messages for critical updates
                        </p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Project Management Settings</CardTitle>
                  <CardDescription>
                    Configure default settings for all your projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-view">Default Project View</Label>
                    <Select defaultValue="timeline">
                      <SelectTrigger id="default-view">
                        <SelectValue placeholder="Select default view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="timeline">Timeline</SelectItem>
                        <SelectItem value="kanban">Kanban Board</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="calendar">Calendar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schedule-format">Schedule Format</Label>
                    <Select defaultValue="gantt">
                      <SelectTrigger id="schedule-format">
                        <SelectValue placeholder="Select schedule format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gantt">Gantt Chart</SelectItem>
                        <SelectItem value="calendar">Calendar</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-track">Automatic Progress Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically update progress based on completed tasks
                      </p>
                    </div>
                    <Switch id="auto-track" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing and Subscription</CardTitle>
                  <CardDescription>
                    Manage your billing information and subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Enterprise Plan</h3>
                        <p className="text-sm text-muted-foreground">Unlimited projects, advanced analytics</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Active
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span>May 15, 2024</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-background flex items-center justify-center border">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/24</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Billing History</h3>
                    <div className="border rounded-lg divide-y">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">April 15, 2024</p>
                          <p className="text-sm text-muted-foreground">Enterprise Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$199.00</p>
                          <Button variant="link" className="h-auto p-0 text-xs">Download</Button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">March 15, 2024</p>
                          <p className="text-sm text-muted-foreground">Enterprise Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$199.00</p>
                          <Button variant="link" className="h-auto p-0 text-xs">Download</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>
                    Control team member access and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Team Members</h3>
                      <Button size="sm">Add Member</Button>
                    </div>
                    
                    <div className="border rounded-lg divide-y">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sarah Wilson</p>
                            <p className="text-sm text-muted-foreground">sarah.wilson@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Select defaultValue="admin">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>AR</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Alex Rodriguez</p>
                            <p className="text-sm text-muted-foreground">alex.rodriguez@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Select defaultValue="editor">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Mark Johnson</p>
                            <p className="text-sm text-muted-foreground">mark.johnson@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Select defaultValue="viewer">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
