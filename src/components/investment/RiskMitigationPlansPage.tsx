
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ArrowUpDown, 
  DownloadIcon,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Risk } from '@/data/investment/riskData';

interface RiskMitigationPlansPageProps {
  riskData: Risk[];
}

export function RiskMitigationPlansPage({ riskData }: RiskMitigationPlansPageProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Risk>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Handle sorting
  const handleSort = (field: keyof Risk) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort the risks
  let filteredRisks = [...riskData];
  
  // Apply search filter
  if (searchTerm) {
    filteredRisks = filteredRisks.filter(risk => 
      risk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.mitigation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply category filter
  if (filterCategory !== 'all') {
    filteredRisks = filteredRisks.filter(risk => risk.category === filterCategory);
  }
  
  // Apply status filter
  if (filterStatus !== 'all') {
    filteredRisks = filteredRisks.filter(risk => risk.status === filterStatus);
  }
  
  // Sort the filtered risks
  filteredRisks.sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Get unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(riskData.map(risk => risk.category)));
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center text-cyan-400 hover:text-cyan-500 mb-4"
          onClick={() => navigate('/investment-impact')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Investment Impact
        </Button>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-amber-400" />
              Risk Mitigation Plans
            </h1>
            <p className="text-gray-400 mt-1">Comprehensive view of all risk mitigation strategies and their current status</p>
          </div>
          
          <div className="flex mt-4 md:mt-0">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search risks..." 
              className="pl-10 bg-gray-900 border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Mitigated">Mitigated</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" size="icon" className="border-gray-700 bg-gray-900">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="ml-2 border-gray-700 bg-gray-900">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="bg-black border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-white">All Mitigation Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-900/50 border-gray-800">
                  <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort('id')}>
                    <div className="flex items-center">
                      Risk ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Risk Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort('severity')}>
                    <div className="flex items-center">
                      Severity
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400">Mitigation Plan</TableHead>
                  <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort('owner')}>
                    <div className="flex items-center">
                      Owner
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort('lastUpdated')}>
                    <div className="flex items-center">
                      Last Updated
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400 cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.map((risk) => (
                  <TableRow key={risk.id} className="hover:bg-gray-900/50 border-gray-800">
                    <TableCell className="font-medium text-cyan-400">{risk.id}</TableCell>
                    <TableCell>{risk.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          risk.severity === 'High' 
                            ? "bg-red-900/20 text-red-400 border-red-700/30" 
                            : risk.severity === 'Medium'
                              ? "bg-amber-900/20 text-amber-400 border-amber-700/30"
                              : "bg-green-900/20 text-green-400 border-green-700/30"
                        }
                      >
                        {risk.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="line-clamp-2">{risk.mitigation}</p>
                    </TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell>{risk.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          risk.status === 'Active' 
                            ? "bg-red-900/20 text-red-400 border-red-700/30" 
                            : risk.status === 'Mitigated'
                              ? "bg-green-900/20 text-green-400 border-green-700/30"
                              : "bg-blue-900/20 text-blue-400 border-blue-700/30"
                        }
                      >
                        {risk.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
