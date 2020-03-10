package com.example.demo.repositories;


import com.example.demo.entities.Owner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepo extends CrudRepository<Owner, Integer> {
    public Owner findById (int id);
}
