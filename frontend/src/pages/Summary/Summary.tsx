import { useEffect, useState } from "react";
import { createOrder } from "../../api/ordersApi";
import AddressModal from "../../components/AddressModal/AddressModal";
import CartCard from "../../components/CartCard/CartCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearCart } from "../../store/cart/cartSlice";
import { DeliveryType, PaymentMethod } from "../../types/enums";
import Button from "../../UI/Button/Button";
import Select, { type Option } from "../../UI/Select/Select";

import { formatAddressShort } from "../../helpers/addressFormatter";
import { fetchRestaurants } from "../../store/restaurants/restaurantsSlice";
import { fetchProfileThunk } from "../../store/users/usersSlice";
import type { Address } from "../../types/address";
import Spinner from "../../UI/Spinner/Spinner";
import "./Summary.scss";

export default function Summary() {
  const cart = useAppSelector((state) => state.cart.items);
  const restaurants = useAppSelector((state) => state.restaurants.items);
  const addresses = useAppSelector((state) => state.users.user?.addresses);
  const isRestaurantsLoading = useAppSelector((state) => state.restaurants.loading);
  const isUserLoading = useAppSelector((state) => state.users.loading);
  const dispatch = useAppDispatch();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryType>(DeliveryType.PICKUP);
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CARD);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  // Определяем, загружены ли необходимые данные
  const isLoading = isRestaurantsLoading || isUserLoading || restaurants.length === 0;

  useEffect(() => {
    if (!isLoading && restaurants.length > 0) {
      // Устанавливаем адрес по умолчанию после загрузки
      if (deliveryMethod === DeliveryType.PICKUP && !address) {
        setAddress(restaurants[0]?.address || null);
      } else if (deliveryMethod === DeliveryType.DELIVERY && addresses && addresses.length > 0 && !address) {
        setAddress(addresses[0]|| null);
      }
    }
  }, [isLoading, deliveryMethod, restaurants, addresses, address]);

  const totalAmount = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  const deliveryOptions: Option<DeliveryType>[] = [
    { label: "Самовывоз", value: DeliveryType.PICKUP },
    { label: "Доставка", value: DeliveryType.DELIVERY },
  ];

  const restaurantAddresses: Option<Address>[] = restaurants.map((restaurant) => ({
    label: formatAddressShort(restaurant.address),
    value: restaurant.address,
  }));

  const userAddressesOptions: Option<Address>[] =
    addresses?.map((addr) => ({
      label: formatAddressShort(addr),
      value: addr,
    })) || [];

  const userAddresses: Option<Address>[] = [
    ...userAddressesOptions,
    {
      label: "Добавить новый адрес",
      value: null,
      onClick: () => setIsAddressModalOpen(true),
    },
  ];

  const addressOptions =
    deliveryMethod === DeliveryType.PICKUP ? restaurantAddresses : userAddresses;

  const paymentOptions: Option<PaymentMethod>[] = [
    { label: "Наличными курьеру", value: PaymentMethod.CASH },
    { label: "Картой курьеру", value: PaymentMethod.CARD },
  ];

  const handleDeliveryChange = (option: Option<DeliveryType>) => {
    if (!option.value) return;
    setDeliveryMethod(option.value);

    if (option.value === DeliveryType.PICKUP && restaurants[0]?.address) {
      setAddress(restaurants[0].address);
    } else if (option.value === DeliveryType.DELIVERY && addresses?.[0]) {
      setAddress(addresses[0]);
    }
  };

  const handleAddressChange = (option: Option<Address>) => {
    if (!option.value) return;
    setAddress(option.value);
  };

  const handlePaymentChange = (option: Option<PaymentMethod>) => {
    if (!option.value) return;
    setPaymentMethod(option.value);
  };

  const handleOrderSubmit = async () => {
    if (cart.length === 0 || !address) return;

    try {
      await createOrder({
        deliveryType: deliveryMethod,
        deliveryAddress: address,
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

  if (isLoading) {
    return <Spinner />;
  }

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
            {deliveryMethod === DeliveryType.PICKUP
              ? "Ресторан для самовывоза"
              : "Адрес доставки"}
          </h1>
          <Select
            options={addressOptions}
            value={address}
            onChange={handleAddressChange}
            ariaLabel={
              deliveryMethod === DeliveryType.PICKUP
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
        />
      )}
    </>
  );
}
