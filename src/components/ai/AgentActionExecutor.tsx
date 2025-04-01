
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Check, File, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentActionExecutorProps {
  actionType: string;
  onComplete: () => void;
}

export function AgentActionExecutor({ actionType, onComplete }: AgentActionExecutorProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('medium');

  // Simulates executing the action with a delay
  const executeAction = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      onComplete();
    }, 2000);
  };

  const renderEmailForm = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="recipient" className="text-xs text-gray-400">Recipient</Label>
        <Input 
          id="recipient" 
          value={recipient} 
          onChange={e => setRecipient(e.target.value)}
          placeholder="recipient@example.com"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="subject" className="text-xs text-gray-400">Subject</Label>
        <Input 
          id="subject" 
          value={subject} 
          onChange={e => setSubject(e.target.value)}
          placeholder="Email subject"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="content" className="text-xs text-gray-400">Message</Label>
        <Textarea 
          id="content" 
          value={content} 
          onChange={e => setContent(e.target.value)}
          placeholder="Enter your message here..."
          className="text-xs min-h-[80px] bg-gray-800 border-gray-700 resize-none"
        />
      </div>
      <div className="flex items-center text-xs text-blue-400">
        <Paperclip className="h-3 w-3 mr-1" />
        <span>project_update.pdf attached</span>
      </div>
    </div>
  );

  const renderCallForm = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="recipient" className="text-xs text-gray-400">Contact</Label>
        <Input 
          id="recipient" 
          value={recipient} 
          onChange={e => setRecipient(e.target.value)}
          placeholder="Contact name or number"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="subject" className="text-xs text-gray-400">Topic</Label>
        <Input 
          id="subject" 
          value={subject} 
          onChange={e => setSubject(e.target.value)}
          placeholder="Call topic"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="notes" className="text-xs text-gray-400">Notes</Label>
        <Textarea 
          id="notes" 
          value={content} 
          onChange={e => setContent(e.target.value)}
          placeholder="Call preparation notes..."
          className="text-xs min-h-[60px] bg-gray-800 border-gray-700 resize-none"
        />
      </div>
    </div>
  );

  const renderReportForm = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="reportType" className="text-xs text-gray-400">Report Type</Label>
        <Select defaultValue="progress">
          <SelectTrigger className="h-8 text-xs bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="progress">Progress Report</SelectItem>
            <SelectItem value="financial">Financial Report</SelectItem>
            <SelectItem value="issue">Issue Report</SelectItem>
            <SelectItem value="safety">Safety Report</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="project" className="text-xs text-gray-400">Project</Label>
        <Select defaultValue="east-tower">
          <SelectTrigger className="h-8 text-xs bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="east-tower">East Tower</SelectItem>
            <SelectItem value="west-complex">West Complex</SelectItem>
            <SelectItem value="downtown">Downtown Project</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description" className="text-xs text-gray-400">Description</Label>
        <Textarea 
          id="description" 
          value={content} 
          onChange={e => setContent(e.target.value)}
          placeholder="Report description..."
          className="text-xs min-h-[60px] bg-gray-800 border-gray-700 resize-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-300">
          <File className="h-3 w-3 mr-1 text-blue-400" />
          <span>Include analytics</span>
        </div>
        <div className="flex items-center text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-300">
          <File className="h-3 w-3 mr-1 text-blue-400" />
          <span>Include charts</span>
        </div>
      </div>
    </div>
  );

  const renderScheduleForm = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="title" className="text-xs text-gray-400">Meeting Title</Label>
        <Input 
          id="title" 
          value={subject} 
          onChange={e => setSubject(e.target.value)}
          placeholder="Meeting title"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="date" className="text-xs text-gray-400">Date</Label>
          <Input 
            id="date" 
            type="date"
            value={date} 
            onChange={e => setDate(e.target.value)}
            className="h-8 text-xs bg-gray-800 border-gray-700"
          />
        </div>
        <div>
          <Label htmlFor="time" className="text-xs text-gray-400">Time</Label>
          <Input 
            id="time" 
            type="time"
            value={time} 
            onChange={e => setTime(e.target.value)}
            className="h-8 text-xs bg-gray-800 border-gray-700"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="participants" className="text-xs text-gray-400">Participants</Label>
        <Input 
          id="participants" 
          value={recipient} 
          onChange={e => setRecipient(e.target.value)}
          placeholder="Enter participants (comma separated)"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="agenda" className="text-xs text-gray-400">Agenda</Label>
        <Textarea 
          id="agenda" 
          value={content} 
          onChange={e => setContent(e.target.value)}
          placeholder="Meeting agenda..."
          className="text-xs min-h-[60px] bg-gray-800 border-gray-700 resize-none"
        />
      </div>
    </div>
  );

  const renderReminderForm = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="reminder" className="text-xs text-gray-400">Reminder</Label>
        <Input 
          id="reminder" 
          value={subject} 
          onChange={e => setSubject(e.target.value)}
          placeholder="What to remind about"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="date" className="text-xs text-gray-400">Date</Label>
          <Input 
            id="date" 
            type="date"
            value={date} 
            onChange={e => setDate(e.target.value)}
            className="h-8 text-xs bg-gray-800 border-gray-700"
          />
        </div>
        <div>
          <Label htmlFor="time" className="text-xs text-gray-400">Time</Label>
          <Input 
            id="time" 
            type="time"
            value={time} 
            onChange={e => setTime(e.target.value)}
            className="h-8 text-xs bg-gray-800 border-gray-700"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="priority" className="text-xs text-gray-400">Priority</Label>
        <Select 
          defaultValue={priority} 
          onValueChange={setPriority}
        >
          <SelectTrigger className="h-8 text-xs bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="notes" className="text-xs text-gray-400">Notes</Label>
        <Textarea 
          id="notes" 
          value={content} 
          onChange={e => setContent(e.target.value)}
          placeholder="Additional notes..."
          className="text-xs min-h-[60px] bg-gray-800 border-gray-700 resize-none"
        />
      </div>
    </div>
  );

  const renderAlertForm = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="alertType" className="text-xs text-gray-400">Alert Type</Label>
        <Select defaultValue="issue">
          <SelectTrigger className="h-8 text-xs bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select alert type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="issue">Issue Alert</SelectItem>
            <SelectItem value="safety">Safety Incident</SelectItem>
            <SelectItem value="delay">Project Delay</SelectItem>
            <SelectItem value="budget">Budget Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="priority" className="text-xs text-gray-400">Priority</Label>
        <Select 
          defaultValue={priority} 
          onValueChange={setPriority}
        >
          <SelectTrigger className="h-8 text-xs bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="recipients" className="text-xs text-gray-400">Recipients</Label>
        <Input 
          id="recipients" 
          value={recipient} 
          onChange={e => setRecipient(e.target.value)}
          placeholder="Who to notify"
          className="h-8 text-xs bg-gray-800 border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="alertMessage" className="text-xs text-gray-400">Alert Message</Label>
        <Textarea 
          id="alertMessage" 
          value={content} 
          onChange={e => setContent(e.target.value)}
          placeholder="Alert details..."
          className="text-xs min-h-[60px] bg-gray-800 border-gray-700 resize-none"
        />
      </div>
    </div>
  );

  let actionForm;
  let actionTitle = "";
  
  switch (actionType) {
    case 'email':
      actionForm = renderEmailForm();
      actionTitle = "Draft Email";
      break;
    case 'call':
      actionForm = renderCallForm();
      actionTitle = "Make Call";
      break;
    case 'report':
      actionForm = renderReportForm();
      actionTitle = "Generate Report";
      break;
    case 'schedule':
      actionForm = renderScheduleForm();
      actionTitle = "Schedule Meeting";
      break;
    case 'reminder':
      actionForm = renderReminderForm();
      actionTitle = "Set Reminder";
      break;
    case 'alert':
      actionForm = renderAlertForm();
      actionTitle = "Send Alert";
      break;
    default:
      actionForm = <div>Unknown action type</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-blue-100">{actionTitle}</h3>
      </div>
      
      {actionForm}
      
      <div className="flex justify-end">
        <Button 
          onClick={executeAction}
          disabled={isExecuting}
          size="sm"
          className={cn(
            "h-8 text-xs",
            isExecuting ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          {isExecuting ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="h-3 w-3 mr-1" />
              Complete Action
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
