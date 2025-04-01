import React, { useState } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Workflow, Box, Cloud, Database, Zap, Link2, Camera, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IntegrationsHeader } from '@/components/integrations/IntegrationsHeader';
import { IntegrationCategories } from '@/components/integrations/IntegrationCategories';
import { IntegrationSecurityCard } from '@/components/integrations/IntegrationSecurityCard';
import { FeaturedIntegrations } from '@/components/integrations/FeaturedIntegrations';
import { IntegrationsList } from '@/components/integrations/IntegrationsList';

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
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

  const featured = filteredIntegrations.filter(integration => 
    featuredIntegrations.includes(integration.name)
  );
  
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
            <IntegrationsHeader />
            
            <IntegrationCategories 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
            
            <IntegrationSecurityCard 
              activeCount={integrations.filter(i => i.connected).length}
              inactiveCount={integrations.filter(i => !i.connected).length}
            />
            
            <FeaturedIntegrations 
              integrations={featured} 
              onToggle={handleIntegrationToggle} 
            />
            
            <h2 className="text-xl font-semibold mb-4 text-white">All Integrations</h2>
            
            <IntegrationsList 
              integrations={regular}
              onToggle={handleIntegrationToggle}
              onClearFilters={clearFilters}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;
