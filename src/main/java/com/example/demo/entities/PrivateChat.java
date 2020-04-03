package com.example.demo.entities;

import javax.persistence.*;

@Entity
@Table(name="private_chats")
public class PrivateChat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int user1;
    private int user2;
    private int createdtime;

    @Transient
    public String action;

    public PrivateChat (){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser1() {
        return user1;
    }

    public void setUser1(int user1) {
        this.user1 = user1;
    }

    public int getUser2() {
        return user2;
    }

    public void setUser2(int user2) {
        this.user2 = user2;
    }

    public int getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(int createdtime) {
        this.createdtime = createdtime;
    }
}
