package com.example.demo.repositories;

import com.example.demo.entities.Channel;
import com.example.demo.entities.UserChannel;
import com.example.demo.services.UserChannelsId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserChannelRepo extends CrudRepository<UserChannel, UserChannelsId> {
    public List<UserChannel> findAllByUserId(int userId);
}
