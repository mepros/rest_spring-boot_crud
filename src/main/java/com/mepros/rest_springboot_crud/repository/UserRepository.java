package com.mepros.rest_springboot_crud.repository;

import com.mepros.rest_springboot_crud.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM USERS WHERE name = ?1", nativeQuery = true)
    User findUserByName(String name);

    @Query(value = "SELECT * FROM USERS WHERE email = ?1", nativeQuery = true)
    User findUserByEmail(String email);
}
