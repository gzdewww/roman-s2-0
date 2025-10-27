import CartCard from "../../components/CartCard/CartCard";
import Button from "../../UI/Button/Button";
import Select from "../../UI/Select/Select";

import "./Summary.scss";

export default function Summary({ menu, cart, removeFromCart, updateCart }) {
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
        >
          Оформить заказ
        </Button>
      </div>

      <div className="summary__dishes">
        {cart.map((dish) => (
          <CartCard
            className="cart-card cart-card--summary"
            key={dish.id}
            dish={menu.find((item) => item.id === dish.id)}
            quantity={dish.quantity}
            removeFromCart={() => removeFromCart(dish.id)}
            updateCart={(value) => updateCart(dish.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
