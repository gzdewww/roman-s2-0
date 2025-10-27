package com.romans.backend.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "restaurants")
public class Restaurant {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String address;
  private Integer seats_count;
  private String imageUrl;

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
  private List<Dish> dishes = new ArrayList<>();

  @OneToOne(mappedBy = "restaurant", cascade = CascadeType.ALL)
  private User manager;


  public Restaurant(String name, String address, Integer seats_count, String imageUrl, User manager) {
    this.name = name;
    this.address = address;
    this.seats_count = seats_count;
    this.imageUrl = imageUrl;
    this.manager = manager;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Integer getSeats_count() {
    return seats_count;
  }

  public void setSeats_count(Integer seats_count) {
    this.seats_count = seats_count;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public User getManager() {
    return manager;
  }

  public void setManager(User manager) {
    this.manager = manager;
  }
}
