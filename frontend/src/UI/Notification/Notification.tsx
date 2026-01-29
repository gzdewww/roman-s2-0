import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import "./Notification.scss";

type Props = {
  id: string;
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
};

export default function Notification({ message, type, duration = 3000, onClose }: Props) {
  const [isLeaving, setIsLeaving] = useState(false);

  // Запускаем таймер только один раз при монтировании
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true); // запускаем анимацию выхода
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === "notificationSlideOut" && isLeaving) {
      onClose();
    }
  };

  return (
    <div
      className={`notification notification--${type} ${isLeaving ? "notification--exit" : "notification--enter"}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="notification__icon">
        {type === "success" ? <BsCheckCircleFill /> : <BsXCircleFill />}
      </div>
      <p className="notification__message">{message}</p>
    </div>
  );
}
