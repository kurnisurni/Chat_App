package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "owners")

public class Owner {

    @Id     // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // Autoincrement
    private int id;
    private String name;

    @Transient      // Gör så man ignorerar detta i databasen
    private List<Pet> pets;

    public Owner() {
    }

    public List<Pet> getPets() {
        return pets;
    }

    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
