
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Define the property data interface
export interface PropertyData {
  propertyName: string;
  propertyType: string;
  location: string;
  squareFootage: number;
  floors: number;
  constructionStartDate: string;
  estimatedCompletionDate: string;
  currentPhase: string;
  completionPercentage: number;
  keyContacts: Array<{
    role: string;
    name: string;
    contact: string;
  }>;
  permits: Array<{
    type: string;
    status: 'approved' | 'pending' | 'rejected';
    date: string;
  }>;
  inspections: Array<{
    type: string;
    status: 'passed' | 'failed' | 'scheduled' | 'not-scheduled';
    date?: string;
    notes?: string;
  }>;
}

export interface PropertyDetailsProps {
  propertyData: PropertyData;
}

export function PropertyDetails({ propertyData }: PropertyDetailsProps) {
  // Add a null check before rendering
  if (!propertyData) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">{propertyData.propertyName}</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Type:</span>
                <span className="text-sm font-medium col-span-2">{propertyData.propertyType}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Location:</span>
                <span className="text-sm font-medium col-span-2">{propertyData.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Size:</span>
                <span className="text-sm font-medium col-span-2">
                  {propertyData.squareFootage ? propertyData.squareFootage.toLocaleString() : '0'} sq ft
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Floors:</span>
                <span className="text-sm font-medium col-span-2">{propertyData.floors}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Start Date:</span>
                <span className="text-sm font-medium col-span-2">{propertyData.constructionStartDate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Completion:</span>
                <span className="text-sm font-medium col-span-2">{propertyData.estimatedCompletionDate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-500">Current Phase:</span>
                <span className="text-sm font-medium col-span-2">
                  {propertyData.currentPhase} ({propertyData.completionPercentage}% complete)
                </span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <h4 className="text-md font-medium mb-3">Key Contacts</h4>
            <div className="space-y-2">
              {propertyData.keyContacts.map((contact, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-gray-500">{contact.role}:</span>
                  <span className="text-sm font-medium col-span-2">
                    {contact.name} ({contact.contact})
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Permits</h4>
            <div className="space-y-2">
              {propertyData.permits.map((permit, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{permit.type}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{permit.date}</span>
                    <Badge 
                      className={
                        permit.status === "approved" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }
                    >
                      {permit.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <h4 className="text-md font-medium mb-3">Inspections</h4>
            <div className="space-y-2">
              {propertyData.inspections.map((inspection, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{inspection.type}</span>
                  <div className="flex items-center">
                    {inspection.date && (
                      <span className="text-xs text-gray-500 mr-2">{inspection.date}</span>
                    )}
                    <Badge 
                      className={
                        inspection.status === "passed" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : inspection.status === "failed"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : inspection.status === "scheduled"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-500"
                      }
                    >
                      {inspection.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {propertyData.inspections.some(i => i.notes) && (
              <>
                <Separator className="my-4" />
                <div className="space-y-2">
                  {propertyData.inspections.filter(i => i.notes).map((inspection, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <span className="text-sm font-medium">{inspection.type} Notes:</span>
                      <p className="text-sm mt-1">{inspection.notes}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
