package com.thanhtung.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanhtung.bookstore.model.Message;
import java.util.List;

public interface messageRepository extends JpaRepository<Message, Integer>{
    List<Message> findByUserid(int userId);
}
