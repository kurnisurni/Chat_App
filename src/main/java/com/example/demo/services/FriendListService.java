package com.example.demo.services;


import com.example.demo.entities.FriendList;
import com.example.demo.entities.User;
import com.example.demo.repositories.FriendListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendListService {

    @Autowired
    FriendListRepo friendListRepo;

    public List<FriendList> findAllByUser1(int user1id){
        return friendListRepo.findAllByUser1(user1id);
    }
}
