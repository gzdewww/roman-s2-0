package com.romans.app.security.jwt;

import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  private final SecretKey key;
  private static final long EXPIRATION = 1000L * 60 * 60 * 24;

  public JwtService(
      @Value("${jwt.secret}") String secret) {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    this.key = Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateToken(Long userId, List<String> roles) {
    return Jwts.builder()
        .subject(userId.toString())
        .claim("roles", roles) // теперь roles — массив
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
        .signWith(key)
        .compact();
  }

  public Claims parseClaims(String token) {
    return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }
}
