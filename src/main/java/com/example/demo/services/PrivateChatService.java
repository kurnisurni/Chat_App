package com.example.demo.services;

import com.example.demo.repositories.PrivateChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrivateChatService {

    @Autowired
    PrivateChatRepo privateChatRepo;

    @Autowired
    SocketService socketService;

    
}
