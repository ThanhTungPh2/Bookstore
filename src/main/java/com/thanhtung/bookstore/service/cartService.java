package com.thanhtung.bookstore.service;
import com.thanhtung.bookstore.parameter.spCart;

public interface cartService {
    public String getAllCart(int id, String status);
    public String addToCart(spCart spc);
    public String deleteToCart(spCart spCart);
    public String updateToCart(spCart spCart);
    public String deleteAllCart(spCart spCart);
    public String getAllCartByOrder(int id);
}
