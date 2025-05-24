
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Eye, BarChart3, Download, Plus, Star, Navigation } from 'lucide-react';
import { siteAnalysisData, siteComparisonData } from '@/data/site-selection/siteSelectionData';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function SiteAnalysis() {
  const [selectedSite, setSelectedSite] = useState(siteAnalysisData[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SiteListCard onSiteSelect={setSelectedSite} />
        </div>
        <div>
          <SiteDetailsCard site={selectedSite} />
        </div>
      </div>
      
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="comparison">Site Comparison</TabsTrigger>
          <TabsTrigger value="radar">Performance Radar</TabsTrigger>
          <TabsTrigger value="map">Location Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison" className="mt-6">
          <SiteComparisonMatrix />
        </TabsContent>
        
        <TabsContent value="radar" className="mt-6">
          <SiteRadarChart site={selectedSite} />
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <SiteMapView sites={siteAnalysisData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SiteListCard({ onSiteSelect }: { onSiteSelect: (site: any) => void }) {
  return (
    <Card className="bg-black border-cyan-900/30 shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="bg-black">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-cyan-300">Site Portfolio</CardTitle>
            <CardDescription className="text-gray-400">
              Comprehensive analysis of potential development sites
            </CardDescription>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Site
          </Button>
        </div>
      </CardHeader>
      <CardContent className="bg-black p-0">
        <Table>
          <TableHeader className="bg-gray-900/50">
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400">Site Name</TableHead>
              <TableHead className="text-gray-400">Location</TableHead>
              <TableHead className="text-gray-400">Size</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
              <TableHead className="text-gray-400">Score</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {siteAnalysisData.map((site) => (
              <TableRow 
                key={site.id} 
                className="border-b border-gray-800 hover:bg-gray-900/30 cursor-pointer"
                onClick={() => onSiteSelect(site)}
              >
                <TableCell className="font-medium text-white">{site.name}</TableCell>
                <TableCell className="text-gray-400">{site.address}</TableCell>
                <TableCell className="text-gray-400">{site.size}</TableCell>
                <TableCell className="text-green-400">{site.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">{site.score}/100</span>
                  </div>
                </TableCell>
                <TableCell>
                  <SiteStatusBadge status={site.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SiteStatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'high priority':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'under review':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'pending review':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'under negotiation':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Badge className={`${getStatusColor()} border`} variant="outline">
      {status}
    </Badge>
  );
}

function SiteDetailsCard({ site }: { site: any }) {
  const scoreColor = site.score >= 90 ? 'text-green-400' : site.score >= 80 ? 'text-yellow-400' : 'text-red-400';
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-400" />
          {site.name}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Site Performance Overview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${scoreColor}`}>{site.score}/100</div>
          <div className="text-sm text-gray-400">Overall Score</div>
        </div>
        
        <div className="space-y-3">
          <ScoreBar label="Transportation" score={site.transportation} />
          <ScoreBar label="Utilities" score={site.utilities} />
          <ScoreBar label="Environmental" score={site.environmental} />
          <ScoreBar label="Demographics" score={site.demographics} />
          <ScoreBar label="Market Access" score={site.marketAccess} />
        </div>
        
        <div className="pt-4 border-t border-gray-800 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Zoning:</span>
            <span className="text-white">{site.zoning}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Last Updated:</span>
            <span className="text-white">{site.lastUpdated}</span>
          </div>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          View Full Report
        </Button>
      </CardContent>
    </Card>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{score}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div 
          className={`${getScoreColor(score)} h-2 rounded-full transition-all duration-300`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}

function SiteComparisonMatrix() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Site Comparison Matrix</CardTitle>
        <CardDescription className="text-gray-400">
          Weighted scoring across all evaluation criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={siteComparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="criteria" 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#374151',
                  color: '#f3f4f6'
                }}
              />
              <Legend />
              <Bar dataKey="downtown" name="Downtown Metro" fill="#06b6d4" />
              <Bar dataKey="industrial" name="Industrial East" fill="#8b5cf6" />
              <Bar dataKey="suburban" name="Suburban North" fill="#f59e0b" />
              <Bar dataKey="waterfront" name="Waterfront Dev" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function SiteRadarChart({ site }: { site: any }) {
  const radarData = [
    { subject: 'Transportation', score: site.transportation, fullMark: 100 },
    { subject: 'Utilities', score: site.utilities, fullMark: 100 },
    { subject: 'Environmental', score: site.environmental, fullMark: 100 },
    { subject: 'Demographics', score: site.demographics, fullMark: 100 },
    { subject: 'Market Access', score: site.marketAccess, fullMark: 100 }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">{site.name} - Performance Radar</CardTitle>
        <CardDescription className="text-gray-400">
          Multi-dimensional site performance analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis tick={{ fill: '#94a3b8' }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#94a3b8' }}
              />
              <Radar
                name={site.name}
                dataKey="score"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function SiteMapView({ sites }: { sites: any[] }) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Site Locations</CardTitle>
        <CardDescription className="text-gray-400">
          Geographic distribution of potential sites
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-400">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
            <p className="text-sm">
              Integration with mapping service would display site locations,<br />
              boundaries, and surrounding infrastructure
            </p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
              Launch Map View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
