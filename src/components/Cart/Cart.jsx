import { BsCart, BsTrash } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import CartCard from "../CartCard/CartCard";
import "./Cart.scss";
import { Link } from "react-router";

export default function Cart({
  sum,
  cartExpanded,
  setCartExpanded,
  menu,
  cart,
  removeFromCart,
  updateCart,
  clearCart,
}) {
  return (
    <div className="cart">
      <Button
        className="cart__button"
        aria-expanded={cartExpanded}
        aria-controls="cart__dropdown"
        onClick={() => setCartExpanded((prev) => !prev)}
      >
        <BsCart className="cart__icon" />
        <p className="cart__sum" aria-label="Сумма заказа">{`${sum}р`}</p>
      </Button>

      <div
        className={`cart__content ${
          cartExpanded ? "cart__content--expanded" : ""
        }`}
      >
        <div className="cart__header">
          <h2 className="cart__title">Корзина</h2>
          <Button className="cart__clear" onClick={clearCart}>
            <span>Очистить</span>
            <BsTrash />
          </Button>
        </div>

        {cart.length > 0 ? (
          <div className="cart__dishes" role="list">
            {cart.map((dish) => (
              <CartCard
                key={dish.id}
                dish={menu.find((item) => item.id === dish.id)}
                quantity={dish.quantity}
                updateCart={(quantity) => updateCart(dish.id, quantity)}
                removeFromCart={() => removeFromCart(dish.id)}
              />
            ))}
          </div>
        ) : (
          ""
        )}

        <div className="cart__total">
          {cart.length > 0 ? (
            <>
              <h3 className="cart__total-title">Итого</h3>
              <p className="cart__total-sum">{sum}р</p>
            </>
          ) : (
            <h3 className="cart__empty">Корзина пуста</h3>
          )}
        </div>

        <Button
          id="cart-to-order"
          className="cart__order"
          onClick={() => setCartExpanded(false)}
          disabled={!cart.length}
        >
          <Link className="cart__order-link" to="/summary">
            Перейти к оформлению
          </Link>
        </Button>
      </div>
    </div>
  );
}
