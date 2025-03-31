
import { useToastContext } from "./toast-context";
import { toast } from "./toast-actions";
import type { ToasterToast } from "./toast-types";

// Hook to use toast in components
export const useToast = () => {
  const { toast, dismiss, update, toasts } = useToastContext();
  return {
    toast: (props: ToasterToast) => {
      return toast(props);
    },
    dismiss,
    update,
    toasts,
  };
};

export { ToastProvider } from "./toast-context";
export { toast };
