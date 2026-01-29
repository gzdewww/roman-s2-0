package com.romans.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.romans.app.model.Order;
import com.romans.app.model.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByClientIdOrderByCreatedAtDesc(Long clientId);

    // Получить все заказы по статусу
    List<Order> findByStatus(OrderStatus status);

    // Проверить, закреплён ли заказ за курьером
    boolean existsByIdAndCourierId(Long orderId, Long courierId);

    // Найти заказ с курьером (для проверки принадлежности)
    Optional<Order> findByIdAndCourierId(Long orderId, Long courierId);

    // Для проверки принадлежности клиенту (альтернатива ручной проверке)
    boolean existsByIdAndClientId(Long orderId, Long clientId);
}
