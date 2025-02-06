package com.gm.goal_m.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    private String password;

    private String firstName;

    private String lastName;
    
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Goal> goals = new ArrayList<>();

    
    public User() {

    } 

    public User(Long userId){
        this.userId = userId;
    }

    public User(String email, String password) {
        this.email = email.toLowerCase();
        this.password = password;
    }
    public User(String email, long user_id) {
        this.email = email.toLowerCase();
        this.userId = user_id;
    }

    public User(String email, String firstName, String lastName){
        this.email = email.toLowerCase();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(String email, String password, String firstName, String lastName) {
        this.email = email.toLowerCase();
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
