package com.romans.app.service;

import java.util.List;

import com.romans.app.dto.request.CreateOrderRequestDto;
import com.romans.app.dto.response.OrderDto;

public interface OrderService {
  OrderDto create(CreateOrderRequestDto request, Long clientId);

  List<OrderDto> getMyOrders(Long clientId);

  OrderDto getById(Long orderId, Long clientId);
}
