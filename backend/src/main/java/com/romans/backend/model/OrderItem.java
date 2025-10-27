package com.romans.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "dish_id")
  private Dish dish;

  @ManyToOne
  @JoinColumn(name = "order_id")
  private Order order;

  private int quantity;
  private Integer totalPrice;
}
