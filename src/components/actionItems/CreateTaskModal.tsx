import React, { useState, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Task, Project, TeamMember } from '@/lib/supabase';
import { createTask } from '@/services/dataService'; // Import createTask
// Placeholder for a potential Alert component for errors
// import { Alert, AlertDescription } from "@/components/ui/alert"; 

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (newTask: Task) => void;
  projects: Project[];
  teamMembers: TeamMember[];
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  projects,
  teamMembers,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [assignedToId, setAssignedToId] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setProjectId(undefined);
    setAssignedToId(undefined);
    setDueDate(undefined);
    setPriority('medium');
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!projectId) {
      setError('Project selection is required.');
      return;
    }

    setIsSaving(true);

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      project_id: projectId,
      assigned_to: assignedToId,
      due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : undefined,
      priority,
      status: 'pending' as Task['status'],
    };

    try {
      // Replace placeholder with actual service call
      // taskData already matches Omit<Task, 'id' | 'created_at' | 'updated_at' | 'created_by'>
      const newTaskFromResponse = await createTask(taskData);

      onTaskCreated(newTaskFromResponse);
      // TODO: Show success toast (optional)
      // toast({ title: "Task Created", description: `Task "${newTask.title}" was successfully created.` });
      resetForm();
      onClose();
    } catch (err) {
      console.error('Failed to create task:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm(); // Reset form if modal is closed by clicking outside or Esc
      }
    }}>
      <DialogContent className="sm:max-w-[525px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in the details for the new task. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right text-gray-300">
                Project
              </Label>
              <Select value={projectId} onValueChange={setProjectId} required>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id} className="hover:bg-gray-700">
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right text-gray-300">
                Assigned To
              </Label>
              <Select value={assignedToId} onValueChange={setAssignedToId}>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select assignee (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="unassigned" className="text-gray-400 hover:bg-gray-700">Unassigned</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id} className="hover:bg-gray-700">
                      {member.name} ({member.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right text-gray-300">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`col-span-3 justify-start text-left font-normal bg-gray-800 border-gray-700 hover:bg-gray-700 text-white ${
                      !dueDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="text-white" // Apply text-white to calendar for better visibility in dark mode
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right text-gray-300">
                Priority
              </Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Task['priority'])}>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="low" className="hover:bg-gray-700">Low</SelectItem>
                  <SelectItem value="medium" className="hover:bg-gray-700">Medium</SelectItem>
                  <SelectItem value="high" className="hover:bg-gray-700">High</SelectItem>
                  <SelectItem value="critical" className="hover:bg-gray-700">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="my-2 p-3 bg-red-900/30 border border-red-700/50 rounded-md text-red-400 text-sm">
              {/* Using simple div for error, Alert component can be used if available & styled */}
              <p>Error: {error}</p>
            </div>
          )}

          <DialogFooter className="sm:justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => { onClose(); resetForm(); }} className="border-gray-700 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Task'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
