// src/components/Booking/BookingForm.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Button from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import "./BookingForm.scss";
import { createBookingThunk } from "../../store/bookings/bookingsSlice";
import { closeRestaurantModal } from "../../store/restaurants/restaurantsSlice";
import Select from "../../UI/Select/Select";

export default function BookingForm() {
  const restaurantState = useAppSelector((state) => state.restaurants);
  const bookingState = useAppSelector((state) => state.bookings);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guestsCount, setGuestsCount] = useState(2);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!authState.token) {
      alert("Для бронирования необходимо войти в систему");
      return;
    }

    if (guestsCount < 1 || guestsCount > 20) {
      alert("Количество гостей должно быть от 1 до 20");
      return;
    }

    const bookingDateTime = `${date}T${time}:00`;
    const bookingDate = new Date(bookingDateTime);

    if (bookingDate < new Date()) {
      alert("Нельзя забронировать стол на прошедшее время");
      return;
    }

    try {
      await dispatch(
        createBookingThunk({
          restaurantId: restaurantState.selectedRestaurant?.id ?? 0,
          bookingTime: bookingDateTime,
          guestsCount,
          comment: comment || undefined,
        }),
      );

    } catch (error: any) {
      console.error("Ошибка бронирования:", error);
    }
  };

  // Устанавливаем завтрашнюю дату по умолчанию
  React.useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const getMinDate = () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form__header">
        <h3 className="booking-form__title">Бронирование столика</h3>
        <p className="booking-form__restaurant">
          Ресторан: <strong>{restaurantState.selectedRestaurant?.name}</strong>
        </p>
      </div>

      {!authState.token && (
        <div className="booking-form__warning">
          ⚠️ Для бронирования необходимо войти в систему
        </div>
      )}

      <div className="booking-form__fields">
        <div className="booking-form__field-group">
          <div className="booking-form__field">
            <label className="booking-form__label">Дата</label>
            <Input
              type="date"
              value={date}
              onChangeValue={setDate}
              min={getMinDate()}
              max={getMaxDate()}
              required
              disabled={bookingState.loading}
            />
          </div>

          <div className="booking-form__field">
            <label className="booking-form__label">Время</label>
            <Select
            options={[{value: "12:00", label: "12:00"},
            {value: "13:00", label: "13:00"},
            {value: "14:00", label: "14:00"},
            {value: "15:00", label: "15:00"},
            {value: "16:00", label: "16:00"},
            {value: "17:00", label: "17:00"},
            {value: "18:00", label: "18:00"},
            {value: "19:00", label: "19:00"},
            {value: "20:00", label: "20:00"},
            {value: "21:00", label: "21:00"},
            {value: "22:00", label: "22:00"},
            ]}
              value={time}
              onChangeValue={setTime}
              required
              disabled={bookingState.loading}
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
            </Select>
          </div>
        </div>

        <div className="booking-form__field">
          <label className="booking-form__label">Количество гостей</label>
          <Input
            type="number"
            value={guestsCount.toString()}
            onChangeValue={(value) => setGuestsCount(parseInt(value) || 1)}
            min="1"
            max="20"
            required
            disabled={bookingState.loading}
          />
        </div>

        <div className="booking-form__field">
          <label className="booking-form__label">
            Комментарий (необязательно)
          </label>
          <textarea
            className="booking-form__comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="День рождения, детское кресло, стол у окна..."
            rows={3}
            disabled={bookingState.loading}
          />
        </div>
      </div>

      <div className="booking-form__actions">
        <Button
          type="button"
          onClick={()=>dispatch(closeRestaurantModal())}
          disabled={bookingState.loading}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          disabled={bookingState.loading || !authState.token}
        >
          {bookingState.loading ? "Бронируем..." : "Забронировать"}
        </Button>
      </div>
    </form>
  );
}
