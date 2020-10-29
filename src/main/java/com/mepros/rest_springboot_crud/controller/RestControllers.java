package com.mepros.rest_springboot_crud.controller;

import com.mepros.rest_springboot_crud.models.User;
import com.mepros.rest_springboot_crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/rest/admin")
public class RestControllers {

    @Autowired
    UserService userService;

    @PostMapping(value = "/")
    public ResponseEntity<User> create(@RequestBody User user){
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<User>> getAll(){
        List<User> users = userService.getAllUsers();
        return users != null && !users.isEmpty() ? new ResponseEntity<>(users, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable(name= "id") long id){
        User user = userService.getUserById(id);
        return user != null ? new ResponseEntity<>(user,HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable(name = "id") long id){
        userService.removeUserById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
