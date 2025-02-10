package com.gm.goal_m.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gm.goal_m.dto.GenericDTOs.GetIdDTO;
import com.gm.goal_m.dto.GoalDTOs.AddGoalDTO;
import com.gm.goal_m.dto.GoalDTOs.UpdateGoalDTO;
import com.gm.goal_m.model.Goal;
import com.gm.goal_m.model.Task;
import com.gm.goal_m.model.User;
import com.gm.goal_m.service.GoalService;
import com.gm.goal_m.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class GoalController {

    private GoalService goalService;
    private UserService userService;

     @Autowired
    public GoalController (GoalService goalService, UserService userService){
        this.goalService = goalService;
        this.userService = userService;
    }

    @PostMapping("/goal")
    public ResponseEntity<?> addGoalByUser(@Valid @RequestBody AddGoalDTO addGoalDTO, HttpServletRequest request) {
        try{

            String email = (String)request.getAttribute("email");
            User user = userService.findUserByEmail(email);

            Goal retBody  = goalService.addGoalByUser(user, addGoalDTO);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(retBody);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create Goal: " + e.getMessage());
        }     
    }

    @PatchMapping("/goal")
    public ResponseEntity<?> updateGoalByUser(@Valid @RequestBody UpdateGoalDTO updateGoalDTO, HttpServletRequest request) {
        try{

           
            String email = (String)request.getAttribute("email");
            User user = userService.findUserByEmail(email);
            
            Goal retBody  = goalService.updateGoalByUser(user, updateGoalDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body(retBody);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update goal" + e.getMessage());
        }     
    }

    @DeleteMapping("/goal")
    public ResponseEntity<?> deleteGoalById(@Valid @RequestBody GetIdDTO goaIdDTO){

        try{
            goalService.deleteGoalById(goaIdDTO.getId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted goal Successfull");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Delete Goal " + e.getMessage());
        }
        
    }

    @GetMapping("/goals")
    public ResponseEntity<?> getAllUserGoals(HttpServletRequest request) {
        try{
            
            String email = (String)request.getAttribute("email");

            User user = userService.findUserByEmail(email);

            List <Goal> retValue = goalService.getGoalsByUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(retValue);


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all goals: " + e.getMessage());
        }
     
    }

    @GetMapping("/goal/{goalId}")
    public ResponseEntity<?> getGoalById(@PathVariable Long goalId, HttpServletRequest request) {
        try{
            
            Goal retValue = goalService.getGoalById(goalId);
            return ResponseEntity.status(HttpStatus.OK).body(retValue);


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get goal: " + e.getMessage());
        }
     
    }

    
}
