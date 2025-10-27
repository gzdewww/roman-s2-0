package com.romans.backend.model;

import jakarta.persistence.*;
import java.util.*;

public class Menu {
  @OneToMany
  private List<Dish> dishes = new ArrayList<>();

  @OneToOne
  private Restaurant restaurant;

  private Date date = new Date();
}
