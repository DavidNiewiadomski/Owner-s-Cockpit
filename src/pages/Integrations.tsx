import React, { useState } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { CirclePlus, Database, Link2, Box, Cloud, Zap, Workflow, Code2, Shield, Camera, Map, Scan, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample integrations data with expanded categories including Jet.Build and Track3D
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
    name: 'Jet.Build',
    logo: 'https://via.placeholder.com/40?text=JB',
    description: 'Construction project management software for builders with AI-powered scheduling and resource allocation.',
    connected: true,
    category: 'Project Management',
    features: ['AI Scheduling', 'Resource Management', 'Financial Tracking']
  },
  {
    id: '8',
    name: 'Track3D',
    logo: 'https://via.placeholder.com/40?text=T3D',
    description: 'AI-powered 3D tracking for construction progress monitoring with reality capture integration.',
    connected: true,
    category: 'Reality Capture',
    features: ['360° Capture', 'Progress Tracking', 'As-Built Documentation']
  },
  {
    id: '9',
    name: 'Procore Analytics',
    logo: 'https://play-lh.googleusercontent.com/UQBJgZn2CXmHUzJ9o6M0nhX-NwxHJJXL80xVq-LkKKlZHmTEYfZRQlkM7Ag5ZrHvgQ',
    description: 'Advanced analytics platform for construction data insights and reporting.',
    connected: false,
    category: 'Analytics',
    features: ['Custom Dashboards', 'Performance Metrics', 'Predictive Analytics']
  },
  {
    id: '10',
    name: 'SmartBid',
    logo: 'https://www.smartbid.co/wp-content/uploads/2020/06/smartbid-logo-menu.png',
    description: 'Subcontractor management and bidding platform for general contractors.',
    connected: false,
    category: 'Procurement',
    features: ['Bid Management', 'Vendor Prequalification', 'Document Sharing']
  }
];

// Integration categories to organize the view - updated with Reality Capture category
const categories = [
  { id: 'project-management', name: 'Project Management', icon: Workflow },
  { id: 'design-modeling', name: 'Design & Modeling', icon: Box },
  { id: 'field-management', name: 'Field Management', icon: Cloud },
  { id: 'document-management', name: 'Document Management', icon: Database },
  { id: 'analytics', name: 'Analytics', icon: Zap },
  { id: 'procurement', name: 'Procurement', icon: Link2 },
  { id: 'reality-capture', name: 'Reality Capture', icon: Camera },
  { id: 'other', name: 'Other Integrations', icon: Code2 }
];

// Featured integrations that we want to highlight
const featuredIntegrations = ['Jet.Build', 'Track3D'];

const Integrations = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleIntegrationToggle = (name: string) => {
    toast({
      title: `${name} Integration`,
      description: `${name} has been ${integrations.find(i => i.name === name)?.connected ? 'disconnected' : 'connected'} successfully.`,
      duration: 3000,
    });
  };

  const handleIntegrationAction = (action: string, name: string) => {
    toast({
      title: `${action}: ${name}`,
      description: `Integration ${action.toLowerCase()} successfully.`,
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

  // Get featured integrations to display at the top
  const featured = filteredIntegrations.filter(integration => 
    featuredIntegrations.includes(integration.name)
  );
  
  // Get the rest of the integrations
  const regular = filteredIntegrations.filter(integration => 
    !featuredIntegrations.includes(integration.name)
  );

  return (
    <div className="flex h-screen bg-black text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`flex items-center justify-center p-2 h-auto ${
                    selectedCategory === category.id 
                      ? "bg-construction-600 text-white border-construction-700" 
                      : "bg-black text-gray-300 hover:bg-gray-900"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  <span className="text-xs">{category.name}</span>
                </Button>
              ))}
            </div>
            
            {/* Integration Status Overview */}
            <Card className="bg-black border-gray-700 p-4 mb-8">
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
                    <Button variant="outline" className="ml-4 text-xs h-8 border-gray-700 bg-black hover:bg-gray-900">
                      View Audit Log
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Featured Integrations */}
            {featured.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Scan className="h-5 w-5 mr-2 text-construction-400" />
                  Featured Integrations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featured.map((integration) => (
                    <IntegrationCard 
                      key={integration.id} 
                      {...integration} 
                      onToggle={() => handleIntegrationToggle(integration.name)} 
                      className="bg-gradient-to-br from-black to-black border-construction-700/30 shadow-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Regular Integration Cards Grid */}
            <h2 className="text-xl font-semibold mb-4 text-white">All Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((integration) => (
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
        
        <CollapsibleAIAssistant 
          projectContext="Integrations"
          initialInsights={[
            {
              title: 'Reality Capture Integration',
              content: 'Connecting Track3D can provide 360° site captures automatically linked to your timeline milestones.',
              type: 'info'
            },
            {
              title: 'New Feature Alert',
              content: 'Jet.Build now offers AI-powered resource allocation that can reduce schedule delays by up to 15%.',
              type: 'success'
            }
          ]}
          mode="construction"
        />
      </div>
    </div>
  );
};

export default Integrations;
