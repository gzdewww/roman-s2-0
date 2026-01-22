import { BsDashLg, BsPlusLg, BsTrash } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import "./QuantityControl.scss";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeItem, setQuantity } from "../../store/cart/cartSlice";

interface QuantityControlProps {
  dishId: number;
}
export default function QuantityControl({ dishId }: QuantityControlProps) {
  const cartItem = useAppSelector((state) => state.cart.items).find(
    (item) => item.dish.id === dishId,
  );
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDecrement = () => {
    if (!cartItem) return;
    if (cartItem?.quantity < 2) {
      dispatch(removeItem({ dishId }));
      return;
    }
    dispatch(setQuantity({ dishId, quantity: cartItem.quantity - 1 }));
  };

  const handleIncrement = () => {
    if (!cartItem) return;
    dispatch(setQuantity({ dishId, quantity: cartItem.quantity + 1 }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(+e.target.value) || +e.target.value < 0) return;

    dispatch(setQuantity({ dishId, quantity: Math.min(99, +e.target.value) }));
  };

  const handleBlur = () => {
    if (!cartItem || cartItem.quantity < 1) {
      dispatch(removeItem({ dishId }));
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") inputRef.current?.blur();
  };

  return (
    <div className="quantity">
      <Button
        aria-label="Уменьшить количество"
        className="quantity__control"
        onClick={handleDecrement}
      >
        {cartItem?.quantity && cartItem.quantity < 2 ? <BsTrash /> : <BsDashLg />}
      </Button>

      <input
        aria-label="Количество"
        ref={inputRef}
        type="text"
        className="quantity__value"
        value={cartItem?.quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
      />

      <Button
        aria-label="Увеличить количество"
        className="quantity__control"
        onClick={handleIncrement}
      >
        <BsPlusLg />
      </Button>
    </div>
  );
}
