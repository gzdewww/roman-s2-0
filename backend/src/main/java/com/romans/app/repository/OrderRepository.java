package com.romans.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.romans.app.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findByClientIdOrderByCreatedAtDesc(Long clientId);

}
