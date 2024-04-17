package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.model.Orders;
import com.thanhtung.bookstore.service.ordersService;


@RestController
@RequestMapping("/orders")
public class ordersController {
    
    ordersService oService;

    public ordersController(ordersService oService) {
        this.oService = oService;
    }

    @GetMapping("{orderId}")
    public Orders getOder(@PathVariable("orderId") int id) {
        return oService.getOder(id);
    }

    @GetMapping("/All/{userId}")
    public String getAllByUserId(@PathVariable("userId") int userid) {
        return oService.getAllOderByUserId(userid);
    }
    

    @PostMapping()
    public String addOder(@RequestBody Orders o) {
        return oService.addOder(o);
    }

    @PutMapping()
    public String updateOder(@RequestBody Orders o) {
        return oService.updateOder(o);
    }
}
