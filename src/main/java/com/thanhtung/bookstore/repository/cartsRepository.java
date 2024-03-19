package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Carts;

public interface cartsRepository extends JpaRepository<Carts, Integer > {
    
}
