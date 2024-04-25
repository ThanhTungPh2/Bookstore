package com.thanhtung.bookstore.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.thanhtung.bookstore.auth.*;
import com.thanhtung.bookstore.repository.usersRepository;

import jakarta.servlet.http.HttpServletResponse;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    
    private final AuthenticationService service;
    private final UserDetailsService uService;
    private final usersRepository uRepository;

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
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse temp = service.authenticate(request);

        if (temp.getStatus() == 0)
            return ResponseEntity.ok(temp);
        
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", temp.getToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("none")
                .path("/")
                .maxAge(18000)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

        var user = uRepository.findByEmail(request.getEmail()).orElseThrow();
        String json = "{\"email\":\""+user.getEmail()+"\",\"name\":\""+user.getName()+"\",\"id\":\""+user.getId()+"\",\"role\":\""+user.getRole()+"\"}";
        ResponseCookie checkLogCookie = ResponseCookie.from("logged", Base64.getEncoder().encodeToString(json.getBytes(StandardCharsets.UTF_8)))
                .httpOnly(false)
                .secure(true)
                .sameSite("none")
                .path("/")
                .maxAge(18000)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, checkLogCookie.toString());
        return ResponseEntity.ok(AuthenticationResponse.builder().message("Đăng nhập thành công!").build());
    }
}
