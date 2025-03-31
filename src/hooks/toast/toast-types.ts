
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import * as React from "react";

// Constants
export const TOAST_REMOVE_DELAY = 1000; // Default 1 second before removing from DOM

// Types
export type ToasterToast = ToastProps & {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export type ToasterToastWithId = ToasterToast & {
  id: string;
};

export const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

export type ActionType = typeof actionTypes;

export type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast> & { id: string };
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

export interface State {
  toasts: ToasterToastWithId[];
}

// Export initialState which was missing
export const initialState: State = {
  toasts: [],
};

export type ToastContextType = {
  toasts: ToasterToastWithId[];
  toast: (props: ToasterToast) => ToasterToastWithId["id"];
  dismiss: (toastId?: string) => void;
  update: (props: ToasterToast & { id: string }) => void;
};
