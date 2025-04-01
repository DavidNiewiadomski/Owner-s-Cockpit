
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Building2, Map, Filter, ArrowUpDown, Grid, LayoutList } from 'lucide-react';
import { propertyValueData } from '@/data/investment/investmentData';

// Sample properties data
const propertiesData = [
  { 
    id: 'P001', 
    name: 'Highland Tower', 
    location: 'Downtown, Capital City', 
    type: 'Commercial',
    initialValue: 12500000,
    currentValue: 15300000,
    valueChange: 22.4,
    occupancy: 92,
    roi: 8.6,
    status: 'Complete',
    image: '/lovable-uploads/84a355bb-2782-4715-9c27-a42a59fb9fce.png'
  },
  { 
    id: 'P002', 
    name: 'Riverfront Plaza', 
    location: 'North District, Capital City', 
    type: 'Mixed Use',
    initialValue: 8700000,
    currentValue: 10200000,
    valueChange: 17.2,
    occupancy: 87,
    roi: 7.8,
    status: 'Complete',
    image: '/placeholder.svg'
  },
  { 
    id: 'P003', 
    name: 'Parkside Residences', 
    location: 'West End, Capital City', 
    type: 'Residential',
    initialValue: 5300000,
    currentValue: 6850000,
    valueChange: 29.2,
    occupancy: 96,
    roi: 9.3,
    status: 'Complete',
    image: '/placeholder.svg'
  },
  { 
    id: 'P004', 
    name: 'Tech Hub Campus', 
    location: 'Innovation District, Capital City', 
    type: 'Commercial',
    initialValue: 7900000,
    currentValue: 8800000,
    valueChange: 11.4,
    occupancy: 78,
    roi: 6.2,
    status: 'In Progress',
    image: '/placeholder.svg'
  },
  { 
    id: 'P005', 
    name: 'Green Valley Estates', 
    location: 'Suburban Area, Capital City', 
    type: 'Residential',
    initialValue: 4200000,
    currentValue: 5050000,
    valueChange: 20.2,
    occupancy: 88,
    roi: 7.5,
    status: 'In Progress',
    image: '/placeholder.svg'
  },
];

// Property value forecast data
const valueForecastData = [
  { year: '2020', value: 10.2 },
  { year: '2021', value: 11.5 },
  { year: '2022', value: 12.8 },
  { year: '2023', value: 14.6 },
  { year: '2024', value: 16.2 },
  { year: '2025', value: 17.8, forecast: true },
  { year: '2026', value: 19.5, forecast: true },
  { year: '2027', value: 21.3, forecast: true },
];

// Property by type distribution
const propertyTypeData = [
  { name: 'Commercial', value: 45 },
  { name: 'Residential', value: 32 },
  { name: 'Mixed Use', value: 18 },
  { name: 'Industrial', value: 5 },
];

export function PropertiesContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<string>('currentValue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedProperties = [...propertiesData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">Property Portfolio</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 bg-gray-900"
            onClick={() => setViewMode('grid')}
          >
            <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-white' : 'text-gray-400'}`} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 bg-gray-900"
            onClick={() => setViewMode('list')}
          >
            <LayoutList className={`h-4 w-4 ${viewMode === 'list' ? 'text-white' : 'text-gray-400'}`} />
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <Card key={property.id} className="bg-black border-gray-800 overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="object-cover w-full h-full"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    property.status === 'Complete' 
                      ? 'bg-green-900/70 text-green-400' 
                      : 'bg-amber-900/70 text-amber-400'
                  }`}
                >
                  {property.status}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-white">{property.name}</CardTitle>
                  <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-700/30">
                    {property.type}
                  </Badge>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Map className="h-3 w-3 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Current Value</div>
                    <div className="text-white font-semibold">${(property.currentValue / 1000000).toFixed(1)}M</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Value Change</div>
                    <div className="text-green-400 font-semibold">+{property.valueChange}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Occupancy</div>
                    <div className="text-white font-semibold">{property.occupancy}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">ROI</div>
                    <div className="text-white font-semibold">{property.roi}%</div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-construction-600 hover:bg-construction-700">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-black border-gray-800">
          <CardContent className="p-0">
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-900/50">
                    <TableHead className="text-gray-400" onClick={() => handleSort('name')}>
                      <div className="flex items-center cursor-pointer">
                        Property
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('type')}>
                      <div className="flex items-center cursor-pointer">
                        Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('currentValue')}>
                      <div className="flex items-center cursor-pointer">
                        Value
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('valueChange')}>
                      <div className="flex items-center cursor-pointer">
                        Change
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('occupancy')}>
                      <div className="flex items-center cursor-pointer">
                        Occupancy
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('roi')}>
                      <div className="flex items-center cursor-pointer">
                        ROI
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400" onClick={() => handleSort('status')}>
                      <div className="flex items-center cursor-pointer">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProperties.map((property) => (
                    <TableRow key={property.id} className="hover:bg-gray-900/50">
                      <TableCell>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{property.name}</div>
                            <div className="text-xs text-gray-400">{property.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-700/30">
                          {property.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        ${(property.currentValue / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-700/30">
                          +{property.valueChange}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-white">{property.occupancy}%</TableCell>
                      <TableCell className="font-medium text-white">{property.roi}%</TableCell>
                      <TableCell>
                        <Badge className={
                          property.status === 'Complete' 
                            ? 'bg-green-900/70 text-green-400' 
                            : 'bg-amber-900/70 text-amber-400'
                        }>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Property Value Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valueForecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}M`} 
                    stroke="#666"
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}M`, 'Value']}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                    labelStyle={{ color: '#ccc' }}
                  />
                  <defs>
                    <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0ea5e9" 
                    fill="url(#valueGradient)" 
                    fillOpacity={1}
                    strokeWidth={2}
                    name="Historical Value"
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Historical Value</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Projected Value</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Property Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={propertyTypeData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} stroke="#666" />
                  <YAxis type="category" dataKey="name" stroke="#666" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  />
                  <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
