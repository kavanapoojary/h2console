package com.example.contact.Service;

import com.example.contact.Model.Person;
import com.example.contact.Repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    // Get all persons
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    // Get a person by id
    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }

    // Add a new person
    public Person addPerson(Person person) {
        return personRepository.save(person);
    }

    // Update an existing person
    public Optional<Person> updatePerson(Long id, Person personDetails) {
        return personRepository.findById(id).map(person -> {
            person.setName(personDetails.getName());
            person.setPhoneNumber(personDetails.getPhoneNumber());
            return personRepository.save(person);
        });
    }

    // Delete a person
    public boolean deletePerson(Long id) {
        if (personRepository.existsById(id)) {
            personRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
