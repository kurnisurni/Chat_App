package com.example.demo.controllers;

import com.example.demo.entities.Message;
import com.example.demo.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping("/messages")
    public List<Message> getAllMessages(){
        return messageService.findAllMessages();
    }
}
