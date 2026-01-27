package com.romans.app.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
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

	@Column(name = "name", nullable = false, length = 100)
	private String name;

	@Column(name = "email", nullable = false, unique = true, length = 150)
	private String email;

	@Column(name = "phone", length = 20)
	private String phone;

	@Column(name = "password", nullable = false)
	private String password;

	@Builder.Default
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	@OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@Builder.Default
	private List<Order> orders = new ArrayList<>();

	@OneToMany(mappedBy = "courier", fetch = FetchType.LAZY)
	@Builder.Default
	private List<Order> deliveries = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@Builder.Default
	private List<UserAddress> userAddresses = new ArrayList<>();

	@ElementCollection(targetClass = Role.class)
	@CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private List<Role> roles = new ArrayList<>();

	@OneToOne(mappedBy = "manager", fetch = FetchType.LAZY)
	private Restaurant restaurant;

	public void addRole(Role role) {
		if (roles == null) {
			roles = new ArrayList<>();
		}
		roles.add(role);
	}

	public void removeRole(Role role) {
		if (roles != null) {
			roles.remove(role);
		}
	}

	public void addAddress(UserAddress address) {
		userAddresses.add(address);
		address.setUser(this);
	}

	public void removeAddress(UserAddress address) {
		userAddresses.remove(address);
		address.setUser(null);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof User))
			return false;
		User user = (User) o;
		return Objects.equals(email, user.email); // Сравнение по email как уникальному полю
	}

	@Override
	public int hashCode() {
		return Objects.hash(email);
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", name='" + name + '\'' +
				", email='" + email + '\'' +
				", phone='" + phone + '\'' +
				", createdAt=" + createdAt +
				", roles=" + roles +
				'}';
	}
}