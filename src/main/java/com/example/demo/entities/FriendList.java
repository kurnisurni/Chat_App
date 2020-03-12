package com.example.demo.entities;


import javax.persistence.*;

@Entity
@Table(name="friendList")

public class FriendList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public FriendList() {
    }


}
