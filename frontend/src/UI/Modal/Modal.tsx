import { BsXLg } from "react-icons/bs";
import Button from "../Button/Button";
import "./Modal.scss";
import { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  "aria-labelledby"?: string;
  isOpen?: boolean; // Улучшение: явное указание состояния открытия модального окна
}

export default function Modal({
  onClose,
  children,
  "aria-labelledby": labelledBy,
  isOpen = true, // По умолчанию модальное окно открыто
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Оптимизация: фокусировка на модальном окне при открытии
  useEffect(() => {
    if (isOpen) {
      const modalElement = modalRef.current;
      if (modalElement) {
        modalElement.focus(); // Позволяет клавиатурной навигации попасть в модальное окно
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [onClose, isOpen]);

  // Предотвращение скролла страницы при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Очистка при размонтировании
    };
  }, [isOpen]);

  // Если модальное окно не открыто — ничего не рендерим
  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={onClose}
      tabIndex={-1} // Позволяет фокусироваться на контейнере
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
        role="document"
        aria-label="Модальное окно"
      >
        {children}
        <Button className="modal__close" aria-label="Закрыть" onClick={onClose}>
          <BsXLg />
        </Button>
      </div>
    </div>
  );
}
