// frontend/src/pages/Manager/ManagerDashboard.tsx
import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import Select from "../../UI/Select/Select";
import { getProfileById } from "../../api/userApi";
import { formatAddress } from "../../helpers/addressFormatter";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { fetchCouriers } from "../../store/couriers/couriersSlice";
import { fetchAllOrders } from "../../store/orders/ordersSlice";
import "./Manager.scss";
import type { User } from "../../types/user";
import { OrderStatus } from "../../types/enums";

export default function Manager() {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector((state) => state.orders);
  // const couriersState = useAppSelector((state) => state.);
  const [loadingOrders, setLoadingOrders] = useState<Set<number>>(new Set());
  const [assignedCourierId, setAssignedCourierId] = useState<Record<number, string>>({});

  // Фильтруем только заказы со статусом PENDING
  const pendingOrders = ordersState.items.filter(
    (order) => order.status === OrderStatus.CONFIRMED
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleAssignCourier = async (orderId: number) => {
    const courierId = assignedCourierId[orderId];
    if (!courierId) return;

    setLoadingOrders((prev) => new Set(prev).add(orderId));

    try {
      // await dispatch(
      //   updateOrder({
      //     id: orderId,
      //     data: {
      //       status: OrderStatus.CONFIRMED,
      //       courierId: parseInt(courierId),
      //     },
      //   })
      // ).unwrap();

      // Убираем из состояния назначения
      setAssignedCourierId((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
    } catch (error) {
      alert(`Ошибка при назначении курьера на заказ #${orderId}`);
    } finally {
      setLoadingOrders((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
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

  return (
    <div className="manager-dashboard">
      <h1 className="manager-dashboard__title">Панель менеджера</h1>

      {ordersState.loading ? (
        <p>Загрузка заказов...</p>
      ) : pendingOrders.length === 0 ? (
        <div className="manager-dashboard__empty">
          <h3>Нет заказов, ожидающих обработки</h3>
          <p>Все заказы уже обработаны или назначены.</p>
        </div>
      ) : (
        <div className="manager-dashboard__orders-list">
          {pendingOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card__header">
                <h3>Заказ #{order.id}</h3>
                <span className="order-card__date">{formatDate(order.createdAt)}</span>
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
                  <strong>Адрес:</strong> {formatAddress(order.deliveryAddress) || "—"}
                </div>
                <div className="order-card__section">
                  <strong>Телефон:</strong> {getProfileById(order.client.id).then((user) => user.phone)}
                </div>
              </div>

              <div className="order-card__assign">
                

                <Button
                  onClick={() => handleAssignCourier(order.id)}
                  disabled={!assignedCourierId[order.id] || loadingOrders.has(order.id)}
                >
                  Назначить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
