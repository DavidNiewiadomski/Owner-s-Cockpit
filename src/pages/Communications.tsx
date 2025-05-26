
import React, { useState, useEffect } from 'react'; // Added useEffect
import { CommunicationsLayout } from '@/components/communications/CommunicationsLayout';
import { CommunicationsHeader } from '@/components/communications/CommunicationsHeader';
import { CommunicationOptionsGrid } from '@/components/communications/CommunicationOptionsGrid';
import { CommunicationTabs } from '@/components/communications/CommunicationTabs';
import { CommunicationDialogContent } from '@/components/communications/CommunicationDialogContent';
import { CommunicationStats } from '@/components/communications/CommunicationStats';
// recentCommunications, local Communication type removed. ScheduledEvent and insights kept for now.
import { 
  scheduledEvents, // Keep for now
  communicationInsights // Keep for now
} from '@/data';
import type { ScheduledEvent } from '@/data'; // Keep for now
import type { Communication, Project } from '@/lib/supabase'; // Import Supabase types
import { getCommunications, getProjects } from '@/services/dataService'; // Import data service
import { useProject } from '@/contexts/ProjectContext'; // Import useProject
import { Loader2 } from 'lucide-react'; // For loading state
import { useToast } from '@/components/ui/use-toast'; // For error notifications

const Communications = () => {
  const { toast } = useToast();
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [projectsMap, setProjectsMap] = useState<Map<string, Project>>(new Map());
  const [enrichedCommunications, setEnrichedCommunications] = useState<(Communication & { projectTitle: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [commsData, projsData] = await Promise.all([
          getCommunications(selectedProject?.id),
          getProjects()
        ]);
        setCommunications(commsData);
        const newProjectsMap = new Map<string, Project>();
        projsData.forEach(project => newProjectsMap.set(project.id, project));
        setProjectsMap(newProjectsMap);
      } catch (error) {
        console.error("Error loading communications or projects:", error);
        toast({ title: "Error", description: "Failed to load communication data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedProject, toast]);

  useEffect(() => {
    if (communications.length > 0 && projectsMap.size > 0) {
      const currentEnrichedComms = communications.map(comm => ({
        ...comm,
        projectTitle: comm.project_id ? (projectsMap.get(comm.project_id)?.title || 'Unknown Project') : 'N/A'
      }));
      setEnrichedCommunications(currentEnrichedComms);
    } else if (communications.length > 0 && projectsMap.size === 0 && !loading){
       const currentEnrichedComms = communications.map(comm => ({
        ...comm,
        projectTitle: 'Project Info N/A'
      }));
      setEnrichedCommunications(currentEnrichedComms);
    } else {
      setEnrichedCommunications([]);
    }
  }, [communications, projectsMap, loading]);
  
  // Communication type handlers (remain unchanged)
  const handleEmailClick = () => setActiveDialog('email');
  const handleMessageClick = () => setActiveDialog('message');
  const handleCallClick = () => setActiveDialog('call');
  const handleVideoClick = () => setActiveDialog('video');
  const handleMeetingClick = () => setActiveDialog('meeting');
  const handleSlackClick = () => setActiveDialog('slack');
  const handleTeamsClick = () => setActiveDialog('teams');
  
  const handleCloseDialog = () => setActiveDialog(null);
  
  const handleSubmit = (data: any) => {
    console.log('Communication submitted:', { type: activeDialog, data });
    // In a real app, we would send this data to an API
  };

  if (loading) {
    return (
      <CommunicationsLayout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeDialog={activeDialog}
        handleCloseDialog={handleCloseDialog}
        communicationInsights={communicationInsights}
        dialogContent={
          <CommunicationDialogContent
            activeDialog={activeDialog}
            onClose={handleCloseDialog}
            onSubmit={handleSubmit}
          />
        }
      >
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        </div>
      </CommunicationsLayout>
    );
  }
  
  return (
    <CommunicationsLayout
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      activeDialog={activeDialog}
      handleCloseDialog={handleCloseDialog}
      communicationInsights={communicationInsights}
      dialogContent={
        <CommunicationDialogContent
          activeDialog={activeDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
        />
      }
    >
      <CommunicationsHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <CommunicationStats 
        emails={42}
        messages={24}
        calls={13}
        meetings={8}
        videoConferences={5}
      />
      
      <CommunicationOptionsGrid
        onEmailClick={handleEmailClick}
        onMessageClick={handleMessageClick}
        onCallClick={handleCallClick}
        onVideoClick={handleVideoClick}
        onMeetingClick={handleMeetingClick}
        onSlackClick={handleSlackClick}
        onTeamsClick={handleTeamsClick}
      />
      
      <CommunicationTabs
        communications={enrichedCommunications} // Pass enriched data
        scheduledEvents={scheduledEvents} // Keep mock data for now
      />
    </CommunicationsLayout>
  );
};

export default Communications;
