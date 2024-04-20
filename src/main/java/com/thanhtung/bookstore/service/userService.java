package com.thanhtung.bookstore.service;

import java.security.Principal;

import com.thanhtung.bookstore.model.ChangePasswordRequest;
import com.thanhtung.bookstore.model.Users;
import java.util.List;

import com.thanhtung.bookstore.model.Role;
public interface userService {
    public void changePassword(ChangePasswordRequest request, Principal connectedUser);
    public List<Users> getUsers(Role role);
}
