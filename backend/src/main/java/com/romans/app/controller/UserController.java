package com.romans.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.request.AddAddressRequestDto;
import com.romans.app.dto.response.AddressDto;
import com.romans.app.dto.response.UserDto;
import com.romans.app.model.User;
import com.romans.app.security.AuthPrincipal;
import com.romans.app.service.UserService;
import com.romans.app.service.mapper.AddressMapper;
import com.romans.app.service.mapper.UserMapper;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/me")
  public ResponseEntity<UserDto> getCurrentUser(
      @AuthenticationPrincipal AuthPrincipal principal) {
    User user = userService.findById(principal.userId());
    return ResponseEntity.ok(UserMapper.toDto(user));
  }

  @PostMapping("/me/addresses")
  public UserDto addAddressForCurrentUser(
      @Valid @RequestBody AddAddressRequestDto request,
      @AuthenticationPrincipal AuthPrincipal principal) {
    if (principal == null) {
      throw new AccessDeniedException("User must be authenticated to create an order");
    }
    Long userId = principal.userId();
    return userService.addAddress(userId, request);
  }

  // backend/src/main/java/com/romans/app/controller/UserController.java

  @GetMapping("/me/addresses")
  public ResponseEntity<List<AddressDto>> getUserAddresses(
      @AuthenticationPrincipal AuthPrincipal principal) {
    if (principal == null) {
      throw new AccessDeniedException("User must be authenticated");
    }
    User user = userService.findById(principal.userId());
    List<AddressDto> addresses = user.getUserAddresses().stream()
        .map(item -> AddressMapper.toDto(item.getAddress()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(addresses);
  }

}
