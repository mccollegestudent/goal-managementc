package com.gm.goal_m.dto.GenericDTOs;
import java.util.List;
import java.util.stream.Collectors;

import com.gm.goal_m.model.User;

import lombok.Data;

@Data
public class UserDTO{

    private Long userId;

    private String email;

    private String password;

    private String firstName;

    private String lastName;
    
    private List<GoalDTO> goals;

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.goals = user.getGoals().stream()
                         .map(GoalDTO::new)
                         .collect(Collectors.toList());
    }


}