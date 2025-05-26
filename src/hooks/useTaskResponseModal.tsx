
import { create } from 'zustand';
import type { Task } from '@/lib/supabase'; // Import Supabase Task type

// ActionItem import removed

interface TaskResponseModalState {
  isOpen: boolean;
  selectedTask: (Task & { projectTitle: string }) | null; // Updated selectedTask type
  openModal: (task: Task, projectTitle: string) => void; // Updated openModal signature
  closeModal: () => void;
}

export const useTaskResponseModal = create<TaskResponseModalState>((set) => ({
  isOpen: false,
  selectedTask: null,
  openModal: (task, projectTitle) => set({ 
    isOpen: true, 
    selectedTask: { ...task, projectTitle } // Combine task and projectTitle
  }),
  closeModal: () => set({ isOpen: false, selectedTask: null }),
}));
