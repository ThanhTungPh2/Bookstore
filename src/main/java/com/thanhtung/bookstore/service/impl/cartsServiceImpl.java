package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Carts;
import com.thanhtung.bookstore.parameter.spCart;
import com.thanhtung.bookstore.repository.cartsRepository;
import com.thanhtung.bookstore.service.cartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class cartsServiceImpl implements cartService {

    private final cartsRepository cRepository;

    @Override
    public String addToCart(spCart spc) {
        cRepository.THEM_SACH(spc.getUserId(), spc.getProductId(), spc.getQuantity());
        return null;
    }

    @Override
    public String deleteToCart(spCart spc) {
        cRepository.XOA_SACH(spc.getUserId(), spc.getProductId());
        return null;
    }

    @Override
    public List<Carts> getAllCart(int id) {
        return cRepository.findAllByOrderId(id);
    }

    
    
}
