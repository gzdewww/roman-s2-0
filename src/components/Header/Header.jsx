import { BsCart, BsTrash } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { useEffect, useMemo, useState } from "react";

import img from "/svg/logo.svg";

import CartCard from "../CartCard/CartCard";
import Button from "../../UI/Button/Button";
import "./Header.scss";

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

  const sum = useMemo(
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

  return (
    <header className="header">
      <div className="header__wrapper">
        <div
          className={`header__burger ${
            burgerExpanded ? "header__burger--expanded" : ""
          }`}
        >
          <Button
            className="header__burger-button"
            onClick={() => setBurgerExpanded((prev) => !prev)}
          >
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
          </Button>
        </div>

        <div className="header__logo">
          <a href="#">
            <img src={img} alt="Roman's logo" />
          </a>
        </div>

        <nav
          className={`header__nav ${
            burgerExpanded ? "header__nav--expanded" : ""
          }`}
          onClick={() => setBurgerExpanded(false)}
        >
          <ul className="header__menu" onClick={(e) => e.stopPropagation()}>
            <li className="header__menu-item">
              <a className="header__menu-link" href="#">
                Меню
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="#">
                Доставка и оплата
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="#">
                Рестораны
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="#">
                Справка
              </a>
            </li>
          </ul>
        </nav>

        <div className="cart">
          <Button
            className="cart-button"
            aria-expanded={cartExpanded}
            aria-controls="cart-dropdown"
            onClick={() => setCartExpanded((prev) => !prev)}
          >
            <BsCart className="cart-icon" />
            <p className="cart-sum" aria-label="Сумма заказа">{`${sum}р`}</p>
          </Button>

          <div
            className={`cart-content ${
              cartExpanded ? "cart-content--expanded" : ""
            }`}
          >
            <div className="cart-header">
              <h2 className="cart-title">Корзина</h2>
              <Button className="cart-clear" onClick={clearCart}>
                <span>Очистить</span>
                <BsTrash />
              </Button>
            </div>

            <div className="cart-dishes" role="list">
              {cart.map((dish) => (
                <CartCard
                  key={dish.id}
                  dish={menu.find((item) => item.id === dish.id)}
                  quantity={dish.quantity}
                  updateCart={(quantity) => updateCart(dish.id, quantity)}
                  removeFromCart={() => removeFromCart(dish.id)}
                />
              ))}

              <div className="cart-total">
                {cart.length > 0 ? (
                  <>
                    <h3 className="cart-total-title">Итого</h3>
                    <p className="cart-total-sum">{sum}р</p>
                  </>
                ) : (
                  <h3 className="cart-empty">Корзина пуста</h3>
                )}
              </div>
            </div>

            <Button
              id="cart-to-order"
              className="cart-order"
              disabled={!cart.length}
            >
              Перейти к оформлению
            </Button>
          </div>
        </div>

        <div className="account">
          <Button
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
      </div>
    </header>
  );
}
