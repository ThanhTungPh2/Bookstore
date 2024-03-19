package com.thanhtung.bookstore.model;

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
    private int oder_id ;
    private int user_id;
    private int product_id;    
}
