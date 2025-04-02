
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, PlusCircle, MapPin, ChevronRight } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  value: string;
  sqft: string;
  status: string;
  image?: string;
}

interface PropertiesContentProps {
  properties?: Property[];
  allocationData?: any[];
}

export function PropertiesContent({ properties, allocationData }: PropertiesContentProps) {
  // Sample property data if none is provided
  const sampleProperties: Property[] = [
    {
      id: 'prop-1',
      name: 'Eastside Tower',
      type: 'Commercial',
      location: 'Downtown Metro',
      value: '$14.2M',
      sqft: '32,500',
      status: 'Active',
      image: '/lovable-uploads/c889f81b-9be7-422a-a305-f7b1d0b80459.png'
    },
    {
      id: 'prop-2',
      name: 'Parkview Residences',
      type: 'Residential',
      location: 'North Heights',
      value: '$8.7M',
      sqft: '24,800',
      status: 'Under Construction',
      image: '/lovable-uploads/e41b997b-4805-42a1-b7e3-f0d7a3ce04f9.png'
    },
    {
      id: 'prop-3',
      name: 'Westside Center',
      type: 'Mixed-Use',
      location: 'Innovation District',
      value: '$22.1M',
      sqft: '45,700',
      status: 'Planning',
      image: '/lovable-uploads/c70400be-777a-4fcb-ac1d-96541af42708.png'
    }
  ];

  // Use provided properties or fallback to sample data
  const displayProperties = properties || sampleProperties;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Property Portfolio</h2>
        <Button variant="outline" size="sm" className="text-xs h-8 border-cyan-900/40 text-cyan-300">
          <PlusCircle className="h-3.5 w-3.5 mr-1" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayProperties.map((property) => (
          <Card 
            key={property.id} 
            className="bg-black border-cyan-900/30 overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={property.image || `https://via.placeholder.com/600x300?text=${encodeURIComponent(property.name)}`} 
                alt={property.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge 
                  className={`
                    ${property.status === 'Active' 
                      ? 'bg-green-500/80' 
                      : property.status === 'Under Construction' 
                        ? 'bg-yellow-500/80' 
                        : 'bg-blue-500/80'
                    } text-white`
                  }
                >
                  {property.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-white">{property.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1 text-gray-400">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {property.location}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-cyan-950/40 text-cyan-300 border-cyan-800/50">
                  {property.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-y-2 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Value</p>
                  <p className="text-sm font-semibold text-white">{property.value}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Square Footage</p>
                  <p className="text-sm font-semibold text-white">{property.sqft} sq ft</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between border border-cyan-900/30 hover:bg-cyan-950/30 text-cyan-300"
              >
                <span className="flex items-center">
                  <Building className="h-3.5 w-3.5 mr-1.5" />
                  View Details
                </span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
