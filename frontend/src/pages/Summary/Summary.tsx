import { useEffect, useState } from "react";
import { createOrder } from "../../api/ordersApi";
import CartCard from "../../components/CartCard/CartCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearCart } from "../../store/cart/cartSlice";
import { DeliveryType } from "../../types/enums";
import Button from "../../UI/Button/Button";
import Select, { type Option } from "../../UI/Select/Select";
import AddressModal from "../../components/AddressModal/AddressModal";

import "./Summary.scss";
import { fetchRestaurants } from "../../store/restaurants/restaurantsSlice";

export default function Summary() {
  const cart = useAppSelector((state) => state.cart.items);
  const restaurants = useAppSelector((state) => state.restaurants.items);
  const addresses = useAppSelector((state) => state.auth.user?.addresses);
  const dispatch = useAppDispatch();

  const [deliveryMethod, setDeliveryMethod] = useState<string>("delivery");
  const [address, setAddress] = useState<string>("michurina");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.dish.price * item.quantity;
  }, 0);

  const deliveryOptions: Option[] = [
    { label: "Самовывоз", value: "self" },
    { label: "Доставка", value: "delivery" },
  ];

  // Адреса ресторанов для самовывоза
  const restaurantAddresses: Option[] = restaurants.map((restaurant) => ({
    label: restaurant.address,
    value: restaurant.address,
  }));

  const userAddressesMap = addresses?.map((address) => ({
    label: address,
    value: address,
  }));

  // Адреса пользователя для доставки
  const userAddresses: Option[] = [
    ...userAddressesMap || [],
    {
      label: "Добавить новый адрес",
      value: "add",
      onClick: () => setIsAddressModalOpen(true),
    },
  ];

  // В зависимости от способа доставки выбираем список адресов
  const addressOptions =
    deliveryMethod === "self" ? restaurantAddresses : userAddresses;

  const paymentOptions: Option[] = [
    { label: "Наличными курьеру", value: "cash" },
    { label: "Картой курьеру", value: "card" },
  ];

  const handleDeliveryChange = (value: string, option: Option) => {
    setDeliveryMethod(value);
    // При переключении на самовывоз сбрасываем адрес на первый ресторан
    if (value === "self") {
      setAddress("tverskaya");
    }
    // При переключении на доставку сбрасываем на первый пользовательский адрес
    if (value === "delivery") {
      setAddress("kakhovska");
    }
  };

  const handleAddressChange = (value: string, option: Option) => {
    setAddress(value);
  };

  const handlePaymentChange = (value: string, option: Option) => {
    setPaymentMethod(value);
  };

  const handleOrderSubmit = async () => {
    if (cart.length === 0) return;

    try {
      let deliveryAddress = "";

      if (deliveryMethod === "self") {
        // Для самовывоза берем название ресторана
        const selectedRestaurant = restaurantAddresses.find(
          (addr) => addr.value === address,
        );
        deliveryAddress = selectedRestaurant?.label || "";
      } else {
        // Для доставки берем адрес пользователя
        const selectedUserAddress = userAddresses.find(
          (addr) => addr.value === address,
        );
        deliveryAddress = selectedUserAddress?.label || "";
      }

      await createOrder({
        deliveryType:
          deliveryMethod === "self"
            ? DeliveryType.PICKUP
            : DeliveryType.DELIVERY,
        deliveryAddress: deliveryAddress,
        items: cart.map((item) => ({
          dishId: item.dish.id,
          quantity: item.quantity,
        })),
      });

      dispatch(clearCart());
      alert("Заказ успешно оформлен!");
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      alert("Произошла ошибка при оформлении заказа. Попробуйте еще раз.");
    }
  };

  const handleAddressModalSuccess = (newAddress: string) => {
    // Здесь можно обновить список адресов пользователя
    console.log("Новый адрес добавлен:", newAddress);
    // TODO: добавить новый адрес в userAddresses
    setIsAddressModalOpen(false);
  };

  return (
    <>
      <div className="content__summary">
        <div className="summary__delivery">
          <h1>Способ доставки</h1>
          <Select
            options={deliveryOptions}
            value={deliveryMethod}
            onChange={handleDeliveryChange}
            ariaLabel="Выберите способ доставки"
          />

          <h1>
            {deliveryMethod === "self"
              ? "Ресторан для самовывоза"
              : "Адрес доставки"}
          </h1>
          <Select
            options={addressOptions}
            value={address}
            onChange={handleAddressChange}
            ariaLabel={
              deliveryMethod === "self"
                ? "Выберите ресторан для самовывоза"
                : "Выберите адрес доставки"
            }
          />
        </div>

        <div className="summary__pay">
          <h1>Итого</h1>
          <p className="summary__pay-total">
            <span className="summary__pay-value">{totalAmount}</span> р.
          </p>

          <h1>Способ оплаты</h1>
          <Select
            options={paymentOptions}
            value={paymentMethod}
            onChange={handlePaymentChange}
            ariaLabel="Выберите способ оплаты"
          />

          <Button
            className="summary__pay-button"
            type="button"
            disabled={cart.length === 0}
            onClick={handleOrderSubmit}
          >
            Оформить заказ
          </Button>
        </div>

        <div className="summary__dishes">
          {cart.length === 0 ? (
            <div className="summary__empty-cart">
              <p>Корзина пуста</p>
            </div>
          ) : (
            cart.map((item) => (
              <CartCard
                className="cart-card cart-card--summary"
                key={item.dish.id}
                dish={item.dish}
                quantity={item.quantity}
                type="summary"
              />
            ))
          )}
        </div>
      </div>

      {/* Модалка для добавления адреса */}
      {isAddressModalOpen && (
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSuccess={handleAddressModalSuccess}
        />
      )}
    </>
  );
}
