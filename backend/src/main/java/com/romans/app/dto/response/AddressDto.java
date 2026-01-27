package com.romans.app.dto.response;

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
public class AddressDto {
  private Long id;
  private String street;
  private Integer building;
  private Integer apartment;
  private Integer floor;
  private Integer entrance;
  private String comment;
}
