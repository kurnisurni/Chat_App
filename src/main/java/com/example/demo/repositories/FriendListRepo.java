package com.example.demo.repositories;


import com.example.demo.entities.FriendList;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendListRepo extends CrudRepository<FriendList, Integer> {

    //@Query("SELECT * FROM users u ")
    List<FriendList> findAllByUser1(int user1Id);
}
