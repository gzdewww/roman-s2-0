package com.romans.app.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DishDto {
  private Long id;
  private String name;
  private String description;
  private List<String> ingredients;
  private Integer weight;
  private NutritionDto nutrition;
  private Integer price;
  private String imageUrl;
}
