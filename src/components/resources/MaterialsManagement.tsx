
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Badge removed as status is not on Supabase Material type for table display
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, TrendingUp, Loader2, AlertTriangle as AlertTriangleIcon } from 'lucide-react'; // Renamed AlertTriangle to avoid conflict
import type { Material } from '@/lib/supabase';
import { getMaterials } from '@/services/dataService';
import { useProject } from '@/contexts/ProjectContext';

// materialsData array and MaterialItem interface removed

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export function MaterialsManagement() {
  const { selectedProject } = useProject();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectId = selectedProject?.id === 'all' ? undefined : selectedProject?.id;
        const data = await getMaterials(projectId);
        setMaterials(data);
      } catch (err) {
        setError("Failed to load materials data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedProject]);

  const totalMaterialTypes = materials.length;
  
  const inventoryValue = useMemo(() => {
    return materials.reduce((sum, material) => {
      return sum + (material.quantity * (material.unit_cost ?? 0));
    }, 0);
  }, [materials]);

  // Low Stock and Out of Stock cards are removed as these statuses are not on Supabase Material type

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-300">Loading Materials Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-900/10 border border-red-700/50 rounded-lg p-6">
        <AlertTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Materials</h3>
        <p className="text-red-300">{error}</p>
        <p className="text-sm text-red-200 mt-1">Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Changed to md:grid-cols-2 */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-green-400" />
              Total Material Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{totalMaterialTypes}</div>
            <p className="text-sm text-gray-400">Tracked in inventory</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{formatCurrency(inventoryValue)}</div>
            <p className="text-sm text-gray-400">Current stock value</p>
          </CardContent>
        </Card>
        {/* Low Stock and Out of Stock cards removed */}
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Material Inventory</CardTitle>
          <CardDescription className="text-gray-400">
            Current stock levels and material details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {materials.length === 0 && !loading ? (
            <div className="text-center py-10 text-gray-500">
              <Package className="h-12 w-12 mx-auto opacity-50 mb-3" />
              <p className="text-lg">No materials found for this project.</p>
              <p className="text-sm">Try selecting a different project or add new materials.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Material ID</TableHead>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Stock Level</TableHead>
                  {/* Status column removed */}
                  <TableHead className="text-gray-300">Supplier</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id} className="border-gray-700">
                    <TableCell className="text-white font-medium">{material.id}</TableCell>
                    <TableCell className="text-gray-300">{material.name}</TableCell>
                    <TableCell className="text-gray-300">{material.category}</TableCell>
                    <TableCell className="text-gray-300">
                      {material.quantity.toLocaleString()} {material.unit}
                    </TableCell>
                    {/* Status cell removed */}
                    <TableCell className="text-gray-300">{material.supplier_name ?? 'N/A'}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
