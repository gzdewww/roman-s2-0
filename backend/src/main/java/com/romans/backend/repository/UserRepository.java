package com.romans.backend.repository;

import com.romans.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  
}