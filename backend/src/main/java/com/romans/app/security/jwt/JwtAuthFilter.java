package com.romans.app.security.jwt;

import java.io.IOException;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.romans.app.security.AuthPrincipal;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain) throws ServletException, IOException {

    String header = request.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = header.substring(7);
    try {
      Claims claims = jwtService.parseClaims(token);
      if (claims == null || claims.getSubject() == null) {
        filterChain.doFilter(request, response);
        return;
      }

      String userIdStr = claims.getSubject();
    String role = claims.get("role", String.class);
    
    List<SimpleGrantedAuthority> authorities = role == null
        ? List.of()
        : List.of(new SimpleGrantedAuthority("ROLE_" + role));
    
    // Создаем кастомный principal объект
    AuthPrincipal principal = new AuthPrincipal(Long.parseLong(userIdStr), role);
    
    UsernamePasswordAuthenticationToken auth = 
        new UsernamePasswordAuthenticationToken(principal, null, authorities);
    
    SecurityContextHolder.getContext().setAuthentication(auth);

    } catch (Exception e) {
      // не бросаем, просто логируем и пропускаем (request останется
      // неаутентифицированным)
      logger.debug("Invalid JWT token: " + e.getMessage());
    }

    filterChain.doFilter(request, response);
  }
}
