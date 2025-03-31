
import { Action, actionTypes, State, ToasterToast } from "./toast-types";
import * as React from "react";

// ID Generation
let count = 0;

export function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Timeout Management
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

export const addToRemoveQueue = (toastId: string, delay: number) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatchToast({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    });
  }, delay);

  toastTimeouts.set(toastId, timeout);
};

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          { ...action.toast, id: action.toast.id || genId() },
        ],
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

      // Side effects
      if (toastId) {
        addToRemoveQueue(toastId, 1000);
      } else {
        state.toasts.forEach((toast) => {
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

// Create a mutable dispatch variable
// This needs to be mutable and will be set by the context
export let dispatchToast: React.Dispatch<Action>;

// Standalone toast function
export const toast = (props: ToasterToast) => {
  const id = props.id || genId();
  dispatchToast({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
    },
  });
  return id;
};
