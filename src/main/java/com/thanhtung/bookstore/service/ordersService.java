package com.thanhtung.bookstore.service;

import com.thanhtung.bookstore.model.Orders;

public interface ordersService {
    public String addOder(Orders o);
    public String updateOder(Orders o);
    public String deleteOder(int id);
    public String getAllOderByUserId(int userId, String status);
    public String getAllOrders();
    public String getOder(int id);
    public String changeStatus(Orders o);
}
