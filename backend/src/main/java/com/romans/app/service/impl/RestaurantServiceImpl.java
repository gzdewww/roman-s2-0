package com.romans.app.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.romans.app.dto.response.RestaurantDto;
import com.romans.app.model.Restaurant;
import com.romans.app.repository.RestaurantRepository;
import com.romans.app.service.RestaurantService;
import com.romans.app.service.mapper.RestaurantMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RestaurantServiceImpl implements RestaurantService {

  private final RestaurantRepository restaurantRepository;

  @Override
  public List<RestaurantDto> getAll() {
    return restaurantRepository.findAll()
        .stream()
        .map(RestaurantMapper::toDto)
        .toList();
  }

  @Override
  public RestaurantDto getById(Long id) {
    Restaurant restaurant = restaurantRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
    return RestaurantMapper.toDto(restaurant);
  }
}
