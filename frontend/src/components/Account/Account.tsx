import { BiSolidUserCircle } from "react-icons/bi";
import Button from "../../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout, openAuthModal } from "../../store/auth/authSlice";

import "./Account.scss";
import { Link, useNavigate } from "react-router";

interface AccountProps {
  userExpanded: boolean;
  setUserExpanded: (value: boolean) => void;
}

export default function Account({
  userExpanded,
  setUserExpanded,
}: AccountProps) {
  const isAuth = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();

  const nav = useNavigate();

  const handleLogout = () => {
    setUserExpanded(false);
    dispatch(logout());
    nav("/");
  };

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
        {isAuth ? (
          <>
            <Link className="account__link" to="/profile">
              Личный кабинет
            </Link>
            <a className="account__link" href="#" onClick={handleLogout}>
              Выход
            </a>
          </>
        ) : (
          <>
            <a
              className="account__link"
              href="#"
              onClick={() => {
                dispatch(openAuthModal("login"));
              }}
            >
              Войти
            </a>
            <a
              className="account__link"
              href="#"
              onClick={() => {
                dispatch(openAuthModal("register"));
              }}
            >
              Зарегистрироваться
            </a>
          </>
        )}
      </div>
    </div>
  );
}
