package com.thanhtung.bookstore.repository;

import java.util.Optional;

import com.thanhtung.bookstore.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.thanhtung.bookstore.model.Users;
import java.util.List;

public interface usersRepository extends JpaRepository<Users, Integer>{
    Optional<Users> findByEmail(String email);

    @Query("SELECT u FROM Users u WHERE role=:role")
    public List<Users> findAllUsers(@Param("role") Role role);
}
