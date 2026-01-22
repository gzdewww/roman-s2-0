package com.romans.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.romans.app.dto.request.LoginRequestDto;
import com.romans.app.dto.request.RegisterRequestDto;
import com.romans.app.dto.response.AuthResponse;
import com.romans.app.service.impl.AuthServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthServiceImpl authService;

  @PostMapping("/login")
  public AuthResponse login(@RequestBody LoginRequestDto request) {
    return authService.login(request);
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse register(@RequestBody RegisterRequestDto request) {
    return authService.register(request);
  }
}
