import { BsCart, BsTrash } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";

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

  const sum = cart.reduce((acc, item) => {
    return acc + menu.find((dish) => dish.id === item.id).price * item.quantity;
  }, 0);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(".header__cart")) setCartExpanded(false);
      if (!event.target.closest(".header__account")) setUserExpanded(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <a href="#">
            <img src={img} alt="Roman's logo" />
          </a>
        </div>

        <nav className="header__nav">
          <ul className="header__menu">
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

        <div className="header__cart">
          <Button
            className="header__cart-button"
            onClick={() => setCartExpanded((prev) => !prev)}
          >
            <BsCart className="header__cart-icon" />
            <p
              className="header__cart-sum"
              aria-label="Сумма заказа"
            >{`${sum}р.`}</p>
          </Button>

          <div
            className={`header__cart-content ${
              cartExpanded ? "header__cart-content--expanded" : ""
            }`}
          >
            <div className="header__cart-header">
              <h1 className="header__cart-title">Корзина</h1>
              <Button className="header__cart-clear" onClick={clearCart}>
                <span>Очистить</span>
                <BsTrash />
              </Button>
            </div>

            <div className="header__cart-dishes">
              {cart.map((dish) => (
                <CartCard
                  key={dish.id}
                  dish={menu.find((item) => item.id === dish.id)}
                  quantity={dish.quantity}
                  updateCart={(quantity) => updateCart(dish.id, quantity)}
                  removeFromCart={() => removeFromCart(dish.id)}
                />
              ))}

              <div className="header__cart-total">
                {cart.length > 0 ? (
                  <>
                    <h1 className="header__cart-total-title">Итого</h1>
                    <p className="header__cart-total-sum">{sum}р.</p>
                  </>
                ) : (
                  <h1 className="header__cart-empty">Корзина пуста</h1>
                )}
              </div>
            </div>

            <Button id="cart-to-order" className="header__cart-order" disabled>
              Перейти к оформлению
            </Button>
          </div>
        </div>

        <div className="header__account">
          <Button
            className="header__account-button"
            onClick={() => setUserExpanded(!userExpanded)}
          >
            <BiSolidUserCircle className="header__account-icon" />
          </Button>

          <div
            className={`header__account-menu ${
              userExpanded ? "header__account-menu--expanded" : ""
            }`}
          >
            <a className="header__account-link" href="./src/html/cabinet.html">
              Личный кабинет
            </a>
            <a className="header__account-link" href="#">
              Выход
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
