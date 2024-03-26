package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Products;
import java.util.List;


public interface productsRepository extends JpaRepository<Products, Integer> {
    List<Products> findByCategoryId(int categoryId);
}
