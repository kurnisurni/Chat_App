package com.example.demo.entities;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id     // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // Autoincrement
    private int id;

    private String username;
    private String password;

    private String picture_url;

    public User() {
    }

    public String getPicture() {
        return picture_url;
    }

    public void setPicture(String picture) {
        this.picture_url = picture;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
