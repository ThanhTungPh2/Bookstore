package com.thanhtung.bookstore.service;
import com.thanhtung.bookstore.model.Carts;
import java.util.List;

public interface cartService {
    public List<Carts> getAllCart(int id);
    public String addToCart(Carts c);
    public String deleteByProductId(int id);
    public String updateToCart(Carts c);
}
