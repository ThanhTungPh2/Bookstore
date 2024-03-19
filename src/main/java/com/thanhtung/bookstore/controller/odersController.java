package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.model.Oders;
import com.thanhtung.bookstore.service.odersService;
import java.util.List;


@RestController
@RequestMapping("/oders")
public class odersController {
    
    odersService oService;

    public odersController(odersService oService) {
        this.oService = oService;
    }

    @GetMapping("{oserId}")
    public Oders getOder(@PathVariable("oderId") int id) {
        return oService.getOder(id);
    }

    @GetMapping("/All/{userId}")
    public List<Oders> getAllByUserId(@PathVariable("userid") int userid) {
        return oService.getAllOderByUserId(userid);
    }
    

    @PostMapping()
    public String addOder(@RequestBody Oders o) {
        return oService.addOder(o);
    }

    @PutMapping()
    public String updateOder(@RequestBody Oders o) {
        return oService.updateOder(o);
    }
}
