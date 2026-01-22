package com.romans.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.request.CreateOrderRequestDto;
import com.romans.app.dto.response.OrderDto;
import com.romans.app.security.AuthPrincipal;
import com.romans.app.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

  private final OrderService orderService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public OrderDto create(
      @RequestBody CreateOrderRequestDto request,
      @AuthenticationPrincipal AuthPrincipal principal) {
    if (principal == null) {
      throw new AccessDeniedException("User must be authenticated to create an order");
    }
    Long userId = principal.userId();
    System.out.println("Creating order for user " + userId);
    return orderService.create(request, userId);
  }

  @GetMapping("/my")
  public List<OrderDto> getMyOrders(
      @AuthenticationPrincipal AuthPrincipal principal) {
    if (principal == null) {
      throw new AccessDeniedException("User must be authenticated to create an order");
    }
    Long userId = principal.userId();
    return orderService.getMyOrders(userId);
  }

  @GetMapping("/{id}")
  public OrderDto getById(
      @PathVariable Long id,
      @RequestAttribute("userId") Long userId) {
    return orderService.getById(id, userId);
  }
}
