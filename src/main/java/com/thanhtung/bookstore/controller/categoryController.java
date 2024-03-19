package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.service.categoryService;
import com.thanhtung.bookstore.model.Categories;

import java.util.List;

@RestController
@RequestMapping("/category")
public class categoryController {
    
    categoryService cService;

    public categoryController(categoryService cService) {
        this.cService = cService;
    }

    @GetMapping()
    public List<Categories> getAllCategory() {
        return cService.getALLCategories();
    }

    @PostMapping()
    public String addCategory(@RequestBody Categories c) {
        return cService.addCategory(c);
    }
}
