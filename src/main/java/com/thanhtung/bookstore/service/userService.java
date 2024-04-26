package com.thanhtung.bookstore.service;

import java.security.Principal;

import com.thanhtung.bookstore.model.ChangePasswordRequest;
import com.thanhtung.bookstore.model.Users;
import java.util.List;
import java.util.Optional;

import com.thanhtung.bookstore.model.Role;
public interface userService {
    public void changePassword(ChangePasswordRequest request, Principal connectedUser);
    public List<Users> getUsers(Role role);
    public Optional<Users> getUsersById(int userId);
    public List<Users> getAllUsers();
    public String addUsers(Users u);
    public void changeStatusUser(int id, int status);
    public Optional<Users> getUsersByEmail(String email); 
}
