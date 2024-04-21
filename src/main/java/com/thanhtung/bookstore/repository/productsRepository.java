package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.thanhtung.bookstore.model.Products;

import jakarta.transaction.Transactional;

import java.util.List;


public interface productsRepository extends JpaRepository<Products, Integer> {
    List<Products> findByCategoryId(int categoryId);

    @Query("SELECT p FROM Products p WHERE p.name LIKE %:name%")
    List<Products> findByName(@Param("name") String name);

    @Modifying
    @Transactional
    @Query("UPDATE Products p SET p.status = 0 WHERE p.id = :id")
    int deleteProducts(@Param("id") int id);
    
}
