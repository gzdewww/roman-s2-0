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
        .roles(user.getRoles())
        .build();
  }

  public static User toEntity(UserDto userDto) {
    if (userDto == null) {
      return null;
    }
    User user = new User();
    user.setId(userDto.getId());
    user.setName(userDto.getName());
    user.setEmail(userDto.getEmail());
    user.setPhone(userDto.getPhone());
    user.setRoles(userDto.getRoles());
    return user;
  }
}


