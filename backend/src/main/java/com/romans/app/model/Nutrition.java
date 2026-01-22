package com.romans.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nutrition {

  @Column(name = "calories", nullable = false)
  private Integer calories;

  @Column(name = "proteins", nullable = false)
  private Integer proteins;

  @Column(name = "fats", nullable = false)
  private Integer fats;

  @Column(name = "carbohydrates", nullable = false)
  private Integer carbohydrates;
}
