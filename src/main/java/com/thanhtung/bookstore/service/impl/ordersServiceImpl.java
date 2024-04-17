package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
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
    public String getAllOderByUserId(int userId) {
        List<Orders> lo = oRepository.findAllByUserId(userId);

        ArrayNode order = jsonProcess.objectMapper.createArrayNode();
        
        for (Orders item : lo) {
            ObjectNode result = jsonProcess.objectMapper.createObjectNode();
            ArrayNode carts = jsonProcess.objectMapper.createArrayNode();
            result.set("carts", carts);

            result = (ObjectNode)jsonProcess.objectToJsonNode(item);

            order.add(result);
        }
        return jsonProcess.objectToJson(order);
    }

    @Override
    public Orders getOder(int id) {
        return oRepository.findById(id).get();
    }

    @Override
    public String updateOder(Orders o) {
        oRepository.saveAndFlush(o);
        return "Update hoá đơn thành công";
    }

    
}
