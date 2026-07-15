import {
  createContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import AppSnackbar from "../components/AppSnackbar/AppSnackbar";

interface Notification {
  id: string;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface NotificationContextType {
  showNotification: (
    message: string,
    severity?: "success" | "error" | "warning" | "info"
  ) => void;
  closeNotification: (id: string) => void;
}

export const NotificationContext = createContext({} as NotificationContextType);

interface Props {
  children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (
      message: string,
      severity: "success" | "error" | "warning" | "info" = "info"
    ) => {
      const id = Date.now().toString();
      const notification: Notification = {
        id,
        message,
        severity,
      };

      setNotifications((prev) => [...prev, notification]);

      // Auto remove after 4 seconds
      setTimeout(() => {
        closeNotification(id);
      }, 4000);
    },
    []
  );

  const closeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
      {notifications.map((notification) => (
        <AppSnackbar
          key={notification.id}
          open={true}
          message={notification.message}
          severity={notification.severity}
          onClose={() => closeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
}
