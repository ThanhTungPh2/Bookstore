package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/all")
    public List<Categories> getAllCategory() {
        return cService.getALLCategories();
    }

    @GetMapping()
    public Categories getCategories(@RequestParam("id") int id) {
        return cService.getCategory(id);
    }

    @PostMapping()
    public String addCategory(@RequestBody Categories c) {
        return cService.addCategory(c);
    }

    @PutMapping()
    public String changeStatus(@RequestParam("id") int id, @RequestParam("status") int status) {
        return cService.updateStatusCategory(id, status);
    }

    @PutMapping("update")
    public String updateCategory(@RequestBody Categories c) {
        return cService.updateCategory(c);
    }
}
