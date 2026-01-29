export interface Notification {
  id: string;
  message: string;
  type: "success" | "error";
  duration?: number;
  isLeaving?: boolean;
};
