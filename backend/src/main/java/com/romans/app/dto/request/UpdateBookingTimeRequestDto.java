package com.romans.app.dto.request;

import java.time.LocalDateTime;

public class UpdateBookingTimeRequestDto {
    private LocalDateTime bookingTime;
    
    public UpdateBookingTimeRequestDto() {
    }
    public UpdateBookingTimeRequestDto(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }
    public LocalDateTime getBookingTime() {
        return bookingTime;
    }    
    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }
}