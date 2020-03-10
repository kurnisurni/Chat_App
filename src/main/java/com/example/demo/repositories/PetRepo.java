package com.example.demo.repositories;

import com.example.demo.entities.Pet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepo extends CrudRepository<Pet, Integer> {

    public List<Pet> findBySpeciesIgnoreCase (String specie);   // SELECT * FROM pets WHERE species = specie
    public List<Pet> findAllByOwner (int ownerId);       // SELECT * FROM pets WHERE owner = id
}
