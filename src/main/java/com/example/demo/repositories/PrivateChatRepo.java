package com.example.demo.repositories;

import com.example.demo.entities.PrivateChat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateChatRepo extends CrudRepository<PrivateChat, Integer> {


}
