package com.example.demo.entities;

import com.example.demo.services.UserChannelsId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "users_channels")
@IdClass(UserChannelsId.class)
public class UserChannel implements Serializable {

    @Id
    private int channelId;
    @Id
    private int userId;

    public UserChannel() {
    }

    public int getChannelId() {
        return channelId;
    }

    public void setChannelId(int channelId) {
        this.channelId = channelId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
