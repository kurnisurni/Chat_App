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

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getOneUser (@PathVariable int id) {
        return userService.findOneUser(id);
    }

    @GetMapping("/users/login/{username}/{password}")
    public User checkLogin (@PathVariable String username, @PathVariable String password){
        return userService.checkLogin(username, password);
    }

    @GetMapping("/users/setOnline/{id}")
    public User setOnline(@PathVariable int id) { return userService.setUserToOnline(id); }
}
