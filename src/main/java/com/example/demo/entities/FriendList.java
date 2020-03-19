package com.example.demo.entities;


import javax.persistence.*;

@Entity
@Table(name="friends_list")
public class FriendList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int user1;
    private int user2;
    private String time;
    //Not sure if i'm allowed to add username here, since this db table doesn't have it
    //username is from Users table. I needed it to join two tables in friendListRepo.
    //Could have looped users in frontend, but then I could't get time column from this table.
    private String username;

    public FriendList() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
