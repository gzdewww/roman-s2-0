import { createOrder } from "../../api/ordersApi";
import CartCard from "../../components/CartCard/CartCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearCart, removeItem } from "../../store/cart/cartSlice";
import { DeliveryType } from "../../types/enums";
import Button from "../../UI/Button/Button";
import Select from "../../UI/Select/Select";

import "./Summary.scss";

export default function Summary() {
  const cart = useAppSelector((state) => state.cart.items);

  const dispatch = useAppDispatch();

  return (
    <div className="content__summary">
      <div className="summary__delivery">
        <h1>Способ доставки</h1>
        <Select
          options={[
            { label: "Самовывоз", value: "self" },
            { label: "Доставка", value: "delivery" },
          ]}
          activeOption="delivery"
          setActiveOption={() => {}}
        />

        <h1>Адрес</h1>
        <Select
          options={[
            { label: "Каховская", value: "kakhovska" },
            { label: "Мичурина", value: "michurina" },
            { label: "Добавить", value: "add" },
          ]}
          activeOption="michurina"
          setActiveOption={() => {}}
        />
      </div>
      <div className="summary__pay">
        <h1>Итого</h1>
        <p className="summary__pay-total">
          <span className="summary__pay-value">0</span> р.
        </p>

        <h1>Способ оплаты</h1>
        <Select
          options={[
            { label: "Наличными курьеру", value: "cash" },
            { label: "Картой курьеру", value: "card" },
          ]}
          activeOption="card"
          setActiveOption={() => {}}
        />

        <Button
          className="summary__pay-button"
          type="button"
          disabled={cart.length === 0}
          onClick={() => {
            createOrder({
              deliveryType: DeliveryType.DELIVERY,
              deliveryAddress: "Мичурина",
              items: cart.map((item) => ({
                dishId: item.dish.id,
                quantity: item.quantity,
              })),
            });
            dispatch(clearCart());
          }}
        >
          Оформить заказ
        </Button>
      </div>

      <div className="summary__dishes">
        {cart.map((dish) => (
          <CartCard
            className="cart-card cart-card--summary"
            key={dish.dish.id}
            dish={dish.dish}
            quantity={dish.quantity}
            type="summary"
          />
        ))}
      </div>
    </div>
  );
}
