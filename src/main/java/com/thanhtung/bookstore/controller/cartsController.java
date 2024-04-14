package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.service.cartService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.thanhtung.bookstore.model.Carts;
import com.thanhtung.bookstore.parameter.spCart;

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

    @PostMapping("/add")
    public String addCarts(@RequestBody spCart spc
    ) {
        return cService.addToCart(spc);
    }

    @PostMapping("/delete")
    public String updateProducts(@RequestBody spCart spc
    ) {
        return cService.deleteToCart(spc);
    }    
}
