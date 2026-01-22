import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addItem, removeItem, setQuantity } from "../../store/cart/cartSlice";
import type { Dish } from "../../types/dish";
import Button from "../../UI/Button/Button";
import QuantityControl from "../QuantityControl/QuantityControl";

import "./DishCard.scss";

export default function DishCard({ dish }: { dish: Dish }) {
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  return (
    <div className="dish" role="listitem">
      <img
        className="dish__photo"
        src={`http://localhost:8080${dish.imageUrl}`}
        alt={dish.name}
      />
      <h3 className="dish__title">{dish.name}</h3>
      <p className="dish__description">{dish.description}</p>

      <p className="dish__price">
        <span className="dish__price-value">{dish.price}</span>р
      </p>

      <div className="dish__controls">
        {cart.find((inCart) => inCart.dish.id === dish.id) ? (
          <QuantityControl dishId={dish.id} />
        ) : (
          <Button
            className="dish__add"
            onClick={() => dispatch(addItem({ dish, quantity: 1 }))}
          >
            В корзину
          </Button>
        )}
      </div>
    </div>
  );
}
