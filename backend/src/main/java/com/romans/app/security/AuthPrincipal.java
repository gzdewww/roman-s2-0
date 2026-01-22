package com.romans.app.security;

public record AuthPrincipal(Long userId, String role) {
  // Не нужно геттеры/сеттеры - record создает их автоматически
}