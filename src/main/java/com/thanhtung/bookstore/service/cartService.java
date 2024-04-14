package com.thanhtung.bookstore.service;
import com.thanhtung.bookstore.model.Carts;
import com.thanhtung.bookstore.parameter.spCart;

import java.util.List;

public interface cartService {
    public List<Carts> getAllCart(int id);
    public String addToCart(spCart spc);
    public String deleteToCart(spCart spCart);
}
