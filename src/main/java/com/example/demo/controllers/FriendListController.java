package com.example.demo.controllers;



import com.example.demo.entities.FriendList;
import com.example.demo.entities.User;
import com.example.demo.services.FriendListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")

public class FriendListController {

    @Autowired
    FriendListService friendListService;

    @GetMapping("/friendlist/{userId}")
    public List<FriendList> getAllFriendsForUser(@PathVariable int userId){
        return friendListService.findAllByUser1(userId);
    }
}
