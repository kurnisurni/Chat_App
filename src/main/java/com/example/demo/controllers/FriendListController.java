package com.example.demo.controllers;

import com.example.demo.entities.FriendList;
import com.example.demo.services.FriendListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")

public class FriendListController {

    @Autowired
    FriendListService friendListService;

    @GetMapping("/friend-list/{userId}")
    public List<FriendList> getAllFriendsForUser(@PathVariable int userId){
        return friendListService.findAllByUser1(userId);
    }
    @DeleteMapping("/friend-list/{userId}")
    public FriendList deleteOneByUser1(@PathVariable int userId){
        return friendListService.deleteOneByUser1(userId);
    }
}
