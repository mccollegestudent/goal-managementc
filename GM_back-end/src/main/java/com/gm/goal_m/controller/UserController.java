package com.gm.goal_m.controller;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.gm.goal_m.dto.UserDTOs.UserLoginRequest;
import com.gm.goal_m.dto.UserDTOs.UserRequestRegDTO;
import com.gm.goal_m.dto.UserDTOs.UserResponse;
import com.gm.goal_m.model.User;
import com.gm.goal_m.repository.UserRepository;
import com.gm.goal_m.service.JwtService;
import com.gm.goal_m.service.UserService;

import io.jsonwebtoken.security.InvalidKeyException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, UserRepository userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRequestRegDTO userRequestRegDTO) {
        try {
            if (userRepository.findByEmail(userRequestRegDTO.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }
            userService.registerUser(userRequestRegDTO);
            return ResponseEntity.ok().body("User succesfully registered");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("User not registered at this time");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> userLogin(@Valid @RequestBody UserLoginRequest userLoginRequest) throws InvalidKeyException, NoSuchAlgorithmException {
        String theToken = "";
        User user = new User(userLoginRequest.getEmail(), userLoginRequest.getPassword());
        if (userService.canLogIn(userLoginRequest)) {
            user = userRepository.findByEmail(userLoginRequest.getEmail()).get();
            theToken = jwtService.generateToken(user);
            Map<String, String> responseWithToken = new HashMap<>();
            responseWithToken.put("token", theToken);
            return ResponseEntity.ok().body(responseWithToken);
        } else if (userService.findUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(401).body("The password is incorrect");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping("/allusers")
    public ResponseEntity<List<User>> findAllUsers() {        
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/me")
    public UserResponse getLoggedUserDetails(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return new UserResponse(userService.findUserByEmail(email));

    }
}
