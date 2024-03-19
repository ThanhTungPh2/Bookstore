package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Oders;
import java.util.List;

public interface odersRepository extends JpaRepository<Oders, Integer> {
    public List<Oders> findAllByUserId(int userId);
}
