import { BsCart, BsTrash } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import CartCard from "../CartCard/CartCard";
import "./Cart.scss";

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
        </div>

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

        <Button
          id="cart-to-order"
          className="cart-order"
          disabled={!cart.length}
        >
          Перейти к оформлению
        </Button>
      </div>
    </div>
  );
}
