package com.example.demo.entities;

import javax.persistence.*;

@Entity
@Table(name="private_messages")
public class PrivateMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int user_id;
    private String content;
    private int private_chat_id;
    private long message_time;
    private String image_url;

    @Transient
    public String action;

    public PrivateMessage(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getPrivate_chat_id() {
        return private_chat_id;
    }

    public void setPrivate_chat_id(int private_chat_id) {
        this.private_chat_id = private_chat_id;
    }

    public long getMessage_time() {
        return message_time;
    }

    public void setMessage_time(long message_time) {
        this.message_time = message_time;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
