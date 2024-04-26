package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.model.Orders;
import com.thanhtung.bookstore.service.ordersService;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;



@RestController
@RequestMapping("/orders")
public class ordersController {
    
    ordersService oService;

    public ordersController(ordersService oService) {
        this.oService = oService;
    }

    @GetMapping("{orderId}")
    public String getOder(@PathVariable("orderId") int id) {
        return oService.getOder(id);
    }

    @GetMapping("/All/{userId}")
    public String getAllByUserId(@PathVariable("userId") int userid) {
        return oService.getAllOderByUserId(userid, "Đã xác nhận");
    }

    @PostMapping("/All/Email")
    public List<Orders> getAllByEmail(@RequestBody Orders o) {
        return oService.getAllOrderByEmail(o.getEmail());
    }
    
    @GetMapping("/All")
    public String getAllOrders() {
        return oService.getAllOrders();
    }
    
    @PostMapping()
    public String addOder(@RequestBody Orders o) {
        return oService.addOder(o);
    }

    @PutMapping()
    public String updateOder(@RequestBody Orders o) {
        return oService.updateOder(o);
    }

    @PatchMapping()
    public String changeStatus(@RequestBody Orders o) {
        return oService.changeStatus(o);
    }
}
