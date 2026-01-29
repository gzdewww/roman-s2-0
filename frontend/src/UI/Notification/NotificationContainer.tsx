import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeNotification } from "../../store/notification/notificationsSlice";
import Notification from "./Notification";
import "./NotificationContainer.scss";

export default function NotificationContainer() {
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => dispatch(removeNotification(notification.id))}
        />
      ))}
    </div>
  );
}
