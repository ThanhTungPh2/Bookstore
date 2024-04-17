package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thanhtung.bookstore.model.Orders;
import java.util.List;

public interface ordersRepository extends JpaRepository<Orders, Integer> {
    @Query("SELECT o FROM Orders o WHERE o.status = 'Đã xác nhận' AND o.userId = :userId")
    public List<Orders> findAllByUserId(int userId);
}
