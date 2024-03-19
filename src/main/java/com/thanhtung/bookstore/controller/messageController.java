package com.thanhtung.bookstore.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanhtung.bookstore.service.messageService;
import com.thanhtung.bookstore.model.Message;
import java.util.List;

@RestController
@RequestMapping("/message")
public class messageController {
    
    messageService mService;

    public messageController(messageService mService) {
        this.mService = mService;
    }

    @GetMapping("{userId}")
    public List<Message>  getAllMessage(@PathVariable("userId") int userId) {
        return mService.getAllMessageByUserId(userId);
    }

    @PostMapping()
    public String addMessage(@RequestBody Message m) {
        return mService.addMessage(m);
    }

    @PutMapping()
    public String updateMessage(@RequestBody Message m) {
        return mService.updateMessage(m);
    }

    @DeleteMapping("{userId}")
    public String deleteMessage(@PathVariable("userId") int userId) {
        return mService.deleteMessage(userId);
    }

}
