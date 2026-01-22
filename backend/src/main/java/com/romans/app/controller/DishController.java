package com.romans.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.response.DishDto;
import com.romans.app.service.DishService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dishes")
@RequiredArgsConstructor
public class DishController {

  private final DishService dishService;

  @GetMapping
  public List<DishDto> getAll() {
    return dishService.getAll();
  }

  @GetMapping("/{id}")
  public DishDto getById(@PathVariable Long id) {
    return dishService.getById(id);
  }
}
