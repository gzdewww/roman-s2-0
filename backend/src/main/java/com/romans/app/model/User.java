package com.romans.app.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false, unique = true)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "phone")
	private String phone;

	@Column(name = "password", nullable = false)
	private String password;

	@OneToOne(mappedBy = "manager", fetch = FetchType.LAZY)
	private Restaurant restaurant;

	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToMany(mappedBy = "client")
	private List<Order> orders;

	@OneToMany(mappedBy = "courier")
	private List<Order> deliveries;

	@ElementCollection
	@CollectionTable(name = "user_addresses", joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "address")
	private List<String> addresses;
}
