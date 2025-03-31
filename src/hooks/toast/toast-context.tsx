
import * as React from "react";
import { createContext, useContext, useReducer, useMemo } from "react";
import { 
  ToastContextType, 
  ToasterToast, 
  ToasterToastWithId,
  initialState 
} from "./toast-types";
import { reducer, dispatchToast, genId, toast } from "./toast-actions";

// Create context
const ToastContext = createContext<ToastContextType | null>(null);

// Hook to use the context
export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Provider component
export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  dispatchToast = dispatch;

  const contextValue = useMemo(
    () => ({
      toasts: state.toasts,
      toast: (props: ToasterToast) => {
        const id = props.id || genId();
        dispatch({
          type: "ADD_TOAST",
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
          type: "DISMISS_TOAST",
          toastId,
        });
      },
      update: (props: ToasterToast & { id: string }) => {
        dispatch({
          type: "UPDATE_TOAST",
          toast: props,
        });
      },
    }),
    [state]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
