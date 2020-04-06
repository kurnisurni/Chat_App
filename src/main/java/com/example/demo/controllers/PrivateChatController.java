package com.example.demo.controllers;

import com.example.demo.entities.PrivateChat;
import com.example.demo.services.PrivateChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class PrivateChatController {

    @Autowired
    PrivateChatService privateChatService;

    @PostMapping("/privateChat")
    public PrivateChat createPrivateChat(@RequestBody PrivateChat privateChat){
        return privateChatService.createPrivateChat(privateChat);
    }

    @GetMapping("/privateChat/{id}")
    public List<PrivateChat> getAllPrivateChats(@PathVariable int id){
        return privateChatService.getAllPrivateChats(id);
    }
}
