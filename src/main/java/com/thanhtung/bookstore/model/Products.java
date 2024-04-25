package com.thanhtung.bookstore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String author;
    private int price;
    private int discount;
    @Column(name = "new_price")
    private int newPrice;
    @Column(name = "category_id")
    private int categoryId;
    private int quantity;
    private String describes;
    private String image;
    private int status;
    
    public Products() {}

    @java.beans.ConstructorProperties({"id", "name", "author", "price", "discount", "newPrice","categoryId","quantity", "describes", "image", "status"})
    public Products(int id, String name, String author, Integer price, Integer discount, Integer newPrice,
            int categoryId, int quantity, String describes, String image, int status) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;
        this.discount = discount;
        this.newPrice = price * (100 - discount) / 100;
        this.categoryId = categoryId;
        this.quantity = quantity;
        this.describes = describes;
        this.image = image;
        this.status = status;
    }
    
}
