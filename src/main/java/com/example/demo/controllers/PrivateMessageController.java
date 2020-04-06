package com.example.demo.controllers;

import com.example.demo.entities.PrivateMessage;
import com.example.demo.services.PrivateMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class PrivateMessageController {

    @Autowired
    PrivateMessageService privateMessageService;

    @GetMapping("/privateMessages")
    public List<PrivateMessage> getAllMessages(){

        return privateMessageService.findAllMessages();
    }
    @PostMapping("/privateMessages")
    public PrivateMessage postMessage(@RequestBody PrivateMessage message){
        return privateMessageService.postMessage(message);
    }

    @DeleteMapping("/privateMessages/{id}/{index}")
    public void deleteMessage(@PathVariable int id, @PathVariable int index) { privateMessageService.deleteById(id, index);}
}
