package com.example.demo.controllers;


import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")            // Går så att rest alltid finns med
public class UserController {

    @Autowired
    UserService userService;

    //@CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getOneUser (@PathVariable int id) {
        return userService.findOneUser(id);
    }
}
