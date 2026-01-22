package com.romans.app.dto.request;

import java.util.List;

import com.romans.app.model.DeliveryType;

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
public class CreateOrderRequestDto {
  private DeliveryType deliveryType;
  private String deliveryAddress;
  private List<OrderItemRequestDto> items;
}