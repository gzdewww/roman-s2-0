package com.romans.app.service.mapper;

import com.romans.app.dto.response.OrderItemDto;
import com.romans.app.model.OrderItem;

public class OrderItemMapper {
  public static OrderItemDto toDto(OrderItem item) {
    if (item == null) {
      return null;
    }
    return OrderItemDto.builder()
      .id(item.getId())
      .priceAtMoment(item.getPriceAtMoment())
      .quantity(item.getQuantity())
      .dish(DishMapper.toDto(item.getDish()))
      .build();
  }
}
