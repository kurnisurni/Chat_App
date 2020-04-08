package com.example.demo.repositories;

import com.example.demo.entities.PrivateMessage;
import org.springframework.data.repository.CrudRepository;

public interface PrivateMessageRepo extends CrudRepository<PrivateMessage, Integer> {
}
