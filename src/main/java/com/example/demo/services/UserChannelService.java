package com.example.demo.services;

import com.example.demo.entities.Channel;
import com.example.demo.repositories.ChannelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserChannelService {
    @Autowired
    private ChannelRepo channelRepo;

    public List<Channel> findAllUserChannels(int id){
        return channelRepo.findAllByUserId(id);
        }

}
