package com.romans.app.service;

import java.time.LocalDateTime;
import java.util.List;

import com.romans.app.dto.request.CreateBookingRequestDto;
import com.romans.app.dto.response.BookingDto;

public interface BookingService {
  BookingDto create(CreateBookingRequestDto request, Long userId);

  List<BookingDto> getMyBookings(Long userId);

  public BookingDto updateBookingTime(Long bookingId, LocalDateTime newBookingTime, Long userId);
  
  void deleteById(Long bookingId, Long userId);
}
