package com.example.demo.controllers;


import com.example.demo.entities.Pet;
import com.example.demo.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PetController {

    @Autowired
    PetService petService;

    @GetMapping("/rest/pets")
    public List<Pet> getAllPets() {
        return petService.findAllPets();
    }

    @GetMapping("/rest/pets/{id}")
    public Optional<Pet> getOnePet(@PathVariable int id) {
        return petService.findOnePet(id);
    }

    @GetMapping("/rest/pets/specie/{specie}")
    public List<Pet> getPetBySpecie(@PathVariable String specie) {
        return petService.findBySpecie(specie);
    }

    @PostMapping("/rest/pets")                           // Här lägger du till en användare i databasen
    public Pet createNewPet(@RequestBody Pet pet) {      // Omvandlar ett JSON objekt till ett Java objekt
        return petService.createNewPet(pet);
    }
}
