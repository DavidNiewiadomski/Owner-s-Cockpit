
export type MessageType = 'text' | 'task' | 'summary' | 'alert';

export interface AgentMessage {
  id: string;
  content: string;
  timestamp: string;
  role: 'agent' | 'user';
  type: MessageType;
  action?: {
    type: string;
    status: 'pending' | 'completed' | 'failed';
    result?: string;
  };
}
