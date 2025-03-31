
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  MapPin, 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  FileText,
  CheckCircle,
  AlertTriangle,
  BarChart,
  Download,
  ExternalLink
} from 'lucide-react';

interface PropertyDetailsProps {
  propertyName: string;
  propertyType: string;
  location: string;
  squareFootage: number;
  floors: number;
  constructionStartDate: string;
  estimatedCompletionDate: string;
  currentPhase: string;
  completionPercentage: number;
  keyContacts: {
    role: string;
    name: string;
    contact: string;
  }[];
  permits: {
    type: string;
    status: 'approved' | 'pending' | 'rejected' | 'not-submitted';
    date?: string;
  }[];
  inspections: {
    type: string;
    status: 'passed' | 'failed' | 'scheduled' | 'not-scheduled';
    date?: string;
    notes?: string;
  }[];
  className?: string;
}

export function PropertyDetails({
  propertyName,
  propertyType,
  location,
  squareFootage,
  floors,
  constructionStartDate,
  estimatedCompletionDate,
  currentPhase,
  completionPercentage,
  keyContacts,
  permits,
  inspections,
  className
}: PropertyDetailsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{propertyName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {location}
            </CardDescription>
          </div>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            {propertyType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="permits">Permits & Inspections</TabsTrigger>
            <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Square Footage</label>
                <p className="font-medium">{squareFootage.toLocaleString()} sq ft</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Number of Floors</label>
                <p className="font-medium">{floors}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Construction Start</label>
                <p className="font-medium">{constructionStartDate}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Estimated Completion</label>
                <p className="font-medium">{estimatedCompletionDate}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Current Phase</h3>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  {currentPhase}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-sm">Overall Completion</label>
                  <span className="text-sm">{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div 
                    className="h-2 bg-blue-600 rounded-full" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium">Key Dates</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center p-2 border rounded-md">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Foundation Completion</p>
                    <p className="text-sm font-medium">Jan 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Framing Completion</p>
                    <p className="text-sm font-medium">Mar 30, 2024</p>
                  </div>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Exterior Closure</p>
                    <p className="text-sm font-medium">Jun 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Next Inspection</p>
                    <p className="text-sm font-medium">Apr 28, 2024</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" className="gap-1">
                <BarChart className="h-4 w-4" />
                <span>Financial Details</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                <span>Property Documents</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="permits" className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Permits</h3>
              <div className="space-y-2">
                {permits.map((permit, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <p className="text-sm font-medium">{permit.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Badge
                        className={
                          permit.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          permit.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                          permit.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }
                      >
                        {permit.status === 'approved' && 'Approved'}
                        {permit.status === 'pending' && 'Pending'}
                        {permit.status === 'rejected' && 'Rejected'}
                        {permit.status === 'not-submitted' && 'Not Submitted'}
                      </Badge>
                      {permit.date && (
                        <span className="text-xs text-muted-foreground ml-2">{permit.date}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Inspections</h3>
              <div className="space-y-2">
                {inspections.map((inspection, index) => (
                  <div key={index} className="p-2 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {inspection.status === 'passed' ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : inspection.status === 'failed' ? (
                          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-amber-500" />
                        )}
                        <p className="text-sm font-medium">{inspection.type}</p>
                      </div>
                      <Badge
                        className={
                          inspection.status === 'passed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          inspection.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          inspection.status === 'scheduled' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }
                      >
                        {inspection.status === 'passed' && 'Passed'}
                        {inspection.status === 'failed' && 'Failed'}
                        {inspection.status === 'scheduled' && 'Scheduled'}
                        {inspection.status === 'not-scheduled' && 'Not Scheduled'}
                      </Badge>
                    </div>
                    
                    {inspection.date && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {inspection.status === 'passed' || inspection.status === 'failed' ? 'Date:' : 'Scheduled for:'} {inspection.date}
                      </div>
                    )}
                    
                    {inspection.notes && (
                      <div className="text-xs mt-1 pt-1 border-t">
                        {inspection.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export Permit List</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                <span>City Permit Portal</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="contacts" className="space-y-4">
            <div className="space-y-3">
              {keyContacts.map((contact, index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex items-center mb-1">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    <p className="font-medium">{contact.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">{contact.role}</div>
                    <div className="text-right">{contact.contact}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export Contact List</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
