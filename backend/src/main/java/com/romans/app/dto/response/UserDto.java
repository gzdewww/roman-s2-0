package com.romans.app.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.romans.app.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
  private Long id;
  private String name;
  private String email;
  private String phone;
  private List<Role> roles;
  private LocalDateTime createdAt;
}
