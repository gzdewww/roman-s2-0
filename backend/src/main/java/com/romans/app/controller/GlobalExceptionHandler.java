package com.romans.app.controller;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.OptimisticLockException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

  record ApiError(int status, String error, String message, Instant timestamp, Map<String, String> fields) {
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> onValidation(MethodArgumentNotValidException ex) {
    Map<String, String> fields = new LinkedHashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(fe -> fields.put(fe.getField(), fe.getDefaultMessage()));
    ApiError error = new ApiError(400, "VALIDATION_ERROR", "Validation failed", Instant.now(), fields);
    return ResponseEntity.badRequest().body(error);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiError> onConstraint(ConstraintViolationException ex) {
    ApiError err = new ApiError(400, "VALIDATION_ERROR", ex.getMessage(), Instant.now(), Map.of());
    return ResponseEntity.badRequest().body(err);
  }

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<ApiError> onNotFound(EntityNotFoundException ex) {
    ApiError err = new ApiError(404, "NOT_FOUND", ex.getMessage(), Instant.now(), Map.of());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiError> onBadRequest(IllegalArgumentException ex) {
    ApiError err = new ApiError(400, "BAD_REQUEST", ex.getMessage(), Instant.now(), Map.of());
    return ResponseEntity.badRequest().body(err);
  }

  @ExceptionHandler({ OptimisticLockException.class })
  public ResponseEntity<ApiError> onConflict(RuntimeException ex) {
    ApiError err = new ApiError(409, "CONFLICT", "Entity modified concurrently", Instant.now(), Map.of());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> onOther(Exception ex) {
    ApiError err = new ApiError(500, "INTERNAL", "Unexpected error", Instant.now(), Map.of());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
  }
}
