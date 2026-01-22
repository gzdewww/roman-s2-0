package com.romans.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.response.RestaurantDto;
import com.romans.app.service.RestaurantService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

  private final RestaurantService restaurantService;

  @GetMapping
  public List<RestaurantDto> getAll() {
    return restaurantService.getAll();
  }

  @GetMapping("/{id}")
  public RestaurantDto getById(@PathVariable Long id) {
    return restaurantService.getById(id);
  }
}
