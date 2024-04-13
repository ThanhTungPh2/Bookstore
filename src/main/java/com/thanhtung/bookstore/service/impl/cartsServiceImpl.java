package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Carts;
import com.thanhtung.bookstore.repository.cartsRepository;
import com.thanhtung.bookstore.service.cartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class cartsServiceImpl implements cartService {

    private final cartsRepository cRepository;

    @Override
    public String addToCart(Carts c) {
        cRepository.save(c);
        return "Thêm thành công";
    }

    @Override
    public String deleteByProductId(int id) {
        cRepository.deleteByProductId(id);
        return null;
    }

    @Override
    public List<Carts> getAllCart(int id) {
        return cRepository.findAllByOrderId(id);
    }

    @Override
    public String updateToCart(Carts c) {
        cRepository.saveAndFlush(c);
        return "Sửa thành công";
    }
    
}
