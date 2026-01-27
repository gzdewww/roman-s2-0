package com.romans.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.romans.app.model.Role;
import com.romans.app.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  @Query("SELECT u FROM User u JOIN u.roles r WHERE u.id = :id")
  User findByIdWithRoles(Long id);

  @Modifying
  @Query("UPDATE User u SET u.roles = :roles WHERE u.id = :id")
  void updateRoles(Long id, List<Role> roles);

  @Modifying
  @Query("DELETE FROM User u WHERE u.id = :id")
  void deleteRoles(Long id);

}
