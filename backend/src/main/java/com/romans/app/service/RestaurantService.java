package com.romans.app.service;

import java.util.List;

import com.romans.app.dto.response.RestaurantDto;

public interface RestaurantService {
  List<RestaurantDto> getAll();

  RestaurantDto getById(Long id);
}
