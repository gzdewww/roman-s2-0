import Button from "../../UI/Button/Button";
import QuantityControl from "../QuantityControl/QuantityControl";

import "./DishCard.scss";

export default function DishCard({
  dish,
  cart,
  addToCart,
  removeFromCart,
  updateCart,
}) {
  const inCart = cart?.find((item) => item.id === dish.id);

  return (
    <div className="dish" role="listitem">
      <img className="dish__photo" src={dish.photo} alt={dish.name} />
      <h3 className="dish__title">{dish.name}</h3>
      <p className="dish__description">{dish.description}</p>

      <p className="dish__price">
        <span className="dish__price-value">{dish.price}</span>р
      </p>

      <div className="dish__controls">
        {inCart ? (
          <QuantityControl
            value={inCart.quantity}
            setValue={(quantity) => updateCart(dish.id, quantity)}
            removeFromCart={() => removeFromCart(dish.id)}
          />
        ) : (
          <Button className="dish__add" onClick={() => addToCart(dish.id)}>
            В корзину
          </Button>
        )}
      </div>
    </div>
  );
}
