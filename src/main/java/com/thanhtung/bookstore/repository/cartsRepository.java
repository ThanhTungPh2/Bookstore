package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.thanhtung.bookstore.model.Carts;
import java.util.List;

public interface cartsRepository extends JpaRepository<Carts, Integer > {
    @Modifying
    @Transactional
    @Query("DELETE FROM Carts c WHERE c.productId = :id")
    void deleteByProductId(@Param("id") Integer id);


    @Query("SELECT c FROM Carts c WHERE c.orderId = :id")
    List<Carts> findAllByOrderId(Integer id);

}
