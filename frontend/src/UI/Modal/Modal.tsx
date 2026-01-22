import { BsXLg } from "react-icons/bs";
import Button from "../Button/Button";
import "./Modal.scss";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // клик по бэкдропу закрывает
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button className="modal__close" aria-label="Закрыть" onClick={onClose}>
          <BsXLg />
        </Button>
      </div>
    </div>
  );
}
