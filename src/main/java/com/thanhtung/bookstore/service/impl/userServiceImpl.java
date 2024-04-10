package com.thanhtung.bookstore.service.impl;
import java.security.Principal;
import com.thanhtung.bookstore.model.ChangePasswordRequest;
import com.thanhtung.bookstore.service.userService;

import lombok.RequiredArgsConstructor;

import com.thanhtung.bookstore.model.Users;
import com.thanhtung.bookstore.repository.usersRepository;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class userServiceImpl implements userService {

    private final PasswordEncoder passwordEncoder;
    private final usersRepository uRepository;
    
    @Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (Users) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        uRepository.save(user);
        
    }

    
    
}
