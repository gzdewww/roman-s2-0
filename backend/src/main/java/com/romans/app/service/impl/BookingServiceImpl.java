package com.romans.app.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.romans.app.dto.request.CreateBookingRequestDto;
import com.romans.app.dto.response.BookingDto;
import com.romans.app.model.Booking;
import com.romans.app.model.Restaurant;
import com.romans.app.model.User;
import com.romans.app.repository.BookingRepository;
import com.romans.app.repository.RestaurantRepository;
import com.romans.app.repository.UserRepository;
import com.romans.app.service.BookingService;
import com.romans.app.service.mapper.BookingMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    @Override
    public BookingDto create(CreateBookingRequestDto request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRestaurant(restaurant);
        booking.setBookingTime(request.getBookingTime());
        booking.setGuestsCount(request.getGuestsCount());
        booking.setComment(request.getComment());

        return BookingMapper.toDto(bookingRepository.save(booking));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDto> getMyBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByBookingTimeDesc(userId)
                .stream()
                .map(
                        BookingMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public BookingDto updateBookingTime(Long bookingId, LocalDateTime newBookingTime, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + bookingId));
        if (!booking.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to update this booking");
        }
        booking.setBookingTime(newBookingTime);
        Booking updatedBooking = bookingRepository.save(booking);
        return BookingMapper.toDto(updatedBooking);
    }

    @Override
    @Transactional
    public void deleteById(Long bookingId, Long userId) {
        // 1. Проверяем существование брони
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + bookingId));
        if (!booking.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to delete this booking");
        };
        bookingRepository.delete(booking);
    }
}
