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

import com.thanhtung.bookstore.parameter.spCart;


@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class cartsController {
    
    private final cartService cService;

    @GetMapping("{user_id}")
    public String getMethodName(@PathVariable("user_id") int id) {
        return cService.getAllCart(id, "Carts");
    }

    @PostMapping("/add")
    public String addCarts(@RequestBody spCart spc
    ) {
        return cService.addToCart(spc);
    }

    @PostMapping("/delete")
    public String deleteProducts(@RequestBody spCart spc
    ) {
        return cService.deleteToCart(spc);
    }

    @DeleteMapping
    public String deleteAllProducts(@RequestBody spCart spc)
    {
        return cService.deleteAllCart(spc);
    }
    
    @PutMapping("/update")
    public String updateProducts(@RequestBody spCart spCart)
    {
        return cService.updateToCart(spCart);
    }
}
