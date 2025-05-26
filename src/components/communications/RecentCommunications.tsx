
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // AvatarImage removed as contact field is gone
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, MessageSquare, Phone } from 'lucide-react'; // Video, FileText removed
import type { Communication as SupabaseCommunication } from '@/lib/supabase'; // Use Supabase Communication type

interface RecentCommunicationsProps {
  communications: (SupabaseCommunication & { projectTitle: string })[]; // Expect enriched communications
}

export function RecentCommunications({ communications }: RecentCommunicationsProps) {
  const getIcon = (type: SupabaseCommunication['communication_type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-400" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-green-400" />;
      case 'call':
        return <Phone className="h-4 w-4 text-yellow-400" />;
      case 'meeting': // This type exists in Supabase Communication
        return <Calendar className="h-4 w-4 text-purple-400" />;
      default:
        // Assert exhaustive check or provide a true default
        const _exhaustiveCheck: never = type;
        return <MessageSquare className="h-4 w-4 text-gray-400" />; // Default icon
    }
  };
  
  return (
    <Card className="border-cyan-900/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-blue-300">Recent Communications</CardTitle>
        <CardDescription className="text-gray-400">
          Your latest interactions and discussions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {communications.length > 0 ? (
          communications.map((comm) => (
            <div 
              key={comm.id}
              className="p-3 border border-cyan-900/20 rounded-lg hover:bg-blue-950/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-cyan-900/40">
                  {/* AvatarImage removed as comm.contact is not available. Displaying initials from sender_id or a generic icon. */}
                  <AvatarFallback className="bg-blue-950/50 text-blue-200">
                    {/* Displaying 'S' for Sender or first two chars of sender_id if available */}
                    {comm.sender_id ? comm.sender_id.substring(0, 2).toUpperCase() : 'S'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {/* Display sender_id or a placeholder if name resolution is not implemented */}
                      <span className="font-medium text-blue-200">{comm.sender_id || 'Unknown Sender'}</span>
                      {getIcon(comm.communication_type)}
                    </div>
                    {/* Format created_at for date display */}
                    <div className="text-xs text-gray-500">
                      {new Date(comm.created_at).toLocaleDateString()} {new Date(comm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {/* Title remains the same */}
                  {comm.title && (
                    <div className="text-sm font-medium text-gray-300 mt-1">
                      {comm.title}
                    </div>
                  )}
                  
                  {/* Content remains the same */}
                  {comm.content && (
                    <div className="text-sm text-gray-400 mt-0.5 line-clamp-2">
                      {comm.content}
                    </div>
                  )}
                  
                  {/* Use projectTitle from enriched data */}
                  {comm.projectTitle && (
                    <div className="mt-1.5">
                      <Badge variant="outline" className="text-xs border-blue-900/30 text-blue-400 bg-blue-950/20">
                        {comm.projectTitle}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto opacity-50 mb-2" />
            <p>No recent communications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
