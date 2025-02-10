package com.gm.goal_m.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.gm.goal_m.dto.GenericDTOs.UserDTO;
import com.gm.goal_m.dto.UserDTOs.UserLoginRequest;
import com.gm.goal_m.dto.UserDTOs.UserRequestRegDTO;
import com.gm.goal_m.model.User;
import com.gm.goal_m.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
  
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRequestRegDTO userRequestRegDTO) {
        String hashedPassword = passwordEncoder.encode(userRequestRegDTO.getPassword());
        User user = new User(userRequestRegDTO.getEmail(), hashedPassword, 
        userRequestRegDTO.getFirstName(), userRequestRegDTO.getLastName());
        return userRepository.save(user);
    }

    public User findUserById(Long id) {
        Optional<User> userContainer = userRepository.findById(id);
        if (userContainer.isPresent()) {
            return userContainer.get();
        } else {
            return null;
        }
    }

    public User findUserByEmail(String str) {
        Optional<User> optUser = userRepository.findByEmail(str);
        if(optUser.isPresent()){
            return optUser.get();
        } else {
            return null;
        }
    }

    public boolean canLogIn(UserLoginRequest userLoginRequest) { 
        Optional<User> optUser = userRepository.findByEmail(userLoginRequest.getEmail());      
        if(optUser.isPresent()){
            User myUser = optUser.get();
            if(passwordEncoder.matches(userLoginRequest.getPassword(), myUser.getPassword())){
                return true;
            }
        }
        return false;
    }
   
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserDTO> getAllUsersDTO(){
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : getAllUsers()) {
            UserDTO userDTO = new UserDTO(user);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    public void updateUser(User user) {
         userRepository.save(user);
    }

}
