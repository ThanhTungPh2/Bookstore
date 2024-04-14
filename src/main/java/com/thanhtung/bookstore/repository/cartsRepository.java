package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.thanhtung.bookstore.model.Carts;
import java.util.List;

public interface cartsRepository extends JpaRepository<Carts, Integer > {

    @Query("SELECT c FROM Carts c WHERE c.orderId = :id")
    List<Carts> findAllByOrderId(Integer id);

    @Procedure(name = "THEM_SACH")
    @Transactional
    void THEM_SACH(@Param("user_id_param") Integer user_id
        ,@Param("product_id_param") Integer product_id
        ,@Param("quantity_new") Integer quantity);

    @Procedure(name = "XOA_SACH")
    @Transactional
    void XOA_SACH(@Param("user_id_param") Integer user_id
        ,@Param("product_id_param") Integer product_id);
}
