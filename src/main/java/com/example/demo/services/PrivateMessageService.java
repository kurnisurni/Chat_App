package com.example.demo.services;

import com.example.demo.entities.DeleteClass;
import com.example.demo.entities.Message;
import com.example.demo.entities.PrivateMessage;
import com.example.demo.repositories.PrivateMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateMessageService {

    @Autowired
    PrivateMessageRepo privateMessageRepo;

    @Autowired
    SocketService socketService;

    public List<PrivateMessage> findAllMessages(){
        return (List<PrivateMessage>) privateMessageRepo.findAll();
    }

    public PrivateMessage postMessage(PrivateMessage message){
        PrivateMessage dbMessage = null;

        try{
            dbMessage = privateMessageRepo.save(message);

            dbMessage.action = "new-private-message";
            // Första punkten
//            if (dbMessage.getImageUrl() != null) {
//
//            }
            socketService.sendToAll(dbMessage, PrivateMessage.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dbMessage;
    }

    public void deleteById(int id, int index){

        DeleteClass deleteClass = new DeleteClass();

        try {
            deleteClass.setIndex(index);
            deleteClass.setAction("delete-private-message");

            privateMessageRepo.deleteById(id);

            socketService.sendToAll(deleteClass, DeleteClass.class);
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
