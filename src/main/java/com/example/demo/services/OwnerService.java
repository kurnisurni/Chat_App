package com.example.demo.services;


import com.example.demo.entities.Owner;
import com.example.demo.entities.Pet;
import com.example.demo.repositories.OwnerRepo;
import com.example.demo.repositories.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerService {

    @Autowired
    OwnerRepo ownerRepo;
    @Autowired
    PetRepo petRepo;

    public List<Owner> findAllOwner() {
        return (List<Owner>) ownerRepo.findAll();
    }

    public Owner findOneOwner (int id) {
        Owner owner = ownerRepo.findById(id);
        if (owner == null) return null;

        List<Pet> pets = petRepo.findAllByOwner(id);
        owner.setPets(pets);

        return owner;
    }
}
