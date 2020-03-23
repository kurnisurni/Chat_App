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

    @Autowired
    SocketService socketService;

    public List<User> findAllUsers() {
        return (List<User>) userRepo.findAll();
    }

    public User findOneUser (int id) {
        User user = userRepo.findById(id);
        if (user == null) return null;

        return user;
    }

    public User setUserToOnline(int id) {
        User user = userRepo.findById(id);

        user.action = "goOnline";

        socketService.sendToAll(user, User.class);

        return user;
    }

    public User checkLogin(String username, String password){
        return userRepo.checkPassword(username, password);
    }

    public User register(User newUser) {
        return userRepo.save(newUser);
    }
}
