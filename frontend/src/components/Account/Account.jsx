import { BiSolidUserCircle } from "react-icons/bi";
import Button from "../../UI/Button/Button";

export default function Account({ userExpanded, setUserExpanded }) {
  return (
    <div className="account">
      <Button
        aria-label="Личный кабинет"
        className="account__button"
        onClick={() => setUserExpanded(!userExpanded)}
      >
        <BiSolidUserCircle className="account__button-icon" />
      </Button>

      <div
        className={`account__menu ${
          userExpanded ? "account__menu--expanded" : ""
        }`}
      >
        <a className="account__link" href="#">
          Личный кабинет
        </a>
        <a className="account__link" href="#">
          Выход
        </a>
      </div>
    </div>
  );
}
