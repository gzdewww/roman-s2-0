package com.romans.app.service.mapper;

import com.romans.app.dto.response.BookingDto;
import com.romans.app.model.Booking;

public class BookingMapper {
  public static BookingDto toDto(Booking booking) {
    if (booking == null) {
      return null;
    }
    return BookingDto.builder()
        .id(booking.getId())
        .restaurant(RestaurantMapper.toDto(booking.getRestaurant()))
        .bookingTime(booking.getBookingTime())
        .guestsCount(booking.getGuestsCount())
        .comment(booking.getComment())
        .build();
  }
}
