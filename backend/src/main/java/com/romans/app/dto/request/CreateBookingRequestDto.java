package com.romans.app.dto.request;

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
public class CreateBookingRequestDto {
  private Long restaurantId;
  private LocalDateTime bookingTime;
  private Integer guestsCount;
  private String comment;
}
