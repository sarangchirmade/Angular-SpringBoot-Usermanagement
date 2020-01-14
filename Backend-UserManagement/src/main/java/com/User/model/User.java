package com.User.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "apps_user")
@Data
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int user_id;

    @Column(name = "fname")
    private String firstName;

    @Column(name = "lname")
    private String lastName;

    @Column(name = "userpassword")
    private String userPassword;

    private String email;

    private long phone;


    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

}
