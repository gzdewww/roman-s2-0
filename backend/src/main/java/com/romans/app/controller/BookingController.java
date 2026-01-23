package com.romans.app.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{id}")
    public BookingDto updateBookingTime(
            @PathVariable Long id,
            @RequestBody Map<String, String> request, // <-- Временное решение
            @AuthenticationPrincipal AuthPrincipal principal) {
        if (principal == null) {
            throw new AccessDeniedException("User must be authenticated to update a booking");
        }

        String bookingTimeStr = request.get("bookingTime");
        LocalDateTime bookingTime = LocalDateTime.parse(bookingTimeStr);

        Long userId = principal.userId();
        return bookingService.updateBookingTime(id, bookingTime, userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(
            @PathVariable Long id,
            @AuthenticationPrincipal AuthPrincipal principal) {

        if (principal == null) {
            throw new AccessDeniedException("User must be authenticated to delete a booking");
        }

        Long userId = principal.userId();
        bookingService.deleteById(id, userId);
    }
}
