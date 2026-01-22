package com.romans.app.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.romans.app.dto.response.DishDto;
import com.romans.app.model.Dish;
import com.romans.app.repository.DishRepository;
import com.romans.app.service.DishService;
import com.romans.app.service.mapper.DishMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DishServiceImpl implements DishService {

  private final DishRepository dishRepository;

  @Override
  public List<DishDto> getAll() {
    return dishRepository.findAll()
        .stream()
        .map(DishMapper::toDto)
        .toList();
  }

  @Override
  public DishDto getById(Long id) {
    Dish dish = dishRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Dish not found"));
    return DishMapper.toDto(dish);
  }
}
