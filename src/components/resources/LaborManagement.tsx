
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, UserCheck, Loader2, AlertTriangle as AlertTriangleIcon } from 'lucide-react'; // UserCheck for active, renamed AlertTriangle
import type { TeamMember } from '@/lib/supabase';
import { getTeamMembers } from '@/services/dataService';
// useProject is not needed as getTeamMembers does not take projectId

// laborData array and LaborItem interface removed

export function LaborManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTeamMembers();
        setTeamMembers(data);
      } catch (err) {
        setError("Failed to load labor data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalWorkers = teamMembers.length;
  const activeWorkers = teamMembers.filter(tm => tm.is_active).length;

  // Other summary cards ("Hours This Week", "Available Workers", "Specialists") are removed.

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-300">Loading Labor Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-900/10 border border-red-700/50 rounded-lg p-6">
        <AlertTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Labor Data</h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Adjusted to 2 columns */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Total Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{totalWorkers}</div>
            <p className="text-sm text-gray-400">Total team members</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-400" /> {/* Changed icon */}
              Active Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{activeWorkers}</div>
            <p className="text-sm text-gray-400">Currently active</p>
          </CardContent>
        </Card>
        {/* Removed "Hours This Week", "Available Workers", "Specialists" cards */}
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Labor Force Overview</CardTitle>
          <CardDescription className="text-gray-400">
            Team member details and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembers.length === 0 && !loading ? (
            <div className="text-center py-10 text-gray-500">
              <Users className="h-12 w-12 mx-auto opacity-50 mb-3" />
              <p className="text-lg">No team members found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Worker ID</TableHead>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Contact Info</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id} className="border-gray-700">
                    <TableCell className="text-white font-medium">{member.id}</TableCell>
                    <TableCell className="text-gray-300">{member.name}</TableCell>
                    <TableCell className="text-gray-300">{member.role}</TableCell>
                    <TableCell className="text-gray-300">
                      <div>{member.email}</div>
                      <div>{member.phone ?? 'N/A'}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.is_active ? 'default' : 'secondary'} 
                             className={member.is_active ? 'bg-green-600/70 text-green-100' : 'bg-gray-600/70 text-gray-100'}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Manage
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
