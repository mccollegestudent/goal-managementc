package com.gm.goal_m.dto.UserDTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserLoginRequest {

    @NotBlank(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" , message = "The email must have a correct format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 30)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[^\\s]*$", message = "The password must include at least one uppercase letter, one lowercase letter and one digit. Not spaces allowed.")
    private String password;
}