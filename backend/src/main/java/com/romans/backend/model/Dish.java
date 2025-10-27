package com.romans.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dishes")
public class Dish {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String description;
  private String ingredients;
  private Integer weight;
  private Integer nutrition_calories;
  private Integer nutrition_protein;
  private Integer nutrition_fat;
  private Integer nutrition_carbohydrates;
  private Integer price;
  private String imageUrl;

  @ManyToOne
  @JoinColumn(name = "restaurant_id")
  private Restaurant restaurant;
}
