package com.romans.app.service.impl;

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
}
