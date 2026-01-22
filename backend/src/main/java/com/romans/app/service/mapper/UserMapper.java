package com.romans.app.service.mapper;

import com.romans.app.dto.response.UserDto;
import com.romans.app.model.User;

public class UserMapper {
  public static UserDto toDto(User user) {
    if (user == null) {
      return null;
    }
    return UserDto.builder()
      .id(user.getId())
      .name(user.getName())
      .email(user.getEmail())
      .phone(user.getPhone())
      .role(user.getRole())
      .addresses(user.getAddresses())
      .build();
  }
}
