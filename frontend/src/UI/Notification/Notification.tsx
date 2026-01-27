import React, { useEffect, useState } from "react";
import "./Notification.scss";

type NotificationType = "success" | "error";

type Props = {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose: () => void;
};

export default function Notification({
  message,
  type,
  duration = 3000,
  onClose,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsVisible(false); // Начинаем анимацию исчезновения
    }, duration);

    return () => clearTimeout(closeTimer);
  }, [duration]);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === "slideOut") {
      onClose();
    }
  };

  return (
    <div
      className={`notification notification--${type} ${isVisible ? "notification--enter" : "notification--exit"}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="notification__icon">
        {type === "success" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <p className="notification__message">{message}</p>
    </div>
  );
}
