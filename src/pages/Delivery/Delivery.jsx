import { Link } from "react-router";
import Button from "../../UI/Button/Button";
import "./Delivery.scss";

export default function Delivery() {
  return (
    <div className="content__delivery">
      <h1 className="delivery__title">Доставка и оплата</h1>
      <p className="delivery__description">
        Мы осуществляем доставку в рамках зеленой зоны, помеченной на карте.
        <br />
        Минимальная сумма заказа для бесплатной доставки 1200 рублей. Стоимость
        доставки заказа ниже минимальной суммы 50 рублей.
        <br />У курьера всегда найдется сдача.{" "}
        <strong>Даже с 5000 рублей!</strong> Но не забудьте, конечно, об этом
        сказать оператору.
      </p>

      <iframe
        className="delivery__map"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4dab5556a69d37cc5851d03af16eed9786b1538f84235a788588ef6fed3f5801&amp;source=constructor"
      ></iframe>

      <Button className="delivery__button">
        <Link className="delivery__button-link" to="/">На главную</Link>
      </Button>
    </div>
  );
}
