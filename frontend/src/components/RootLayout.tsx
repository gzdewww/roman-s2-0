// src/components/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Modal from "./../UI/Modal/Modal";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";
import { useAppSelector } from "./../hooks/reduxHooks";
import { closeAuthModal } from "./../store/auth/authSlice";
import { useEffect, useState } from "react";
import Notification from "../UI/Notification/Notification";
import Button from "../UI/Button/Button";

export default function RootLayout() {
  const isAuthModalOpen = useAppSelector((state) => state.auth.modalOpen);
  const authModalType = useAppSelector((state) => state.auth.modalType);

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
      {showNotification && (
        <Notification
          type="success"
          message="Операция выполнена успешно!"
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="content">
        <Outlet />
      </div>
      {isAuthModalOpen && (
        <Modal onClose={() => closeAuthModal()}>
          {authModalType === "login" ? <LoginForm /> : <RegisterForm />}
        </Modal>
      )}
      <Footer />
    </>
  );
}
