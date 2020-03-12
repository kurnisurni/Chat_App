package com.example.demo.repositories;


import com.example.demo.entities.FriendList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendListRepo extends CrudRepository<FriendList, Integer> {

}
