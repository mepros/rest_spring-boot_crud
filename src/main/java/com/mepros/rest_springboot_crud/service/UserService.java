package com.mepros.rest_springboot_crud.service;

import com.mepros.rest_springboot_crud.models.Role;
import com.mepros.rest_springboot_crud.models.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    void addUser(User user);

    void updateUser(User user);

    void removeUserById(long id);

    User getUserById(long id);

    List<User> getAllUsers();

    User getUserByName(String name);

    User getUserByEmail(String email);
}
