
import { Action, actionTypes, State, ToasterToast } from "./toast-types";
import * as React from "react";

// ID Generation
let count = 0;

export function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Instead of exporting the dispatch function directly, we'll use a mutable reference
// that can be updated from other modules
export const dispatchToastRef: { current: React.Dispatch<Action> | null } = { current: null };

// Timeout Management
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

export const addToRemoveQueue = (toastId: string, delay: number = 1000) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    if (dispatchToastRef.current) {
      dispatchToastRef.current({
        type: actionTypes.REMOVE_TOAST,
        toastId: toastId,
      });
    }
  }, delay);

  toastTimeouts.set(toastId, timeout);
};

// Auto-dismiss functionality
export const addToAutoDismissQueue = (toastId: string, delay: number = 4000) => {
  const timeout = setTimeout(() => {
    if (dispatchToastRef.current) {
      dispatchToastRef.current({
        type: actionTypes.DISMISS_TOAST,
        toastId: toastId,
      });
    }
  }, delay);

  // Store with a different key to avoid conflicts
  toastTimeouts.set(`auto-${toastId}`, timeout);
};

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      const newToast = { ...action.toast, id: action.toast.id || genId() };
      
      // Don't auto-dismiss here - it's handled in the context provider
      
      return {
        ...state,
        toasts: [...state.toasts, newToast],
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // Clear auto-dismiss timeout if it exists
      if (toastId && toastTimeouts.has(`auto-${toastId}`)) {
        clearTimeout(toastTimeouts.get(`auto-${toastId}`));
        toastTimeouts.delete(`auto-${toastId}`);
      }

      // Side effects - remove from DOM after animation
      if (toastId) {
        addToRemoveQueue(toastId, 1000);
      } else {
        state.toasts.forEach((toast) => {
          // Clear auto-dismiss timeouts for all toasts
          if (toastTimeouts.has(`auto-${toast.id}`)) {
            clearTimeout(toastTimeouts.get(`auto-${toast.id}`));
            toastTimeouts.delete(`auto-${toast.id}`);
          }
          addToRemoveQueue(toast.id, 1000);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// Standalone toast function
export const toast = (props: ToasterToast) => {
  const id = props.id || genId();
  
  if (dispatchToastRef.current) {
    dispatchToastRef.current({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        open: true,
      },
    });
  } else {
    console.error("Toast dispatch function not set. Make sure ToastProvider is mounted.");
  }
  
  return id;
};
