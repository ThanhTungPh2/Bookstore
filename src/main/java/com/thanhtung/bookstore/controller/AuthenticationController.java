package com.thanhtung.bookstore.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.thanhtung.bookstore.auth.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    
    private final AuthenticationService service;
    private final UserDetailsService uService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {      
        try {
            uService.loadUserByUsername(request.getEmail());
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder().message("Tài khoản đã tồn tại").build());
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.ok(service.register(request));
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse temp = service.authenticate(request);
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", temp.getToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("none")
                .path("/")
                .maxAge(18000)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

        ResponseCookie checkLogCookie = ResponseCookie.from("logged", "logged")
                .httpOnly(false)
                .secure(true)
                .sameSite("none")
                .path("/")
                .maxAge(18000)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, checkLogCookie.toString());

        return ResponseEntity.ok(new AuthenticationResponse().builder().message("Done").build());
    }
}
