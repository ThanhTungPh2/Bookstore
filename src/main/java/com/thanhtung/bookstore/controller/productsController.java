package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.service.productsService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import com.thanhtung.bookstore.model.Products;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/products")
public class productsController {
    
    productsService pService;

    public productsController(productsService pService) {
        this.pService = pService;
    }

    @GetMapping()
    public List<Products> getAllProducts() {
        return pService.getALLProducts();
    }

    @GetMapping("{productId}")
    public Products geProducts(@PathVariable("productId") int id){
        return pService.getProducts(id);
    }

    @PostMapping()
    public String addProducts(@RequestBody Products p) {
        return pService.addProducts(p);
    }

    @PutMapping()
    public String updateProducts(@RequestBody Products p) {
        return pService.updateProducts(p);
    }

    @DeleteMapping("{productId}")
    public String deleteProduct(@PathVariable("productId") int id) {
        return pService.deleteProducts(id);
    }
    
    
}
