package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.thanhtung.bookstore.model.Products;
import java.util.List;


public interface productsRepository extends JpaRepository<Products, Integer> {
    List<Products> findByCategoryId(int categoryId);

    @Query("SELECT p FROM Products p WHERE p.name LIKE %:name%")
    List<Products> findByName(@Param("name") String name);
}
