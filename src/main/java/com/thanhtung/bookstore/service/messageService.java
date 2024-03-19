package com.thanhtung.bookstore.service;

import com.thanhtung.bookstore.model.Message;
import java.util.List;

public interface messageService {
    public String addMessage(Message m);
    public String updateMessage (Message m);
    public String deleteMessage (int id);
    public List<Message> getAllMessageByUserId(int id);
}
