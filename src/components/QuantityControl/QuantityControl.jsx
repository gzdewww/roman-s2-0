import { BsDashLg, BsPlusLg } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import "./QuantityControl.scss";
import { useRef } from "react";

export default function QuantityControl({ value, setValue, removeFromCart }) {
  const inputRef = useRef(null);

  const handleDecrement = () => {
    if (value < 2) {
      removeFromCart();
      return;
    }
    setValue(Math.max(0, value - 1));
  };

  const handleIncrement = () => setValue(value + 1);

  const handleChange = (e) => {
    if (Number.isNaN(+e.target.value) || +e.target.value < 0) return;
    setValue(Math.min(99, +e.target.value));
  };

  const handleBlur = () => {
    if (Number(value) < 1) removeFromCart();
  };

  // TODO: без пустой строки, нельзя вводить несколько нулей
  //  при вводе после нуля ноль убирается

  const handleEnter = (e) => {
    if (e.key === "Enter") inputRef.current?.blur();
  };

  return (
    <div className="quantity">
      <Button aria-label="Уменьшить количество" className="quantity__control" onClick={handleDecrement}>
        <BsDashLg />
      </Button>

      <input
        aria-label="Количество"
        ref={inputRef}
        type="text"
        className="quantity__value"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
      />

      <Button aria-label="Увеличить количество" className="quantity__control" onClick={handleIncrement}>
        <BsPlusLg />
      </Button>
    </div>
  );
}
