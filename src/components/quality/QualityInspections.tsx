
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, CheckCircle, Clock, AlertTriangle, Search, Plus } from 'lucide-react';
import { getQualityInspections } from '@/services/dataService';
import { useProject } from '@/contexts/ProjectContext';
import type { QualityInspection } from '@/lib/supabase';

export function QualityInspections() {
  const { selectedProject } = useProject();
  const [inspections, setInspections] = useState<QualityInspection[]>([]);
  const [filteredInspections, setFilteredInspections] = useState<QualityInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadInspections = async () => {
      try {
        const inspectionsData = await getQualityInspections(selectedProject?.id);
        setInspections(inspectionsData);
        setFilteredInspections(inspectionsData);
      } catch (error) {
        console.error('Error loading inspections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInspections();
  }, [selectedProject]);

  useEffect(() => {
    const filtered = inspections.filter(inspection =>
      inspection.inspection_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInspections(filtered);
  }, [inspections, searchTerm]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-600';
      case 'failed':
        return 'bg-red-600';
      case 'in-progress':
        return 'bg-blue-600';
      case 'scheduled':
        return 'bg-yellow-600';
      case 'pending-review':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search inspections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Inspection
        </Button>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInspections.map((inspection) => (
          <Card key={inspection.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  {getStatusIcon(inspection.status)}
                  {inspection.inspection_type}
                </CardTitle>
                <Badge className={`${getStatusBadgeColor(inspection.status)} text-white`}>
                  {inspection.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Scheduled Date</p>
                  <p className="text-white">
                    {new Date(inspection.scheduled_date).toLocaleDateString()}
                  </p>
                </div>
                {inspection.completed_date && (
                  <div>
                    <p className="text-sm text-gray-400">Completed Date</p>
                    <p className="text-white">
                      {new Date(inspection.completed_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {inspection.score && (
                <div>
                  <p className="text-sm text-gray-400">Quality Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          inspection.score >= 90 ? 'bg-green-500' :
                          inspection.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${inspection.score}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{inspection.score}%</span>
                  </div>
                </div>
              )}

              {inspection.notes && (
                <div>
                  <p className="text-sm text-gray-400">Notes</p>
                  <p className="text-white text-sm">{inspection.notes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                  View Details
                </Button>
                {inspection.status === 'scheduled' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Start Inspection
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInspections.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No inspections found</h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try adjusting your search terms.' : 'Schedule your first inspection to get started.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
