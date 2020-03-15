package com.example.demo.services;

import java.io.Serializable;
// A class for getting ID for in-between table (users_channels in database.)
//Had to use composite PK to get the id
public class UserChannelsId implements Serializable {

    private int channelId;
    private int userId;

    public UserChannelsId() {}
}
