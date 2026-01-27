import { useEffect } from "react";
import BookingForm from "../../components/Booking/BookingForm";
import { formatAddressShort } from "../../helpers/addressFormatter";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  closeRestaurantModal,
  fetchRestaurants,
  openRestaurantModal,
  selectRestaurant,
} from "../../store/restaurants/restaurantsSlice";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import "./Restaurants.scss";

export default function Restaurants() {
  const { items: restaurants, isModalOpen } = useAppSelector(
    (state) => state.restaurants,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <section className="content__restaurants">
      <h1 className="restaurants__title">Наши рестораны</h1>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="restaurant-card"
          data-restaurant-id={restaurant.id}
        >
          <div className="restaurant-card__img-wrapper">
            <img
              className="restaurant-card__img"
              src={`http://localhost:8080${restaurant.imageUrl}`}
              alt={restaurant.name}
            />
          </div>
          <div className="restaurant-card__content">
            <h2 className="restaurant-card__title">{restaurant.name}</h2>
            <p className="restaurant-card__address">
              {formatAddressShort(restaurant.address)}
            </p>
            <p className="restaurant-card__seats">
              Количество мест: {restaurant.seatsCount}
            </p>
            <Button
              className="restaurant-card__button"
              onClick={() => {
                dispatch(selectRestaurant(restaurant));
                dispatch(openRestaurantModal());
              }}
            >
              Забронировать столик
            </Button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <Modal onClose={() => dispatch(closeRestaurantModal())}>
          <BookingForm />
        </Modal>
      )}
    </section>
  );
}
