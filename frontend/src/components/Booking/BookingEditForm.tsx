// src/components/Booking/BookingEditForm.tsx
import React, { useState, useEffect } from "react";
import { editTimeById } from "../../api/bookingsApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  closeBookingModal,
  fetchMyBookings,
} from "../../store/bookings/bookingsSlice";
import Button from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import "./BookingForm.scss";

export default function BookingEditForm() {
  const bookingState = useAppSelector((state) => state.bookings);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ищем бронирование по ID из selectedBookingId
  const selectedBooking = bookingState.items.find(
    (booking) => booking.id === bookingState.selectedBookingId, // Используем selectedBookingId
  );

  useEffect(() => {
    if (selectedBooking) {
      // Устанавливаем текущую дату бронирования как начальное значение
      const bookingDate = new Date(selectedBooking.bookingTime);
      const formattedDate = bookingDate.toISOString().split("T")[0];
      const formattedTime = bookingDate.toTimeString().slice(0, 5);

      setDate(formattedDate);
      setTime(formattedTime);
    }
  }, [selectedBooking]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!authState.token) {
      setError("Для бронирования необходимо войти в систему");
      return;
    }

    if (!selectedBooking?.id) {
      setError("Не удалось определить бронирование");
      return;
    }

    // Форматируем дату в ISO строку (сервер ожидает такой формат)
    const bookingDateTime = `${date}T${time}:00`;
    const bookingDate = new Date(bookingDateTime);

    if (bookingDate < new Date()) {
      setError("Нельзя забронировать стол на прошедшее время");
      return;
    }

    try {
      setIsSubmitting(true);

      // Используем ID из selectedBooking
      await editTimeById(bookingDateTime,selectedBooking.id);

      // Обновляем список бронирований
      dispatch(fetchMyBookings());

      // Закрываем модальное окно
      dispatch(closeBookingModal());

      alert("Бронирование успешно перенесено!");
    } catch (error: any) {
      console.error("Ошибка переноса:", error);
      setError(
        error.response?.data?.message ||
          "Ошибка при переносе бронирования. Попробуйте позже.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  if (!selectedBooking) {
    return (
      <div className="booking-form">
        <div className="booking-form__header">
          <h3 className="booking-form__title">Бронирование не найдено</h3>
          <p>ID бронирования: {bookingState.selectedBookingId}</p>
        </div>
        <div className="booking-form__actions">
          <Button onClick={() => dispatch(closeBookingModal())}>Закрыть</Button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form__header">
        <h3 className="booking-form__title">Перенос бронирования</h3>
        <p className="booking-form__restaurant">
          Ресторан:{" "}
          <strong>
            {selectedBooking.restaurant?.name ||
              `Ресторан #${selectedBooking.restaurant?.id}`}
          </strong>
        </p>
        <p className="booking-form__info">
          Текущее время:{" "}
          {new Date(selectedBooking.bookingTime).toLocaleString("ru-RU")}
        </p>
      </div>

      {error && <div className="booking-form__error">{error}</div>}

      <div className="booking-form__fields">
        <div className="booking-form__field-group">
          <div className="booking-form__field">
            <label className="booking-form__label">Новая дата</label>
            <Input
              type="date"
              value={date}
              onChangeValue={setDate}
              min={getMinDate()}
              max={getMaxDate()}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="booking-form__field">
            <label className="booking-form__label">Новое время</label>
            <select
              className="booking-form__time-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option value="22:00">22:00</option>
            </select>
          </div>
        </div>

        <div className="booking-form__info-section">
          <p>
            <strong>Количество гостей:</strong> {selectedBooking.guestsCount}
          </p>
          {selectedBooking.comment && (
            <p>
              <strong>Комментарий:</strong> {selectedBooking.comment}
            </p>
          )}
        </div>
      </div>

      <div className="booking-form__actions">
        <Button
          type="button"
          onClick={() => dispatch(closeBookingModal())}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={isSubmitting || !authState.token}>
          {isSubmitting ? "Переносим..." : "Перенести бронирование"}
        </Button>
      </div>
    </form>
  );
}
