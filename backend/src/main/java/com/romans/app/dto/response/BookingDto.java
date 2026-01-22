package com.romans.app.dto.response;

import java.time.LocalDateTime;

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
public class BookingDto {
  private Long id;
  private RestaurantDto restaurant;
  private LocalDateTime bookingTime;
  private Integer guestsCount;
  private String comment;
}
