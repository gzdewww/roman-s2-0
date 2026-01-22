package com.romans.app.service;

import com.romans.app.dto.request.LoginRequestDto;
import com.romans.app.dto.request.RegisterRequestDto;
import com.romans.app.dto.response.AuthResponse;

public interface AuthService {
  AuthResponse login(LoginRequestDto request);

  AuthResponse register(RegisterRequestDto request);
}
