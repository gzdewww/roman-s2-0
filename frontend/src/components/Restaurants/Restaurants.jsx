import Button from "../../UI/Button/Button";
import "./Restaurants.scss";

export default function Restaurants() {
  const rests = [
    { name: "Roman's на Мичурина", address: "ул. Мичурина д. 148" },
    { name: "Roman's на Калужской", address: "ул. Калужская д. 11" },
  ];

  return (
    <section className="content__restaurants">
      {rests.map((item) => (
        <div className="restaurant-card" data-restaurant-id="${item.id}">
          <div className="restaurant-card__img-wrapper">
            <img
              className="restaurant-card__img"
              src="https://pgdv.ru/images/blog/restorany-michelin-moskva/michelin-moskva-7-min.jpg"
              alt=""
            />
          </div>
          <div className="restaurant-card__content">
            <h1 className="restaurant-card__title">{item.name}</h1>
            <p className="restaurant-card__address">{item.address}</p>
            <Button className="restaurant-card__button">
              Забронировать столик
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
}
