package com.romans.app.service.mapper;

import com.romans.app.dto.response.ManagerShortDto;
import com.romans.app.model.User;

/**
 * Mapper for Manager entity
 */
public class ManagerMapper {
  public static ManagerShortDto toDto(User manager) {
    if (manager == null) {
      return null;
    }
    return ManagerShortDto.builder()
        .id(manager.getId())
        .name(manager.getName())
        .build();
  }
}
