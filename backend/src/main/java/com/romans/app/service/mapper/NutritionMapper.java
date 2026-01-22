package com.romans.app.service.mapper;

import com.romans.app.dto.response.NutritionDto;
import com.romans.app.model.Nutrition;

public class NutritionMapper {

  public static NutritionDto toDto(Nutrition nutrition) {
    if (nutrition == null) {
      return null;
    }

    return NutritionDto.builder()
        .calories(nutrition.getCalories())
        .proteins(nutrition.getProteins())
        .fats(nutrition.getFats())
        .carbohydrates(nutrition.getCarbohydrates())
        .build();
  }

  public static Nutrition toEntity(NutritionDto dto) {
    if (dto == null) {
      return null;
    }

    return Nutrition.builder()
        .calories(dto.getCalories())
        .proteins(dto.getProteins())
        .fats(dto.getFats())
        .carbohydrates(dto.getCarbohydrates())
        .build();
  }

  public static void updateEntity(Nutrition nutrition, NutritionDto dto) {
    if (nutrition == null || dto == null) {
      return;
    }

    nutrition.setCalories(dto.getCalories());
    nutrition.setProteins(dto.getProteins());
    nutrition.setFats(dto.getFats());
    nutrition.setCarbohydrates(dto.getCarbohydrates());
  }
}
