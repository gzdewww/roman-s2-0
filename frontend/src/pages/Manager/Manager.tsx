// frontend/src/pages/Manager/Manager.tsx
import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import Select, { type Option } from "../../UI/Select/Select";
import Spinner from "../../UI/Spinner/Spinner";
import { formatAddress } from "../../helpers/addressFormatter";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addNotification } from "../../store/notification/notificationsSlice";
import { fetchAllOrders, fetchMyOrders } from "../../store/orders/ordersSlice";
import { OrderStatus } from "../../types/enums";
import "./Manager.scss";
import { fetchCouriers } from "../../store/couriers/couriersSlice";

export default function Manager() {
  const dispatch = useAppDispatch();

  const { items: orders, loading: ordersLoading } = useAppSelector((state) => state.orders);
  const { items: couriers, loading: couriersLoading } = useAppSelector((state) => state.couriers);
  const [assignedCourierId, setAssignedCourierId] = useState<Record<number, string>>({});

  const [retryAsUser, setRetryAsUser] = useState(false);

  // Фильтруем только подтверждённые заказы
  const pendingOrders = orders.filter((order) => order.status === OrderStatus.CONFIRMED);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await dispatch(fetchAllOrders()).unwrap();
      } catch {
        dispatch(addNotification({
          message: "Нет доступа к просмотру всех заказов",
          type: "error",
        }));

        if (!retryAsUser) {
          setRetryAsUser(true);
          try {
            await dispatch(fetchMyOrders()).unwrap();
            dispatch(addNotification({
              message: "Загружены только ваши заказы",
              type: "success",
            }));
          } catch {
            dispatch(addNotification({
              message: "Не удалось загрузить даже свои заказы",
              type: "error",
            }));
          }
        }
      }
    };

    loadOrders();
  }, [dispatch, retryAsUser]);

  useEffect(() => {
    dispatch(fetchCouriers());
  }, [dispatch]);

  const handleCourierChange = (orderId: number, option: Option<string>) => {
    setAssignedCourierId((prev) => ({
      ...prev,
      [orderId]: option.value ?? "",
    }));
  };

  const handleAssignCourier = async (orderId: number) => {
    const courierId = assignedCourierId[orderId];
    if (!courierId) return;

    try {
      // Здесь будет вызов API, например:
      // await dispatch(assignCourier({ orderId, courierId })).unwrap();

      dispatch(addNotification({
        message: `Курьер назначен на заказ #${orderId}`,
        type: "success",
      }));

      // Очистим выбор
      setAssignedCourierId((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });

      // Обновим список заказов
      dispatch(fetchAllOrders());

    } catch (error) {
      dispatch(addNotification({
        message: `Ошибка при назначении курьера на заказ #${orderId}`,
        type: "error",
      }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const courierOptions: Option<string>[] = couriers.map((courier) => ({
    value: String(courier.id),
    label: `${courier.name} ${courier.email}`.trim() || courier.email,
  }));

  return (
    <div className="manager-dashboard">
      <h1 className="manager-dashboard__title">Панель менеджера</h1>

      {(ordersLoading || couriersLoading) && !retryAsUser ? (
        <div className="manager-dashboard__loading">
          <Spinner size="medium" color="#007bff" />
          <p>Загрузка данных...</p>
        </div>
      ) : (
        <>
          {pendingOrders.length === 0 ? (
            <div className="manager-dashboard__empty">
              <h3>Нет заказов в статусе «Подтверждён»</h3>
              <p>Все заказы уже обработаны или назначены.</p>
            </div>
          ) : (
            <div className="manager-dashboard__orders-list">
              {pendingOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-card__header">
                    <h3>Заказ #{order.id}</h3>
                    <span className="order-card__date">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="order-card__content">
                    <div className="order-card__section">
                      <strong>Сумма:</strong> {order.totalPrice} ₽
                    </div>
                    <div className="order-card__section">
                      <strong>Тип:</strong>{" "}
                      {order.deliveryType === "DELIVERY" ? "Доставка" : "Самовывоз"}
                    </div>
                    <div className="order-card__section">
                      <strong>Адрес:</strong>{" "}
                      {formatAddress(order.deliveryAddress) || "—"}
                    </div>
                    <div className="order-card__section">
                      <strong>Телефон клиента:</strong> {order.client?.name || "—"}
                    </div>
                  </div>

                  <div className="order-card__assign">
                    <Select
                      options={courierOptions}
                      value={assignedCourierId[order.id] || ""}
                      onChange={(option) => handleCourierChange(order.id, option)}
                      placeholder="Выберите курьера"
                      className="manager-dashboard__select"
                      disabled={couriersLoading}
                    />
                    <Button
                      onClick={() => handleAssignCourier(order.id)}
                      disabled={!assignedCourierId[order.id] || couriersLoading}
                    >
                      Назначить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
