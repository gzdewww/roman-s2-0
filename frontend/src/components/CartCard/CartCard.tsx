import { useAppDispatch } from "../../hooks/reduxHooks";
import type { Dish } from "../../types/dish";
import QuantityControl from "../QuantityControl/QuantityControl";
import "./CartCard.scss";

interface CartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  dish: Dish;
  quantity: number;
  type?: "cart" | "summary";
}

export default function CartCard({ dish, quantity, type }: CartCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`cart-card ${type === "summary" ? "cart-card--summary" : ""}`}
      role="listitem"
      key={dish.id}
    >
      <img className="cart-card__photo" src={'http://localhost:8080'+dish.imageUrl} alt={dish.name} />
      <div className="cart-card__info">
        <h2 className="cart-card__title">{dish.name}</h2>
        <p className="cart-card__description">{dish.description}</p>
        <QuantityControl
          dishId={dish.id}
        />
        <p className="cart-card__price">
          <span className="cart-card__price-value">{dish.price}</span>р
        </p>
      </div>
    </div>
  );
}
