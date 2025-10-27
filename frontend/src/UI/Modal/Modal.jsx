import { BsXLg } from "react-icons/bs";
import Button from "../Button/Button";
import "./Modal.scss";

export default function Modal({ setModalShown, children }) {
  return (
    <div className="modal" onClick={() => setModalShown(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
        <Button
          className="modal__close"
          aria-label="Закрыть"
          onClick={() => setModalShown(false)}
        >
          <BsXLg />
        </Button>
      </div>
    </div>
  );
}
