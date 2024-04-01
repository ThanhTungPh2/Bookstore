package com.thanhtung.bookstore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Carts {
    private int quantity;
    private double price;
    @Id
    @Column(name = "order_id")
    private int orderId ;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "product_id")
    private int productId;    
}
