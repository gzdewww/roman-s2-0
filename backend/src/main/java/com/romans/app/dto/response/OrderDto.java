package com.romans.app.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.romans.app.model.DeliveryType;
import com.romans.app.model.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
  private Long id;
  private LocalDateTime createdAt;
  private LocalDateTime deliveredAt;
  private AddressDto deliveryAddress;
  private DeliveryType deliveryType;
  private Integer totalPrice;
  private OrderStatus status;
  private UserDto client;
  private UserDto courier;
  private List<OrderItemDto> items;
}
