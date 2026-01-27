import { BsXLg } from "react-icons/bs";
import Button from "../Button/Button";
import "./Modal.scss";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

export default function Modal({
  onClose,
  children,
  "aria-labelledby": labelledBy,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={onClose}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {children}
        <Button className="modal__close" aria-label="Закрыть" onClick={onClose}>
          <BsXLg />
        </Button>
      </div>
    </div>
  );
}
