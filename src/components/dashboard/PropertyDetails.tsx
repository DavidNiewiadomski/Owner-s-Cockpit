
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

  // Function to get badge styles based on status
  const getPermitBadgeStyles = (status: 'approved' | 'pending' | 'rejected') => {
    switch (status) {
      case 'approved':
        return "bg-green-500/90 text-white font-medium shadow-[0_0_10px_rgba(34,197,94,0.5)] border border-green-400 animate-fade-in";
      case 'pending':
        return "bg-amber-500/90 text-white font-medium shadow-[0_0_10px_rgba(245,158,11,0.5)] border border-amber-400 animate-fade-in";
      case 'rejected':
        return "bg-red-500/90 text-white font-medium shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-400 animate-fade-in";
      default:
        return "bg-gray-500/90 text-white font-medium shadow-[0_0_10px_rgba(107,114,128,0.5)] border border-gray-400 animate-fade-in";
    }
  };

  const getInspectionBadgeStyles = (status: 'passed' | 'failed' | 'scheduled' | 'not-scheduled') => {
    switch (status) {
      case 'passed':
        return "bg-green-500/90 text-white font-medium shadow-[0_0_10px_rgba(34,197,94,0.5)] border border-green-400 animate-fade-in";
      case 'failed':
        return "bg-red-500/90 text-white font-medium shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-400 animate-fade-in";
      case 'scheduled':
        return "bg-blue-500/90 text-white font-medium shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-blue-400 animate-fade-in";
      case 'not-scheduled':
        return "bg-gray-500/90 text-white font-medium shadow-[0_0_10px_rgba(107,114,128,0.5)] border border-gray-400 animate-fade-in";
      default:
        return "bg-gray-500/90 text-white font-medium shadow-[0_0_10px_rgba(107,114,128,0.5)] border border-gray-400 animate-fade-in";
    }
  };

  return (
    <Card className="mt-6 border-cyan-900/30 bg-black shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-gradient">Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-cyan-300">{propertyData.propertyName}</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Type:</span>
                <span className="text-sm font-medium col-span-2 text-white">{propertyData.propertyType}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Location:</span>
                <span className="text-sm font-medium col-span-2 text-white">{propertyData.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Size:</span>
                <span className="text-sm font-medium col-span-2 text-white">
                  {propertyData.squareFootage ? propertyData.squareFootage.toLocaleString() : '0'} sq ft
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Floors:</span>
                <span className="text-sm font-medium col-span-2 text-white">{propertyData.floors}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Start Date:</span>
                <span className="text-sm font-medium col-span-2 text-white">{propertyData.constructionStartDate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Completion:</span>
                <span className="text-sm font-medium col-span-2 text-white">{propertyData.estimatedCompletionDate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-sm text-gray-400">Current Phase:</span>
                <span className="text-sm font-medium col-span-2 text-white">
                  {propertyData.currentPhase} ({propertyData.completionPercentage}% complete)
                </span>
              </div>
            </div>
            
            <Separator className="my-4 bg-cyan-900/30" />
            
            <h4 className="text-md font-medium mb-3 text-cyan-300">Key Contacts</h4>
            <div className="space-y-2">
              {propertyData.keyContacts.map((contact, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-gray-400">{contact.role}:</span>
                  <span className="text-sm font-medium col-span-2 text-white">
                    {contact.name} <span className="text-cyan-400">({contact.contact})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3 text-cyan-300">Permits</h4>
            <div className="space-y-3">
              {propertyData.permits.map((permit, index) => (
                <div key={index} className="flex items-center justify-between bg-black/40 p-2 rounded-md border border-cyan-900/20">
                  <span className="text-sm text-white">{permit.type}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">{permit.date}</span>
                    <Badge className={getPermitBadgeStyles(permit.status)}>
                      {permit.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4 bg-cyan-900/30" />
            
            <h4 className="text-md font-medium mb-3 text-cyan-300">Inspections</h4>
            <div className="space-y-3">
              {propertyData.inspections.map((inspection, index) => (
                <div key={index} className="flex items-center justify-between bg-black/40 p-2 rounded-md border border-cyan-900/20">
                  <span className="text-sm text-white">{inspection.type}</span>
                  <div className="flex items-center">
                    {inspection.date && (
                      <span className="text-xs text-gray-400 mr-2">{inspection.date}</span>
                    )}
                    <Badge className={getInspectionBadgeStyles(inspection.status)}>
                      {inspection.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {propertyData.inspections.some(i => i.notes) && (
              <>
                <Separator className="my-4 bg-cyan-900/30" />
                <div className="space-y-2">
                  {propertyData.inspections.filter(i => i.notes).map((inspection, index) => (
                    <div key={index} className="bg-cyan-950/30 p-3 rounded-md border border-cyan-900/30">
                      <span className="text-sm font-medium text-cyan-300">{inspection.type} Notes:</span>
                      <p className="text-sm mt-1 text-gray-300">{inspection.notes}</p>
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
