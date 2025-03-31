
import React, { useState } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { CirclePlus, Database, Link2, Cube, Cloud, Zap, Workflow, Code2, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample integrations data with expanded categories
const integrations = [
  {
    id: '1',
    name: 'Procore',
    logo: 'https://play-lh.googleusercontent.com/UQBJgZn2CXmHUzJ9o6M0nhX-NwxHJJXL80xVq-LkKKlZHmTEYfZRQlkM7Ag5ZrHvgQ',
    description: 'Complete construction management platform with real-time updates and team collaboration.',
    connected: true,
    category: 'Project Management',
    features: ['Document Control', 'Field Management', 'Quality & Safety']
  },
  {
    id: '2',
    name: 'BIM 360',
    logo: 'https://yt3.googleusercontent.com/ytc/AGIKgqPUznYGZpK-mTrPdSUyGViJ4_C1gZZMWYS-lSZE=s900-c-k-c0x00ffffff-no-rj',
    description: 'Centralized platform for construction design data with cloud-based model coordination.',
    connected: true,
    category: 'Design & Modeling',
    features: ['3D Modeling', 'Clash Detection', 'Design Review']
  },
  {
    id: '3',
    name: 'PlanGrid',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKspQeiAYqXLyGZaEn-jzLg6bKKmEv5mOYJ0sC5g-jQsluR0_F5zDsrRiEnMPU7zJK9UA&usqp=CAU',
    description: 'Mobile-first solution for field teams to access plans and documents anywhere.',
    connected: false,
    category: 'Field Management',
    features: ['Blueprint Management', 'Field Reports', 'RFI Tracking']
  },
  {
    id: '4',
    name: 'Oracle Primavera',
    logo: 'https://www.oracle.com/a/ocom/img/cb71-primavera-logo.png',
    description: 'Enterprise project portfolio management software for planning and execution.',
    connected: false,
    category: 'Project Planning',
    features: ['Schedule Management', 'Resource Optimization', 'Risk Analysis']
  },
  {
    id: '5',
    name: 'Autodesk Construction Cloud',
    logo: 'https://damassets.autodesk.net/content/dam/autodesk/www/solutions/bim/images/stories/autodesk-construction-cloud-logo-social-card-1200x630.jpg',
    description: 'Unified platform connecting design, planning, construction, and operations.',
    connected: false,
    category: 'Multi-purpose',
    features: ['Project Management', 'Quality Control', 'Cost Management']
  },
  {
    id: '6',
    name: 'Bluebeam Revu',
    logo: 'https://www.bluebeam.com/assets/img/logo/revu-logo-dark.svg',
    description: 'PDF markup and collaboration tools designed for architecture and construction.',
    connected: true,
    category: 'Document Management',
    features: ['PDF Markup', 'Quantity Takeoff', 'Document Comparison']
  },
  {
    id: '7',
    name: 'Procore Analytics',
    logo: 'https://play-lh.googleusercontent.com/UQBJgZn2CXmHUzJ9o6M0nhX-NwxHJJXL80xVq-LkKKlZHmTEYfZRQlkM7Ag5ZrHvgQ',
    description: 'Advanced analytics platform for construction data insights and reporting.',
    connected: false,
    category: 'Analytics',
    features: ['Custom Dashboards', 'Performance Metrics', 'Predictive Analytics']
  },
  {
    id: '8',
    name: 'SmartBid',
    logo: 'https://www.smartbid.co/wp-content/uploads/2020/06/smartbid-logo-menu.png',
    description: 'Subcontractor management and bidding platform for general contractors.',
    connected: false,
    category: 'Procurement',
    features: ['Bid Management', 'Vendor Prequalification', 'Document Sharing']
  }
];

// Integration categories to organize the view
const categories = [
  { id: 'project-management', name: 'Project Management', icon: Workflow },
  { id: 'design-modeling', name: 'Design & Modeling', icon: Cube },
  { id: 'field-management', name: 'Field Management', icon: Cloud },
  { id: 'document-management', name: 'Document Management', icon: Database },
  { id: 'analytics', name: 'Analytics', icon: Zap },
  { id: 'procurement', name: 'Procurement', icon: Link2 },
  { id: 'other', name: 'Other Integrations', icon: Code2 }
];

const Integrations = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleIntegrationToggle = (name: string) => {
    toast({
      title: `${name} integration ${integrations.find(i => i.name === name)?.connected ? 'disconnected' : 'connected'}`,
      description: `Settings updated successfully`,
      duration: 3000,
    });
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = searchTerm === '' || 
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      integration.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Assistant Section */}
            <AIAssistant />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Integrations</h1>
                <p className="text-gray-400">Connect your project with external tools and services</p>
              </div>
              <div className="mt-3 md:mt-0">
                <Button className="bg-construction-600 hover:bg-construction-700 text-white">
                  <CirclePlus className="h-4 w-4 mr-2" />
                  Add New Integration
                </Button>
              </div>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`flex items-center justify-center p-2 h-auto ${
                    selectedCategory === category.id 
                      ? "bg-construction-600 text-white border-construction-700" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  <span className="text-xs">{category.name}</span>
                </Button>
              ))}
            </div>
            
            {/* Integration Status Overview */}
            <Card className="bg-gray-800 border-gray-700 p-4 mb-8">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-12 w-12 text-construction-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Integration Security</h3>
                      <p className="text-sm text-gray-400">All connections are secured with OAuth 2.0 and data encryption</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-300">{integrations.filter(i => i.connected).length} Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm text-gray-300">{integrations.filter(i => !i.connected).length} Inactive</span>
                    </div>
                    <Button variant="outline" className="ml-4 text-xs h-8 border-gray-700 bg-gray-800 hover:bg-gray-700">
                      View Audit Log
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Integration Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard 
                  key={integration.id} 
                  {...integration} 
                  onToggle={() => handleIntegrationToggle(integration.name)} 
                />
              ))}
            </div>
            
            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No integrations found matching your criteria</p>
                <Button 
                  variant="outline" 
                  className="text-construction-400 border-construction-600"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;
