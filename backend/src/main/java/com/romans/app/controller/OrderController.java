package com.romans.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.request.CreateOrderRequestDto;
import com.romans.app.dto.response.OrderDto;
import com.romans.app.model.OrderStatus;
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
  @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN', 'MANAGER', 'COURIER')")
  public OrderDto create(
      @RequestBody CreateOrderRequestDto request,
      @AuthenticationPrincipal AuthPrincipal principal) {
    return orderService.create(request, principal.userId());
  }

  @GetMapping("/my")
  @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN', 'MANAGER', 'COURIER')")
  public List<OrderDto> getMyOrders(@AuthenticationPrincipal AuthPrincipal principal) {
    return orderService.getMyOrders(principal.userId());
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')" +
      "hasRole('MANAGER') or " +
      "hasRole('COURIER') or " +
      "@orderService.isOrderBelongsToUser(#id, #userId)")
  public OrderDto getById(
      @PathVariable Long id,
      @RequestAttribute("userId") Long userId) {
    return orderService.getById(id, userId);
  }

  // GET /api/orders?status=CONFIRMED
  @GetMapping
  @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
  public List<OrderDto> getAllOrders(
      @RequestParam(required = false) OrderStatus status,
      @AuthenticationPrincipal AuthPrincipal principal) {

    // Менеджер видит только CONFIRMED
    if (principal.hasRole("MANAGER") && status != OrderStatus.CONFIRMED) {
      throw new AccessDeniedException("Managers can only view CONFIRMED orders");
    }

    return orderService.getAllOrders(status);
  }

  // Пример обновления статуса — только курьер или админ
  @PatchMapping("/{id}/status")
  @PreAuthorize("hasRole('COURIER') or hasRole('ADMIN')")
  public OrderDto updateStatus(
      @PathVariable Long id,
      @RequestParam OrderStatus status,
      @AuthenticationPrincipal AuthPrincipal principal) {

    // Курьер может обновлять только заказы, закреплённые за ним
    if (principal.hasRole("COURIER")) {
      if (!orderService.isAssignedToCourier(id, principal.userId())) {
        throw new AccessDeniedException("You can only update your assigned orders");
      }
    }

    return orderService.updateStatus(id, status, principal.userId());
  }
}
