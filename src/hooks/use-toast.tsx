import * as React from "react";
import { createContext, useContext, useState } from "react";

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

const TOAST_REMOVE_DELAY = 1000; // Default 1 second before removing from DOM

type ToasterToast = ToastProps & {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type ToasterToastWithId = ToasterToast & {
  id: string;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
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

interface State {
  toasts: ToasterToastWithId[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

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

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
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

const initialState: State = {
  toasts: [],
};

type ToastContextType = {
  toasts: ToasterToastWithId[];
  toast: (props: ToasterToast) => ToasterToastWithId["id"];
  dismiss: (toastId?: string) => void;
  update: (props: ToasterToast & { id: string }) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

function useToastContext() {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

let dispatch: React.Dispatch<Action>;

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatchAction] = React.useReducer(reducer, initialState);
  dispatch = dispatchAction;

  const toast = React.useMemo(
    () => ({
      toasts: state.toasts,
      toast: (props: ToasterToast) => {
        const id = props.id || genId();
        dispatch({
          type: actionTypes.ADD_TOAST,
          toast: {
            ...props,
            id,
            open: true,
          },
        });
        return id;
      },
      dismiss: (toastId?: string) => {
        dispatch({
          type: actionTypes.DISMISS_TOAST,
          toastId,
        });
      },
      update: (props: ToasterToast & { id: string }) => {
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: props,
        });
      },
    }),
    [state]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const { toast, dismiss, update } = useToastContext();
  return {
    toast: (props: ToasterToast) => {
      return toast(props);
    },
    dismiss,
    update,
    toasts: useToastContext().toasts,
  };
};

export const toast = (props: ToasterToast) => {
  const id = props.id || genId();
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
    },
  });
  return id;
};
