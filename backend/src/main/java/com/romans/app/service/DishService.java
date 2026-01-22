package com.romans.app.service;

import java.util.List;

import com.romans.app.dto.response.DishDto;

public interface DishService {
  List<DishDto> getAll();

  DishDto getById(Long id);
}
