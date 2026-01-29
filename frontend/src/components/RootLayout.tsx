// src/components/layout/RootLayout.tsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Notification from "../UI/Notification/Notification";
import { useAppDispatch, useAppSelector } from "./../hooks/reduxHooks";
import { closeAuthModal } from "./../store/auth/authSlice";
import Modal from "./../UI/Modal/Modal";
import LoginForm from "./AuthForm/LoginForm";
import RegisterForm from "./AuthForm/RegisterForm";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Button from "../UI/Button/Button";
import { addNotification } from "../store/notification/notificationsSlice";
import NotificationContainer from "../UI/Notification/NotificationContainer";

export default function RootLayout() {
  const isAuthModalOpen = useAppSelector((state) => state.auth.modalOpen);
  const authModalType = useAppSelector((state) => state.auth.modalType);

  const dispatch = useAppDispatch();

  // Пример использования
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <>
      <Header />

      <div className="content">
        <Outlet />
      </div>

      <NotificationContainer />

      <Modal
        onClose={() => dispatch(closeAuthModal())}
        isOpen={isAuthModalOpen}
      >
        {authModalType === "login" ? <LoginForm /> : <RegisterForm />}
      </Modal>

      <Footer />
    </>
  );
}
