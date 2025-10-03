import { BsDashLg, BsPlusLg, BsTrash } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import "./QuantityControl.scss";

export default function QuantityControl({ value, setValue, removeFromCart }) {
  return (
    <div className="quantity">
      <Button
        className="quantity-control"
        onClick={value < 2? removeFromCart : () => setValue(value > 0 ? value - 1 : 0)}
      >
        <BsDashLg />
      </Button>

      <input
        type="number"
        className="quantity-value"
        value={value}
        onChange={setValue}
        min="0"
      />
      <Button className="quantity-control" onClick={() => setValue(value + 1)}>
        <BsPlusLg />
      </Button>
    </div>
  );
}
