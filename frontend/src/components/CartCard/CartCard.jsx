import QuantityControl from "../QuantityControl/QuantityControl";
import "./CartCard.scss";

export default function CartCard({
  dish,
  quantity,
  removeFromCart,
  updateCart,
  ...props
}) {
  return (
    <div className="cart-card" role="listitem" key={dish.id} {...props}>
      <img className="cart-card__photo" src={dish.photo} alt={dish.name} />
      <div className="cart-card__info">
        <h2 className="cart-card__title">{dish.name}</h2>
        <p className="cart-card__description">{dish.description}</p>
        <QuantityControl
          value={quantity}
          setValue={updateCart}
          removeFromCart={removeFromCart}
        />
        <p className="cart-card__price">
          <span className="cart-card__price-value">{dish.price}</span>р
        </p>
      </div>
    </div>
  );
}
