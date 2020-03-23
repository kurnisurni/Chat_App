package com.example.demo.repositories;

import com.example.demo.entities.FriendList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendListRepo extends CrudRepository<FriendList, Integer> {

    @Query(value = "SELECT friends_list.*, username " +
            "FROM friends_list, users " +
            "WHERE user1 = ?1 " +
            "AND user2 = users.id", nativeQuery = true)
    List<FriendList> findAllByUser1(int user1Id);

    @Query(value = "delete friends_list.* " +
            "FROM friends_list, users " +
            "WHERE user1 = ?1 " +
            "AND user2 = users.id", nativeQuery = true)
    public FriendList deleteOneByUser1(int user1Id);
}
