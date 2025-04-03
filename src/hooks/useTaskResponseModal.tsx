
import { create } from 'zustand';
import { ActionItem } from '@/components/actionItems/ActionItemList';

interface TaskResponseModalState {
  isOpen: boolean;
  selectedTask: ActionItem | null;
  openModal: (task: ActionItem) => void;
  closeModal: () => void;
}

export const useTaskResponseModal = create<TaskResponseModalState>((set) => ({
  isOpen: false,
  selectedTask: null,
  openModal: (task) => set({ isOpen: true, selectedTask: task }),
  closeModal: () => set({ isOpen: false, selectedTask: null }),
}));
