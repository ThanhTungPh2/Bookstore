package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Oders;
import com.thanhtung.bookstore.repository.odersRepository;
import com.thanhtung.bookstore.service.odersService;

@Service
public class odersServiceImpl implements odersService {
    
    odersRepository oRepository;

    public odersServiceImpl(odersRepository oRepository) {
        this.oRepository = oRepository;
    }

    @Override
    public String addOder(Oders o) {
        oRepository.save(o);
        return "Thêm đơn hàng thành công";
    }

    @Override
    public String deleteOder(int id) {
        oRepository.deleteById(id);
        return "Xoá đơn hàng thành công";
    }

    @Override
    public List<Oders> getAllOderByUserId(int userId) {
        return oRepository.findAllByUserId(userId);
    }

    @Override
    public Oders getOder(int id) {
        return oRepository.findById(id).get();
    }

    @Override
    public String updateOder(Oders o) {
        oRepository.save(o);
        return "Update hoá đơn thành công";
    }

    
}
