package com.romans.app.service.impl;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.romans.app.dto.request.LoginRequestDto;
import com.romans.app.dto.request.RegisterRequestDto;
import com.romans.app.dto.response.AuthResponse;
import com.romans.app.model.Role;
import com.romans.app.model.User;
import com.romans.app.repository.UserRepository;
import com.romans.app.security.jwt.JwtService;
import com.romans.app.service.AuthService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  @Override
  public AuthResponse login(LoginRequestDto request) {
    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED,
          "Invalid credentials");
    }

    return new AuthResponse(jwtService.generateToken(user.getId(), user.getRole().name()));
  }

  @Override
  public AuthResponse register(RegisterRequestDto request) {
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new IllegalArgumentException("Email already exists");
    }

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(Role.CUSTOMER);

    userRepository.save(user);
    return new AuthResponse(jwtService.generateToken(user.getId(), user.getRole().name()));
  }
}
