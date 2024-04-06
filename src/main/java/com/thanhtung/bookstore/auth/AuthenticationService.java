package com.thanhtung.bookstore.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.thanhtung.bookstore.repository.usersRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import com.thanhtung.bookstore.config.JwtService;
import com.thanhtung.bookstore.model.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final usersRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager; 

    public AuthenticationResponse register (@RequestBody RegisterRequest request) {

        Users user = Users.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate (@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationRefreshLogin refreshLogin(HttpServletRequest request) {
        String jwt = null;
        if(request.getCookies() != null){
            for(Cookie cookie: request.getCookies()){
                if(cookie.getName().equals("accessToken")){
                    jwt = cookie.getValue();
                }
            }
        }
        
        if(jwt == null){
            SecurityContextHolder.clearContext();
            return AuthenticationRefreshLogin.builder().email("").name("").build();
        }
        String userEmail = jwtService.extractUsername(jwt);// trích xuất Email from jwt
        var user = repository.findByEmail(userEmail).orElseThrow();
        return AuthenticationRefreshLogin.builder().email(userEmail).name(user.getName()).build();
    }
}