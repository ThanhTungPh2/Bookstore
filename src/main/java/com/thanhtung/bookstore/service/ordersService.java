package com.thanhtung.bookstore.service;

import com.thanhtung.bookstore.model.Orders;
import java.util.List;

public interface ordersService {
    public String addOder(Orders o);
    public String updateOder(Orders o);
    public String deleteOder(int id);
    public List<Orders> getAllOderByUserId(int userId);
    public Orders getOder(int id);
}
