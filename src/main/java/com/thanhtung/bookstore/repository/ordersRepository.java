package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Orders;
import java.util.List;

public interface ordersRepository extends JpaRepository<Orders, Integer> {
    public List<Orders> findAllByUserId(int userId);
}
