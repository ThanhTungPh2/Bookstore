package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;


import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.thanhtung.bookstore.model.Orders;
import com.thanhtung.bookstore.repository.ordersRepository;
import com.thanhtung.bookstore.service.cartService;
import com.thanhtung.bookstore.service.ordersService;

import lombok.RequiredArgsConstructor;

import com.thanhtung.bookstore.parameter.jsonProcess;

@Service
@RequiredArgsConstructor
public class ordersServiceImpl implements ordersService {
    
    private final ordersRepository oRepository;
    private final cartService cService;

    @Override
    public String addOder(Orders o) {
        oRepository.save(o);
        return "Thêm đơn hàng thành công";
    }

    @Override
    public String deleteOder(int id) {
        oRepository.deleteById(id);
        return "Xoá đơn hàng thành công";
    }

    @Override
    public String getAllOderByUserId(int userId, String status) {
        List<Orders> lo;
        if (status != null)
            lo = oRepository.findAllByUserId(userId, status);
        else
            lo = oRepository.findAllByUserId(userId);

        System.out.println(lo);

        ArrayNode order = jsonProcess.objectMapper.createArrayNode();
        
        for (Orders item : lo) {
            ObjectNode result = jsonProcess.objectToObjectNode(item);
            
            ObjectNode updatedProduct = jsonProcess.jsonToObjectNode(cService.getAllCartByOrder(item.getId()));
            updatedProduct.remove("orderId");
            updatedProduct.remove("userId");
            result.set("carts", updatedProduct);

            order.add(result);
        }
        return jsonProcess.objectToJson(order);
    }

    @Override
    public String getOder(int id) {
        Orders lo = oRepository.findById(id).get();

        ArrayNode order = jsonProcess.objectMapper.createArrayNode();
        
        ObjectNode result = jsonProcess.objectToObjectNode(lo);
        
        ObjectNode updatedProduct = jsonProcess.jsonToObjectNode(cService.getAllCartByOrder(lo.getId()));
        updatedProduct.remove("orderId");
        updatedProduct.remove("userId");
        result.set("carts", updatedProduct);

        order.add(result);
        return jsonProcess.objectToJson(order);
    }

    @Override
    public String updateOder(Orders o) {
        oRepository.UPDATE_ORDERS(o.getUserId(), o.getNumber(), o.getPlacedOn()
            , o.getAddress(), o.getEmail(), o.getMethod(), o.getName(), o.getNote(), o.getStatus());
        return "Update hoá đơn thành công";
    }

    @Override
    public List<Orders> getAllOrders() {
        return oRepository.findAllOrders();
    }

    @Override
    public String changeStatus(Orders o) {
        oRepository.changeStatusOrder(o.getId(), o.getStatus());
        return "Cập nhật thành công";
    }

    @Override
    public List<Orders> getAllOrderByEmail(String email) {
        return oRepository.findAllByEmail(email);
    }

    
}
