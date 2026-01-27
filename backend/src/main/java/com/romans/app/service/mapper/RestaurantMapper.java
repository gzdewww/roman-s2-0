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
        .address(AddressMapper.toDto(restaurant.getAddress()))
        .seatsCount(restaurant.getSeatsCount())
        .imageUrl(restaurant.getImageUrl())
        .manager(UserMapper.toDto(restaurant.getManager()))
        .build();
  }

  public static Restaurant toEntity(RestaurantDto restaurantDto) {
    if (restaurantDto == null) {
      return null;
    }
    Restaurant restaurant = new Restaurant();
    restaurant.setId(restaurantDto.getId());
    restaurant.setName(restaurantDto.getName());
    restaurant.setAddress(AddressMapper.toEntity(restaurantDto.getAddress()));
    restaurant.setSeatsCount(restaurantDto.getSeatsCount());
    restaurant.setImageUrl(restaurantDto.getImageUrl());
    restaurant.setManager(UserMapper.toEntity(restaurantDto.getManager()));
    return restaurant;
  }
}
