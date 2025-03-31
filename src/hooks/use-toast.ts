
import React from 'react'; // Added import for React
import { useState, useEffect, useRef } from 'react';
import { createContext, useCallback, useContext } from 'react';

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "success" | "destructive" | "default";
  duration?: number;
};

type Toast = ToasterToast & {
  open: boolean;
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: ToasterToast) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { toasts, addToast, removeToast } = context;

  const toast = useCallback(
    (props: ToasterToast) => {
      addToast(props);
    },
    [addToast]
  );

  return {
    toast,
    toasts,
    dismiss: removeToast,
  };
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = useCallback((toast: ToasterToast) => {
    setToasts((prevToasts) => {
      // If we already have TOAST_LIMIT toasts, remove the oldest one
      const newToasts = prevToasts.length >= TOAST_LIMIT ? prevToasts.slice(1) : prevToasts;
      
      return [
        ...newToasts,
        { ...toast, id: toast.id || crypto.randomUUID(), open: true },
      ];
    });
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
    
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, TOAST_REMOVE_DELAY);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const toast = {
  success(props: Omit<ToasterToast, "variant">) {
    const { addToast } = useContext(ToastContext) || {};
    if (addToast) {
      addToast({ ...props, variant: "success" });
    }
  },
  
  error(props: Omit<ToasterToast, "variant">) {
    const { addToast } = useContext(ToastContext) || {};
    if (addToast) {
      addToast({ ...props, variant: "destructive" });
    }
  },
  
  default(props: ToasterToast) {
    const { addToast } = useContext(ToastContext) || {};
    if (addToast) {
      addToast(props);
    }
  },
};
