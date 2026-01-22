package com.romans.app.service.mapper;

import com.romans.app.dto.response.RestaurantDto;
import com.romans.app.model.Restaurant;

public class RestaurantMapper {
  public static RestaurantDto toDto(Restaurant restaurant) {
    if (restaurant == null) {
      return null;
    }
    return RestaurantDto.builder()
        .id(restaurant.getId())
        .name(restaurant.getName())
        .address(restaurant.getAddress())
        .seatsCount(restaurant.getSeatsCount())
        .imageUrl(restaurant.getImageUrl())
        .manager(ManagerMapper.toDto(restaurant.getManager()))
        .build();
  }
}
