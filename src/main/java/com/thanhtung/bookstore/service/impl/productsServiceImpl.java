package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Products;
import com.thanhtung.bookstore.repository.productsRepository;
import com.thanhtung.bookstore.service.productsService;

@Service
public class productsServiceImpl implements productsService{


    productsRepository pRepository;

    public productsServiceImpl(productsRepository pRepository) {
        this.pRepository = pRepository;
    }

    @Override
    public String addProducts(Products p) {
        pRepository.save(p);
        return "Thên sản phẩm thành công";
    }

    @Override
    public String deleteProducts(int id) {
        pRepository.deleteById(id);
        return "Xoá sản phẩm thành công";
    }

    @Override
    public List<Products> getALLProducts() {
        return pRepository.findAll();

    }

    @Override
    public Products getProducts(int id) {
        return pRepository.findById(id).get();
    }

    @Override
    public String updateProducts(Products p) {
        pRepository.save(p);
        return "Cập nhật sản phẩm thành công";
    }

    @Override
    public List<Products> getProductsByCategoryId(int id) {
        return pRepository.findByCategoryId(id);
    }
    
    

}
