package com.romans.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.romans.app.dto.request.CreateOrderRequestDto;
import com.romans.app.dto.request.OrderItemRequestDto;
import com.romans.app.dto.response.OrderDto;
import com.romans.app.model.Dish;
import com.romans.app.model.Order;
import com.romans.app.model.OrderItem;
import com.romans.app.model.OrderStatus;
import com.romans.app.model.User;
import com.romans.app.repository.DishRepository;
import com.romans.app.repository.OrderRepository;
import com.romans.app.repository.UserRepository;
import com.romans.app.service.OrderService;
import com.romans.app.service.mapper.AddressMapper;
import com.romans.app.service.mapper.OrderMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final DishRepository dishRepository;
    private final UserRepository userRepository;

    @Override
    public OrderDto create(CreateOrderRequestDto request, Long clientId) {
        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Order order = new Order();
        order.setClient(client);
        order.setDeliveryType(request.getDeliveryType());
        order.setDeliveryAddress(AddressMapper.toEntity(request.getDeliveryAddress()));
        order.setStatus(OrderStatus.CONFIRMED);

        List<OrderItem> items = new ArrayList<>();
        int totalPrice = 0;

        for (OrderItemRequestDto itemReq : request.getItems()) {
            Dish dish = dishRepository.findById(itemReq.getDishId())
                    .orElseThrow(() -> new EntityNotFoundException("Dish not found"));

            OrderItem item = new OrderItem();
            item.setDish(dish);
            item.setQuantity(itemReq.getQuantity());
            item.setPriceAtMoment(dish.getPrice());
            item.setOrder(order);

            totalPrice += dish.getPrice() * itemReq.getQuantity();
            items.add(item);
        }

        order.setItems(items);
        order.setTotalPrice(totalPrice);

        Order saved = orderRepository.save(order);
        return OrderMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> getMyOrders(Long clientId) {
        return orderRepository.findByClientIdOrderByCreatedAtDesc(clientId)
                .stream()
                .map(OrderMapper::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto getById(Long orderId, Long clientId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        if (!order.getClient().getId().equals(clientId)) {
            throw new AccessDeniedException("Access denied");
        }

        return OrderMapper.toDto(order);
    }

    // --- Новые методы ---

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> getAllOrders(OrderStatus status) {
        List<Order> orders = (status == null)
                ? orderRepository.findAll()
                : orderRepository.findByStatus(status);
        return orders.stream()
                .map(OrderMapper::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isOrderBelongsToUser(Long orderId, Long userId) {
        return orderRepository.existsByIdAndClientId(orderId, userId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isAssignedToCourier(Long orderId, Long courierId) {
        return orderRepository.existsByIdAndCourierId(orderId, courierId);
    }

    @Override
    @Transactional
    public OrderDto updateStatus(Long orderId, OrderStatus newStatus, Long updaterId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Логика смены статуса (можно расширить)
        // Например: только от CONFIRMED -> ASSIGNED, потом -> DELIVERING и т.д.
        order.setStatus(newStatus);

        // Если курьер берёт заказ — назначаем его
        if (newStatus == OrderStatus.IN_PROGRESS && order.getCourier() == null) {
            User courier = userRepository.findById(updaterId)
                    .orElseThrow(() -> new EntityNotFoundException("Courier not found"));
            order.setCourier(courier);
            order.setStatus(OrderStatus.IN_PROGRESS);
        }

        Order saved = orderRepository.save(order);
        return OrderMapper.toDto(saved);
    }
}
