package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.service.cartService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.thanhtung.bookstore.model.Carts;
import java.util.List;


@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class cartsController {
    
    private final cartService cService;

    @GetMapping("{order_id}")
    public List<Carts> getMethodName(@PathVariable("order_id") int id) {
        return cService.getAllCart(id);
    }

    @PostMapping()
    public String addCarts(@RequestBody Carts c) {
        return cService.addToCart(c);
    }

    @PutMapping()
    public String updateProducts(@RequestBody Carts c) {
        return cService.updateToCart(c);
    }

    @DeleteMapping("{product_id}")
    public String deleteProduct(@PathVariable("product_id") int id) {
        return cService.deleteByProductId(id);
    }

    
}
