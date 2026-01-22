package com.romans.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.romans.app.model.Dish;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
}
