package com.example.demo.services;


import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public List<User> findAllUsers() {
        List<User> users = (List<User>) userRepo.findAll();

        for (User user : users){
            user.setPicture("pic-url");
        }

        return users;
    }

    public User findOneUser (int id) {
        User user = userRepo.findById(id);
        if (user == null) return null;

        user.setPicture("pic-url");

        return user;
    }
}
