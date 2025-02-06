package com.gm.goal_m.dto.UserDTOs;

import com.gm.goal_m.model.User;

import lombok.Data;

@Data
public class UserResponse {
    private long userId;
    private String email;
    private String firstName;
    private String lastName;

    public UserResponse(User user){
        userId = user.getUserId();
        email = user.getEmail();
        firstName = user.getFirstName();
        lastName = user.getLastName();
    }
}
