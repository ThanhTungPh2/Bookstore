package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Categories;

public interface categoriesRepository extends JpaRepository<Categories, Integer> {
    
}
