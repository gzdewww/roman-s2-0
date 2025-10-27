package com.romans.backend.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String surname;
	private String email;
	private String phone;
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Order> orders = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<String> addresses = new ArrayList<>();

	public User() {
	}

}
