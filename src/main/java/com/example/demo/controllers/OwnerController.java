package com.example.demo.controllers;


import com.example.demo.entities.Owner;
import com.example.demo.services.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest")            // Går så att rest alltid finns med
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    @GetMapping("/owners")
    public List<Owner> getAllOwner() {
        return ownerService.findAllOwner();
    }

    @GetMapping("/owners/{id}")
    public Owner getOneOwner (@PathVariable int id) {
        return ownerService.findOneOwner(id);
    }
}
