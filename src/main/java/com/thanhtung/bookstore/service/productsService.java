package com.thanhtung.bookstore.service;

import java.util.List;
import com.thanhtung.bookstore.model.Products;

public interface productsService {
    public String addProducts(Products p);
    public String updateProducts(Products p);
    public String deleteProducts(int id);
    public Products getProducts(int id);
    public List<Products> getALLProducts();
    public List<Products> getProductsByCategoryId(int id);
}
