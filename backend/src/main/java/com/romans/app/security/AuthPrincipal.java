package com.romans.app.security;

import java.util.List;

public record AuthPrincipal(Long userId, List<String> roles) {

    public boolean hasRole(String role) {
        return roles != null && roles.contains(role);
    }

    // Вспомогательные методы (по желанию)
    public boolean isManager() {
        return hasRole("MANAGER");
    }

    public boolean isCourier() {
        return hasRole("COURIER");
    }

    public boolean isAdmin() {
        return hasRole("ADMIN");
    }
}
