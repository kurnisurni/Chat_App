package com.example.demo.services;

import com.example.demo.entities.UserChannel;
import com.example.demo.repositories.UserChannelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserChannelService {
    @Autowired
    private UserChannelRepo userChannelRepo;


    public List<UserChannel> findAllUserChannels(int id){
        return userChannelRepo.findAllByUserId(id);
        }

}
