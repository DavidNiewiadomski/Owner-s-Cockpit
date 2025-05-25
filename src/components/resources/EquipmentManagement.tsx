
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, MapPin, DollarSign, Search, Plus, Settings } from 'lucide-react';
import { getEquipment } from '@/services/dataService';
import { useProject } from '@/contexts/ProjectContext';
import type { Equipment } from '@/lib/supabase';

export function EquipmentManagement() {
  const { selectedProject } = useProject();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const equipmentData = await getEquipment(selectedProject?.id);
        setEquipment(equipmentData);
        setFilteredEquipment(equipmentData);
      } catch (error) {
        console.error('Error loading equipment:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEquipment();
  }, [selectedProject]);

  useEffect(() => {
    let filtered = equipment;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipment_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredEquipment(filtered);
  }, [equipment, searchTerm, statusFilter]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600';
      case 'in-use':
        return 'bg-blue-600';
      case 'maintenance':
        return 'bg-yellow-600';
      case 'out-of-service':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
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
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in-use">In Use</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="out-of-service">Out of Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item) => (
          <Card key={item.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  {item.name}
                </CardTitle>
                <Badge className={`${getStatusBadgeColor(item.status)} text-white`}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Equipment Type</p>
                <p className="text-white">{item.equipment_type}</p>
              </div>

              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{item.location}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {item.acquisition_cost && (
                  <div>
                    <p className="text-sm text-gray-400">Acquisition Cost</p>
                    <p className="text-white font-medium">
                      ${item.acquisition_cost.toLocaleString()}
                    </p>
                  </div>
                )}
                {item.maintenance_cost && (
                  <div>
                    <p className="text-sm text-gray-400">Maintenance Cost</p>
                    <p className="text-white font-medium">
                      ${item.maintenance_cost.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                  View Details
                </Button>
                {item.status === 'available' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Assign
                  </Button>
                )}
                {item.status === 'maintenance' && (
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    <Settings className="h-4 w-4 mr-1" />
                    Maintenance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-12 text-center">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No equipment found</h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters to see more equipment.'
                : 'Add your first equipment to get started.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
