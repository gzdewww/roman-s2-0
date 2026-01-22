package com.romans.app.dto.response;

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
public class RestaurantDto {
  private Long id;
  private String name;
  private String address;
  private Integer seatsCount;
  private String imageUrl;
  private ManagerShortDto manager;
}
