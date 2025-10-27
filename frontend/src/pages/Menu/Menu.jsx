import DishCard from "../../components/DishCard/DishCard";
import "./Menu.scss";

export default function Menu({
  menu,
  cart,
  addToCart,
  removeFromCart,
  updateCart,
}) {
  return (
    <div className="content__menu" role="list">
      {menu.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateCart={updateCart}
        />
      ))}
    </div>
  );
}
