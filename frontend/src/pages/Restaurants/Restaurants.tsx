import { useEffect } from "react";
import BookingForm from "../../components/Booking/BookingForm";
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
  const restaurants = useAppSelector((state) => state.restaurants);
  const dispatch = useAppDispatch();

  const getRestaurants = async () => {
    await dispatch(fetchRestaurants());
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <>
      <section className="content__restaurants">
        <h1 className="restaurants__title">Наши рестораны</h1>
        {restaurants.items.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            data-restaurant-id="${item.id}"
          >
            <div className="restaurant-card__img-wrapper">
              <img
                className="restaurant-card__img"
                src={`http://localhost:8080${restaurant.imageUrl}`}
                alt=""
              />
            </div>
            <div className="restaurant-card__content">
              <h2 className="restaurant-card__title">{restaurant.name}</h2>
              <p className="restaurant-card__address">{restaurant.address}</p>
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
      </section>

      {restaurants.isModalOpen && (
        <Modal onClose={() => dispatch(closeRestaurantModal())}>
          <BookingForm />
        </Modal>
      )}
    </>
  );
}
