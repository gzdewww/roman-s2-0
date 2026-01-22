package com.romans.app.service.mapper;

import java.util.ArrayList;

import com.romans.app.dto.response.DishDto;
import com.romans.app.model.Dish;


public class DishMapper {

  public static DishDto toDto(Dish dish) {
    if (dish == null) {
      return null;
    }

    DishDto.DishDtoBuilder builder = DishDto.builder()
        .id(dish.getId())
        .name(dish.getName())
        .description(dish.getDescription())
        .price(dish.getPrice());

    // Маппинг остальных полей
    if (dish.getIngredients() != null) {
      builder.ingredients(new ArrayList<>(dish.getIngredients()));
    }

    builder.weight(dish.getWeight());
    builder.imageUrl(dish.getImageUrl());

    // Маппинг вложенного объекта Nutrition
    if (dish.getNutrition() != null) {
      builder.nutrition(NutritionMapper.toDto(dish.getNutrition()));
    }

    return builder.build();
  }

  public static Dish toEntity(DishDto dishDto) {
    if (dishDto == null) {
      return null;
    }

    Dish.DishBuilder builder = Dish.builder()
        .id(dishDto.getId())
        .name(dishDto.getName())
        .description(dishDto.getDescription())
        .price(dishDto.getPrice())
        .weight(dishDto.getWeight())
        .imageUrl(dishDto.getImageUrl());

    // Маппинг ingredients
    if (dishDto.getIngredients() != null) {
      builder.ingredients(new ArrayList<>(dishDto.getIngredients()));
    }

    // Маппинг Nutrition
    if (dishDto.getNutrition() != null) {
      builder.nutrition(NutritionMapper.toEntity(dishDto.getNutrition()));
    }

    return builder.build();
  }

  // Дополнительный метод для обновления существующей сущности
  public static void updateEntity(Dish dish, DishDto dishDto) {
    if (dish == null || dishDto == null) {
      return;
    }

    dish.setName(dishDto.getName());
    dish.setDescription(dishDto.getDescription());
    dish.setPrice(dishDto.getPrice());
    dish.setWeight(dishDto.getWeight());
    dish.setImageUrl(dishDto.getImageUrl());

    if (dishDto.getIngredients() != null) {
      dish.setIngredients(new ArrayList<>(dishDto.getIngredients()));
    }

    if (dishDto.getNutrition() != null) {
      if (dish.getNutrition() == null) {
        dish.setNutrition(NutritionMapper.toEntity(dishDto.getNutrition()));
      } else {
        NutritionMapper.updateEntity(dish.getNutrition(), dishDto.getNutrition());
      }
    }
  }
}
