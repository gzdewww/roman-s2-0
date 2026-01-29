package com.romans.app.service;

import java.util.List;

import com.romans.app.dto.request.CreateOrderRequestDto;
import com.romans.app.dto.response.OrderDto;
import com.romans.app.model.OrderStatus;

public interface OrderService {

    OrderDto create(CreateOrderRequestDto request, Long clientId);

    List<OrderDto> getMyOrders(Long clientId);

    OrderDto getById(Long orderId, Long clientId);

    List<OrderDto> getAllOrders(OrderStatus status);

    boolean isOrderBelongsToUser(Long orderId, Long userId);

    boolean isAssignedToCourier(Long orderId, Long courierId);

    OrderDto updateStatus(Long orderId, OrderStatus newStatus, Long updaterId);
}
