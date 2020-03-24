package com.example.demo.repositories;


import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends CrudRepository<User, Integer> {
    User findById(int id);

    @Query("SELECT u FROM User u where u.username = ?1 AND u.password = ?2")
    User checkPassword(String username, String password);
}
