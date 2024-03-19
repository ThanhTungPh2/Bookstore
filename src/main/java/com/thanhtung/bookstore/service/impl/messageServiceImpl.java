package com.thanhtung.bookstore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thanhtung.bookstore.model.Message;
import com.thanhtung.bookstore.repository.messageRepository;
import com.thanhtung.bookstore.service.messageService;

@Service
public class messageServiceImpl implements messageService {
    
    messageRepository mRepository;

    public messageServiceImpl(messageRepository mRepository) {
        this.mRepository = mRepository;
    }

    @Override
    public String addMessage(Message m) {
        mRepository.save(m);
        return "Thêm message thành công";
    }

    @Override
    public String deleteMessage(int id) {
        mRepository.deleteById(id);
        return "Xoá tin nhắn thành công";
    }

    @Override
    public List<Message> getAllMessageByUserId(int id) {
        return mRepository.findByUserid(id);
    }

    @Override
    public String updateMessage(Message m) {
        mRepository.save(m);
        return "Update message thành công";
    }

    

}
