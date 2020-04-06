package com.example.demo.services;

import com.example.demo.entities.DeleteFriend;
import com.example.demo.entities.PrivateChat;
import com.example.demo.repositories.PrivateChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateChatService {

    @Autowired
    PrivateChatRepo privateChatRepo;

    @Autowired
    SocketService socketService;

    public List<PrivateChat> getAllPrivateChats(int id){

        List<PrivateChat> newList = privateChatRepo.findAllByUser1(id);

        newList.addAll(privateChatRepo.findAllByUser2(id));

        return newList;
    }

    public PrivateChat createPrivateChat(PrivateChat privateChat){
        PrivateChat newChat = null;

        try{
            newChat = privateChatRepo.save(privateChat);

            newChat.action = "new-private-chat";

            socketService.sendToAll(newChat, PrivateChat.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return newChat;
    }
}
