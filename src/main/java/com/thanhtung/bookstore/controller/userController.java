package com.thanhtung.bookstore.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.model.ChangePasswordRequest;
import com.thanhtung.bookstore.model.Role;
import com.thanhtung.bookstore.service.userService;

import lombok.RequiredArgsConstructor;
import com.thanhtung.bookstore.model.Users;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class userController {
    
    private final userService uService;

    @PatchMapping
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
        uService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/ADMIN")
    public List<Users> getAllUsersAdmin () {
        return uService.getUsers(Role.ADMIN);
    }

    @GetMapping("/USER")
    public List<Users> getAllUsersUser () {
        return uService.getUsers(Role.USER);
    }

    @GetMapping("/ALL")
    public List<Users> getAllUsers () {
        return uService.getAllUsers();
    }

    @GetMapping("/Email")
    public Optional<Users> getMethodName(@RequestParam("email") String email) {
        return uService.getUsersByEmail(email);
    }
    

    @PostMapping()
    public String addUsers(@RequestBody Users u) {
        return uService.addUsers(u);
    }

    @PatchMapping("/status")
    public String changeStatus(@RequestBody Users u) {
        uService.changeStatusUser(u.getId(), u.getStatus());
        return "Thành công";
    }
    
}
