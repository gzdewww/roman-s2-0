// src/pages/PersonalCabinet/PersonalCabinet.tsx
import { useEffect, useState } from "react";
import { deleteBookingById } from "../../api/bookingsApi";
import BookingEditForm from "../../components/Booking/BookingEditForm";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { openAuthModal } from "../../store/auth/authSlice";
import {
  closeBookingModal,
  fetchMyBookings,
  openBookingModal,
} from "../../store/bookings/bookingsSlice";
import { fetchMyOrders } from "../../store/orders/ordersSlice";
import { fetchProfileThunk } from "../../store/users/usersSlice";
import { DeliveryType } from "../../types/enums";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import "./Profile.scss";

export default function Profile() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const ordersState = useAppSelector((state) => state.orders);
  const bookingState = useAppSelector((state) => state.bookings);
  const userState = useAppSelector((state) => state.users);

  // Обновляем тип вкладок: теперь есть profile
  const [activeTab, setActiveTab] = useState<"orders" | "bookings" | "profile">(
    "profile",
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeProfile = async () => {
      if (authState.token && !userState.user) {
        await dispatch(fetchProfileThunk());
      }
      dispatch(fetchMyOrders());
      dispatch(fetchMyBookings());
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initializeProfile();
    }
  }, [dispatch, authState.token, userState.user, isInitialized]);

  if (!isInitialized && authState.token) {
    return (
      <div className="personal-cabinet personal-cabinet--loading">
        <div className="personal-cabinet__empty">
          <h2>Загрузка профиля...</h2>
          <p>Пожалуйста, подождите</p>
        </div>
      </div>
    );
  }

  if (!userState.user && !authState.token) {
    return (
      <div className="personal-cabinet personal-cabinet--unauthorized">
        <div className="personal-cabinet__empty">
          <h2>Войдите в систему</h2>
          <p>Для доступа к личному кабинету необходимо авторизоваться</p>
          <Button onClick={() => dispatch(openAuthModal("login"))}>
            Войти
          </Button>
        </div>
      </div>
    );
  }

  const user = userState.user!;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderStatus = (status: string) => {
    const statusMap: Record<string, { text: string; class: string }> = {
      PENDING: { text: "В обработке", class: "status--pending" },
      CONFIRMED: { text: "Подтвержден", class: "status--confirmed" },
      IN_PROGRESS: { text: "Готовится", class: "status--progress" },
      DELIVERED: { text: "Доставлен", class: "status--delivered" },
      CANCELLED: { text: "Отменен", class: "status--cancelled" },
    };
    return statusMap[status] || { text: status, class: "" };
  };

  const getBookingStatus = (status: string) => {
    const statusMap: Record<string, { text: string; class: string }> = {
      PENDING: { text: "Ожидает подтверждения", class: "status--pending" },
      CONFIRMED: { text: "Подтверждено", class: "status--confirmed" },
      COMPLETED: { text: "Завершено", class: "status--completed" },
      CANCELLED: { text: "Отменено", class: "status--cancelled" },
    };
    return statusMap[status] || { text: status, class: "" };
  };

  return (
    <div className="personal-cabinet">
      <div className="personal-cabinet__header">
        <div className="personal-cabinet__user-info">
          <div className="personal-cabinet__avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="personal-cabinet__welcome">
              Добро пожаловать, {user.name}!
            </h1>
            <p className="personal-cabinet__email">{user.email}</p>
            {user.phone && (
              <p className="personal-cabinet__phone">Телефон: {user.phone}</p>
            )}
          </div>
        </div>

        <div className="personal-cabinet__stats">
          <div className="personal-cabinet__stat">
            <span className="personal-cabinet__stat-number">
              {ordersState.items.length}
            </span>
            <span className="personal-cabinet__stat-label">Заказов</span>
          </div>
          <div className="personal-cabinet__stat">
            <span className="personal-cabinet__stat-number">
              {bookingState.items.length}
            </span>
            <span className="personal-cabinet__stat-label">Бронирований</span>
          </div>
        </div>
      </div>

      {/* Обновлённые вкладки с добавлением "Профиль" */}
      <div className="personal-cabinet__tabs">
        <button
          className={`personal-cabinet__tab ${activeTab === "profile" ? "personal-cabinet__tab--active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Профиль
        </button>
        <button
          className={`personal-cabinet__tab ${activeTab === "orders" ? "personal-cabinet__tab--active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Мои заказы
          {ordersState.items.length > 0 && (
            <span className="personal-cabinet__tab-count">
              {ordersState.items.length}
            </span>
          )}
        </button>
        <button
          className={`personal-cabinet__tab ${activeTab === "bookings" ? "personal-cabinet__tab--active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Мои бронирования
          {bookingState.items.length > 0 && (
            <span className="personal-cabinet__tab-count">
              {bookingState.items.length}
            </span>
          )}
        </button>
      </div>

      <div className="personal-cabinet__content">
        {activeTab === "profile" && (
          <div className="personal-cabinet__profile">
            <div className="profile">
              <h2 className="profile__title">Личная информация</h2>
              <div className="profile__grid">
                <div className="profile__item">
                  <span className="profile__label">Имя</span>
                  <span className="profile__value">{user.name}</span>
                </div>
                <div className="profile__item">
                  <span className="profile__label">Email</span>
                  <span className="profile__value">{user.email}</span>
                </div>
                <div className="profile__item">
                  <span className="profile__label">Телефон</span>
                  <span className="profile__value">
                    {user.phone || "Не указан"}
                  </span>
                </div>
                <div className="profile__item">
                  <span className="profile__label">Дата регистрации</span>
                  <span className="profile__value">{user.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Пока без кнопки редактирования, но можно добавить */}
            <div className="profile__actions">
              <Button disabled>Редактировать профиль</Button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="personal-cabinet__orders">
            {ordersState.loading ? (
              <div className="personal-cabinet__loading">
                Загрузка заказов...
              </div>
            ) : ordersState.items.length === 0 ? (
              <div className="personal-cabinet__empty-section">
                <p>У вас пока нет заказов</p>
                <Button onClick={() => (window.location.href = "/")}>
                  Сделать первый заказ
                </Button>
              </div>
            ) : (
              <div className="orders-list">
                {ordersState.items.map((order) => {
                  const status = getOrderStatus(order.status);
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-card__header">
                        <div className="order-card__info">
                          <h3 className="order-card__number">
                            Заказ #{order.id}
                          </h3>
                          <span
                            className={`order-card__status ${status.class}`}
                          >
                            {status.text}
                          </span>
                        </div>
                        <div className="order-card__date">
                          {formatDate(order.createdAt)}
                        </div>
                      </div>

                      <div className="order-card__details">
                        <div className="order-card__items">
                          <p className="order-card__label">Состав заказа:</p>
                          <ul className="order-card__items-list">
                            {order.items?.map((item) => (
                              <li key={item.id} className="order-card__item">
                                <span className="order-card__item-name">
                                  {item.dish.name}
                                </span>
                                <span className="order-card__item-quantity">
                                  {item.quantity} шт.
                                </span>
                                <span className="order-card__item-price">
                                  {item.priceAtMoment * item.quantity} ₽
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="order-card__summary">
                          <div className="order-card__total">
                            <span className="order-card__total-label">
                              Итого:
                            </span>
                            <span className="order-card__total-amount">
                              {order.totalPrice} ₽
                            </span>
                          </div>
                          <div className="order-card__delivery">
                            <span className="order-card__delivery-label">
                              Доставка:
                            </span>
                            <span className="order-card__delivery-value">
                              {order.deliveryType === DeliveryType.DELIVERY
                                ? "Доставка"
                                : "Самовывоз"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="personal-cabinet__bookings">
            {bookingState.loading ? (
              <div className="personal-cabinet__loading">
                Загрузка бронирований...
              </div>
            ) : bookingState.items.length === 0 ? (
              <div className="personal-cabinet__empty-section">
                <p>У вас пока нет бронирований</p>
                <Button onClick={() => (window.location.href = "/restaurants")}>
                  Забронировать столик
                </Button>
              </div>
            ) : (
              <div className="bookings-list">
                {bookingState.items.map((booking) => {
                  const status = getBookingStatus(booking.comment || "Создано");
                  return (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-card__header">
                        <div className="booking-card__info">
                          <h3 className="booking-card__restaurant">
                            {booking.restaurant.name ||
                              `Ресторан #${booking.restaurant.id}`}
                          </h3>
                          <span
                            className={`booking-card__status ${status.class}`}
                          >
                            {status.text}
                          </span>
                        </div>
                        <div className="booking-card__date">
                          {formatDate(booking.bookingTime)}
                        </div>
                      </div>

                      <div className="booking-card__details">
                        <div className="booking-card__guests">
                          <span className="booking-card__label">Гостей:</span>
                          <span className="booking-card__value">
                            {booking.guestsCount} чел.
                          </span>
                        </div>

                        {booking.comment && (
                          <div className="booking-card__comment">
                            <span className="booking-card__label">
                              Комментарий:
                            </span>
                            <p className="booking-card__comment-text">
                              {booking.comment}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="booking-card__actions">
                        <Button
                          onClick={() => {
                            dispatch(openBookingModal(booking.id));
                          }}
                        >
                          Перенести
                        </Button>
                        <Button
                          onClick={async () => {
                            await deleteBookingById(booking.id);
                            dispatch(fetchMyBookings());
                          }}
                        >
                          Отменить
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {bookingState.isModalOpen && (
        <Modal onClose={() => dispatch(closeBookingModal())}>
          <BookingEditForm />
        </Modal>
      )}
    </div>
  );
}
