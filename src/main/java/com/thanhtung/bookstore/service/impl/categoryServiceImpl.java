package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Categories;
import com.thanhtung.bookstore.repository.categoriesRepository;
import com.thanhtung.bookstore.service.categoryService;

@Service
public class categoryServiceImpl implements categoryService {

    categoriesRepository cRepository;

    public categoryServiceImpl(categoriesRepository cRepository) {
        this.cRepository = cRepository;
    }

    @Override
    public String addCategory(Categories p) {
        cRepository.save(p);
        return "Thêm category thành công";
    }

    @Override
    public String deleteCategory(int id) {
        cRepository.deleteById(id);
        return "Xoá category thành công";
    }

    @Override
    public List<Categories> getALLCategories() {
        return cRepository.findAll();
    }

    @Override
    public Categories getCategory(int id) {
        return cRepository.findById(id).get();
    }

    @Override
    public String updateCategory(Categories p) {
        cRepository.saveAndFlush(p);
        return "Update category thành công";
    }
    
}
