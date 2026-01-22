import { BsCart, BsTrash } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import CartCard from "../CartCard/CartCard";
import "./Cart.scss";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearCart } from "../../store/cart/cartSlice";

interface CartProps {
  sum: number;
  cartExpanded: boolean;
  setCartExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cart({
  sum,
  cartExpanded,
  setCartExpanded,
}: CartProps) {
  const dishes = useAppSelector((state) => state.dishes.items);
  const cart = useAppSelector((state) => state.cart.items);

  const dispatch = useAppDispatch();

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
          <Button
            className="cart__clear"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            <span>Очистить</span>
            <BsTrash />
          </Button>
        </div>

        {cart.length > 0 ? (
          <div className="cart__dishes" role="list">
            {cart.map((dish) => (
              <CartCard
                key={dish.dish.id}
                dish={dish.dish}
                quantity={dish.quantity}
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
