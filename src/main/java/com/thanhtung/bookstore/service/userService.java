package com.thanhtung.bookstore.service;

import java.security.Principal;

import com.thanhtung.bookstore.model.ChangePasswordRequest;

public interface userService {
    public void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
