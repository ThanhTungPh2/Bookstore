package com.thanhtung.bookstore.service;

import java.util.List;

import com.thanhtung.bookstore.model.Categories;

public interface categoryService {
    public String addCategory(Categories p);
    public String updateCategory(Categories p);
    public String updateStatusCategory(int id, int status);
    public Categories getCategory(int id);
    public List<Categories> getALLCategories();
}