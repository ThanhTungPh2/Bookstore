package com.thanhtung.bookstore.service;

import com.thanhtung.bookstore.model.Oders;
import java.util.List;

public interface odersService {
    public String addOder(Oders o);
    public String updateOder(Oders o);
    public String deleteOder(int id);
    public List<Oders> getAllOderByUserId(int userId);
    public Oders getOder(int id);
}
