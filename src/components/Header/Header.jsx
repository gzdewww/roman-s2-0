import { useEffect, useMemo, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";

import img from "/svg/logo.svg";

import { Link } from "react-router";
import Button from "../../UI/Button/Button";
import Cart from "../Cart/Cart";
import "./Header.scss";
import Account from "../Account/Account";

export default function Header({
  menu,
  cart,
  removeFromCart,
  updateCart,
  clearCart,
}) {
  const [cartExpanded, setCartExpanded] = useState(false);
  const [userExpanded, setUserExpanded] = useState(false);
  const [burgerExpanded, setBurgerExpanded] = useState(false);

  const cartSum = useMemo(
    () =>
      cart.reduce((acc, item) => {
        return (
          acc + menu.find((dish) => dish.id === item.id).price * item.quantity
        );
      }, 0),
    [cart, menu]
  );

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(".cart")) setCartExpanded(false);
      if (!event.target.closest(".account")) setUserExpanded(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  const handleLinkClick = () => {
    setBurgerExpanded(false);
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div
          className={`header__burger ${
            burgerExpanded ? "header__burger--expanded" : ""
          }`}
        >
          <Button
            aria-label="Открыть меню"
            className="header__burger-button"
            onClick={() => setBurgerExpanded((prev) => !prev)}
          >
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
          </Button>
        </div>

        <div className="header__logo">
          <Link className="header__logo-link" to="/">
            <img src={img} alt="Roman's logo" />
          </Link>
        </div>

        <nav
          className={`header__nav ${
            burgerExpanded ? "header__nav--expanded" : ""
          }`}
          onClick={() => setBurgerExpanded(false)}
        >
          <ul className="header__menu" onClick={(e) => e.stopPropagation()}>
            <li className="header__menu-item">
              <Link
                className="header__menu-link"
                to="/menu"
                onClick={handleLinkClick}
              >
                Меню
              </Link>
            </li>
            <li className="header__menu-item">
              <a
                className="header__menu-link"
                href="/delivery"
                onClick={handleLinkClick}
              >
                Доставка и оплата
              </a>
            </li>
            <li className="header__menu-item">
              <a
                className="header__menu-link"
                href="/restaurants"
                onClick={handleLinkClick}
              >
                Рестораны
              </a>
            </li>
            <li className="header__menu-item">
              <Link
                className="header__menu-link"
                to="/about"
                onClick={handleLinkClick}
              >
                О нас
              </Link>
            </li>
          </ul>
        </nav>

        <Cart
          sum={cartSum}
          cartExpanded={cartExpanded}
          setCartExpanded={setCartExpanded}
          menu={menu}
          cart={cart}
          removeFromCart={removeFromCart}
          updateCart={updateCart}
          clearCart={clearCart}
        />

        <Account
          userExpanded={userExpanded}
          setUserExpanded={setUserExpanded}
        />
      </div>
    </header>
  );
}
