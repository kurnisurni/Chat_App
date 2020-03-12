package com.example.demo.repositories;

import com.example.demo.entities.Channel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelRepo extends CrudRepository <Channel, Integer> {

    public Channel findById (int id);
    public List<Channel> findAllByAdminId(int adminId);
    public Channel findByNameIgnoreCase(String name);

}
