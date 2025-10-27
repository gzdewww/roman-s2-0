package com.romans.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDateTime createdAt = LocalDateTime.now();
  private LocalDateTime deliveredAt = LocalDateTime.now();

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User client;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User courier;

  @Enumerated(EnumType.STRING)
  private OrderStatus status = OrderStatus.CONFIRMED;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderItem> items = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  private DeliveryType deliveryType = DeliveryType.DELIVERY;

  private String deliveryAddress;
}
