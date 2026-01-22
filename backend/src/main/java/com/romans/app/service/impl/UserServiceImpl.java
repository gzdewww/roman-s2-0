package com.romans.app.service.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.romans.app.dto.response.UserDto;
import com.romans.app.model.User;
import com.romans.app.repository.UserRepository;
import com.romans.app.service.UserService;
import com.romans.app.service.mapper.UserMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public UserDto getMe(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new EntityNotFoundException("User not found"));
    return UserMapper.toDto(user);
  }

  @Override
  public User findById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
  }

  @Transactional
  public UserDto addAddress(Long userId, String address) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    if (user.getAddresses() == null) {
      user.setAddresses(new ArrayList<>());
    }

    // Можно добавить фильтр дубликатов, если нужно:
    if (!user.getAddresses().contains(address)) {
      user.getAddresses().add(address);
    }

    User saved = userRepository.save(user);
    return UserMapper.toDto(saved);
  }
}
