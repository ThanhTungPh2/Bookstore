package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Orders;
import com.thanhtung.bookstore.repository.ordersRepository;
import com.thanhtung.bookstore.service.ordersService;

@Service
public class ordersServiceImpl implements ordersService {
    
    ordersRepository oRepository;

    public ordersServiceImpl(ordersRepository oRepository) {
        this.oRepository = oRepository;
    }

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
    public List<Orders> getAllOderByUserId(int userId) {
        return oRepository.findAllByUserId(userId);
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
