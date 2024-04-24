package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.thanhtung.bookstore.model.Orders;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface ordersRepository extends JpaRepository<Orders, Integer> {
    @Query("SELECT o FROM Orders o WHERE o.status = 'Đã xác nhận' AND o.userId = :userId")
    public List<Orders> findAllByUserId(int userId);

    @Query("SELECT o FROM Orders o")
    public List<Orders> findAllOrders();

    @Procedure(name = "UPDATE_ORDERS")
    @Transactional
    public void UPDATE_ORDERS(
        @Param("user_id_param") Integer userId,
        @Param("number_param") String number,
        @Param("placeOn_param") LocalDate placeOn,
        @Param("address_param") String address,
        @Param("email_param") String email,
        @Param("method_param") String method,
        @Param("name_param") String name,
        @Param("note") String note,
        @Param("status_param") String status
    );
    
    @Modifying
    @Transactional
    @Query("UPDATE Orders o SET o.status = :status WHERE o.id = :id")
    public int changeStatusOrder(@Param("id") int id, @Param("status") String status);
}
