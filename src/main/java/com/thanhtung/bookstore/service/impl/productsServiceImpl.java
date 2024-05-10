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
        return "Thêm sản phẩm thành công";
    }

    @Override
    public String deleteProducts(int id) {
        Products p = this.getProducts(id);
        pRepository.deleteProducts(id,p.getStatus() == 0 ? 1:0);
        return "Update trạng thái thành công";
    }

    @Override
    public List<Products> getALLProducts() {
        return pRepository.findAllProducts();
    }

    @Override
    public Products getProducts(int id) {
        return pRepository.findById(id).get();
    }

    @Override
    public String updateProducts(Products p) {
        pRepository.saveAndFlush(p);
        return "Cập nhật sản phẩm thành công";
    }

    @Override
    public List<Products> getProductsByCategoryId(int id) {
        return pRepository.findAllProductsByCategoryId(id);
    }
    
    @Override
    public List<Products> getProductsByName (String name) {
        return pRepository.findByName(name);
    }

}
