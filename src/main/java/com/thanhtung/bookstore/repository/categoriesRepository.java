package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.thanhtung.bookstore.model.Categories;
import java.util.List;

import jakarta.transaction.Transactional;

public interface categoriesRepository extends JpaRepository<Categories, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE Categories c SET c.status = :status WHERE c.id = :id")
    int changeStatusCategory(@Param("id") int id, @Param("status") int status);

    @Query("SELECT c FROM Categories c WHERE c.status = 1")
    List<Categories> findAllCategories();
}
