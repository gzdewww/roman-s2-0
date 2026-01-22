package com.romans.app.service.mapper;

import java.util.stream.Collectors;

import com.romans.app.dto.response.OrderDto;
import com.romans.app.model.Order;

public class OrderMapper {
  public static OrderDto toDto(Order order) {
    if (order == null) {
      return null;
    }
    return OrderDto.builder()
      .id(order.getId())
      .createdAt(order.getCreatedAt())
      .deliveredAt(order.getDeliveredAt())
      .deliveryAddress(order.getDeliveryAddress())
      .totalPrice(order.getTotalPrice())
      .status(order.getStatus())
      .client(UserMapper.toDto(order.getClient()))
      .courier(UserMapper.toDto(order.getCourier()))
      .items(order.getItems().stream().map(OrderItemMapper::toDto).collect(Collectors.toList()))
      .build();
  }
}
