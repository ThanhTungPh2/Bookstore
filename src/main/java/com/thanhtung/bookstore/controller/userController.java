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
    public List<Users> getAllUsers () {
        return uService.getUsers(Role.USER);
    }
}
