package com.romans.app.service;

import com.romans.app.dto.response.UserDto;
import com.romans.app.model.User;

public interface UserService {
  UserDto getMe(Long userId);

  User findById(Long userId);
}
