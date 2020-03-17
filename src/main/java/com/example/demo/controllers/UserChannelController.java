package com.example.demo.controllers;

import com.example.demo.entities.UserChannel;
import com.example.demo.services.UserChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class UserChannelController {

    @Autowired
    private UserChannelService userChannelService;

    @GetMapping("/users/channels/id/{id}")
    public List<UserChannel> getUserChannels(@PathVariable int id){
        return userChannelService.findAllUserChannels(id);
    }

}
