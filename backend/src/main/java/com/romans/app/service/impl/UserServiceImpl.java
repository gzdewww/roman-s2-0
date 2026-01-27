package com.romans.app.service.impl;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.romans.app.dto.request.AddAddressRequestDto;
import com.romans.app.dto.response.UserDto;
import com.romans.app.model.Address;
import com.romans.app.model.User;
import com.romans.app.model.UserAddress;
import com.romans.app.repository.UserRepository;
import com.romans.app.service.UserService;
import com.romans.app.service.mapper.AddressMapper;
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
  public UserDto addAddress(Long userId, AddAddressRequestDto request) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Инициализируем список, если null
    if (user.getUserAddresses() == null) {
      user.setUserAddresses(new ArrayList<>());
    }

    // Проверяем дубли: сравниваем по смыслу, а не по объекту
    boolean alreadyExists = user.getUserAddresses().stream().anyMatch(addr -> {
      Address existing = addr.getAddress();
      return Objects.equals(existing.getStreet(), request.getStreet())
          && Objects.equals(existing.getBuilding(), request.getBuilding())
          && Objects.equals(existing.getApartment(), request.getApartment())
          && Objects.equals(existing.getFloor(), request.getFloor())
          && Objects.equals(existing.getEntrance(), request.getEntrance());
    });

    if (alreadyExists) {
      throw new IllegalArgumentException("Address already exists");
    }

    Address address = AddressMapper.toEntity(request);
    UserAddress userAddress = new UserAddress();
    userAddress.setAddress(address);
    userAddress.setUser(user);

    user.getUserAddresses().add(userAddress);

    User savedUser = userRepository.save(user); // CascadeType.ALL сохранит Address автоматически
    return UserMapper.toDto(savedUser);
  }
}
