package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Products;

public interface productsRepository extends JpaRepository<Products, Integer> {
}
