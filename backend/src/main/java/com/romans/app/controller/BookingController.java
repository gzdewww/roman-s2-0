package com.romans.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.request.CreateBookingRequestDto;
import com.romans.app.dto.response.BookingDto;
import com.romans.app.security.AuthPrincipal;
import com.romans.app.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

  private final BookingService bookingService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public BookingDto create(
      @RequestBody CreateBookingRequestDto request,
      @AuthenticationPrincipal AuthPrincipal principal) {
    if (principal == null) {
      throw new AccessDeniedException("User must be authenticated to create an order");
    }
    Long userId = principal.userId();
    System.out.println("Creating booking for user " + userId);
    return bookingService.create(request, userId);
  }

  @GetMapping("/my")
  public List<BookingDto> getMyBookings(
      @AuthenticationPrincipal AuthPrincipal principal) {
    if (principal == null) {
      throw new AccessDeniedException("User must be authenticated to create an order");
    }
    Long userId = principal.userId();
    return bookingService.getMyBookings(userId);
  }
}
