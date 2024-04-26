package com.thanhtung.bookstore.service.impl;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.thanhtung.bookstore.model.ChangePasswordRequest;
import com.thanhtung.bookstore.service.userService;

import lombok.RequiredArgsConstructor;

import com.thanhtung.bookstore.model.Users;
import com.thanhtung.bookstore.model.Role;
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
    public List<Users> getUsers(Role role) {
        return uRepository.findAllUsers(role);
    }

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

    @Override
    public String addUsers(Users u) {
        uRepository.save(u);
        return "Thêm thành công";
    }

    @Override
    public void changeStatusUser(int id, int status) {
        uRepository.changeStatusUser(id, status);
    }

    @Override
    public List<Users> getAllUsers() {
        return uRepository.findAll();
    }

    @Override
    public Optional<Users> getUsersById(int userId) {
        return uRepository.findById(userId);
    }

    @Override
    public Optional<Users> getUsersByEmail(String email) {
        return uRepository.findByEmail(email);
    }

    

}
