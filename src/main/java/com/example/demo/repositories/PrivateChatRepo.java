package com.example.demo.repositories;

import com.example.demo.entities.PrivateChat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrivateChatRepo extends CrudRepository<PrivateChat, Integer> {

    List<PrivateChat> findAllById(int id);

    List<PrivateChat> findAllByUser1(int id);
    List<PrivateChat> findAllByUser2(int id);
}
