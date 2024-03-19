package com.thanhtung.bookstore.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Users;

public interface usersRepository extends JpaRepository<Users, Integer>{
    Optional<Users> findByEmail(String email);
}
