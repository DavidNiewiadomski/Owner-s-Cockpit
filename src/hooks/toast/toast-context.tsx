
import * as React from "react";
import { createContext, useContext, useReducer, useMemo } from "react";
import { 
  ToastContextType, 
  ToasterToast, 
  ToasterToastWithId,
  initialState,
  Action
} from "./toast-types";
import { reducer, dispatchToastRef, genId, addToAutoDismissQueue, toastTimeouts } from "./toast-actions";

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
  
  // Set the dispatch function reference
  React.useEffect(() => {
    dispatchToastRef.current = dispatch;
    return () => {
      // Clean up timeouts when the provider unmounts
      toastTimeouts.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.clear();
      dispatchToastRef.current = null;
    };
  }, [dispatch]);

  const contextValue = useMemo(
    () => ({
      toasts: state.toasts,
      toast: (props: ToasterToast) => {
        const id = props.id || genId();
        const newToast = {
          ...props,
          id,
          open: true,
        };
        
        dispatch({
          type: "ADD_TOAST",
          toast: newToast,
        });
        
        // Auto-dismiss after 4 seconds
        addToAutoDismissQueue(id, 4000);
        
        return id;
      },
      dismiss: (toastId?: string) => {
        // Clear auto-dismiss timeout if dismissing manually
        if (toastId && toastTimeouts.has(`auto-${toastId}`)) {
          clearTimeout(toastTimeouts.get(`auto-${toastId}`));
          toastTimeouts.delete(`auto-${toastId}`);
        }
        
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
