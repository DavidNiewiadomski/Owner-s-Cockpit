import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  title: string;
  avatar: string;
}

export function AccountSettings() {
  const { toast } = useToast();
  const [profile, setProfile] = useLocalStorage<UserProfile>('userProfile', {
    firstName: 'Matt',
    lastName: 'Grimm',
    email: 'matt.grimm@company.com',
    company: 'Real Estate Development Corp',
    role: 'coo',
    title: 'Chief Operating Officer',
    avatar: '/lovable-uploads/a60047d2-3881-445d-b3a0-2795e70da2db.png'
  });

  const [preferences, setPreferences] = useLocalStorage('ownerPreferences', {
    budgetAlerts: true,
    scheduleAlerts: true,
    qualityIssues: true,
    financialSummary: true,
    milestoneAlerts: true
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setPasswords({ current: '', new: '', confirm: '' });
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  // Add cache busting parameter to avatar URL for Safari compatibility
  const avatarUrl = profile.avatar ? `${profile.avatar}?t=${Date.now()}` : profile.avatar;

  return (
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
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={profile.title}
              onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={profile.role} onValueChange={(value) => setProfile(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coo">Chief Operating Officer</SelectItem>
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
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <Button onClick={handleProfileUpdate}>Save changes</Button>
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
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
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
            <Input
              id="currentPassword"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePasswordUpdate}>Update password</Button>
        </CardFooter>
      </Card>
      
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Real Estate Preferences</CardTitle>
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
              <Switch
                id="budget-alerts"
                checked={preferences.budgetAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('budgetAlerts', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="schedule-alerts">Schedule Deviation Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when projects deviate from planned schedules
                </p>
              </div>
              <Switch
                id="schedule-alerts"
                checked={preferences.scheduleAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('scheduleAlerts', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quality-issues">Quality Issue Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive detailed reports about quality issues
                </p>
              </div>
              <Switch
                id="quality-issues"
                checked={preferences.qualityIssues}
                onCheckedChange={(checked) => handlePreferenceChange('qualityIssues', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="financial-summary">Weekly Financial Summary</Label>
                <p className="text-sm text-muted-foreground">
                  Get weekly reports on financial status of all projects
                </p>
              </div>
              <Switch
                id="financial-summary"
                checked={preferences.financialSummary}
                onCheckedChange={(checked) => handlePreferenceChange('financialSummary', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="milestone-alerts">Milestone Completion</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when project milestones are completed
                </p>
              </div>
              <Switch
                id="milestone-alerts"
                checked={preferences.milestoneAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('milestoneAlerts', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
