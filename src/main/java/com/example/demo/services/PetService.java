package com.example.demo.services;

import com.example.demo.entities.Pet;
import com.example.demo.repositories.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    PetRepo petRepo;

    public List<Pet> findAllPets() {
        return (List<Pet>) petRepo.findAll();
    }

    public Optional<Pet> findOnePet (int id) {
        return petRepo.findById(id);
    }

    public List<Pet> findBySpecie (String specie) {
        return petRepo.findBySpeciesIgnoreCase(specie);
    }

    public Pet createNewPet (Pet newPet) {
        return petRepo.save(newPet);
    }
}
