package com.gm.goal_m.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gm.goal_m.dto.GoalDTOs.AddGoalDTO;
import com.gm.goal_m.dto.GoalDTOs.UpdateGoalDTO;
import com.gm.goal_m.model.Goal;
import com.gm.goal_m.model.User;
import com.gm.goal_m.repository.GoalRepository;


@Service
public class GoalService {

    private  GoalRepository goalRepository;
    private MailSenderService mailService;

   
    public GoalService (GoalRepository goalRepository, UserService userService, MailSenderService mailService){
        this.goalRepository = goalRepository;
        this.mailService = mailService;
    }
        
    public Goal createGoal(AddGoalDTO addGoalDTO) {
        Goal goal = new Goal();
        goal.setObjective(addGoalDTO.getObjective());
        goal.setDescription(addGoalDTO.getDescription());
        goal.setStartDate(addGoalDTO.getStartDay());
        goal.setEndDate(addGoalDTO.getEndDay());

        return goalRepository.save(goal);
    }  

    public Goal updateGoalEndDate(Long id, LocalDate newEndDate){
        Goal goal = getGoalById(id);
        if(goal != null){
            goal.setEndDate(newEndDate);
            goalRepository.save(goal);
            return goal;
        } else {
            return null;
        }
    }

    public Goal getGoalById(Long id){
        if(goalRepository.findById((long) id).isPresent()){
            return goalRepository.findById((long) id).get();
        } else {
            return null;
        }
    }

    public List<Goal> getAllTasks() {
        return goalRepository.findAll();
    }

    public void newGoalNotification(User user, Goal goal){
        StringBuilder body = new StringBuilder();
        body.append("Hello " + user.getFirstName()).append("\n");
        body.append("Congrats on your first step in self improvement: " + goal.getObjective()).append("\n");
        body.append("Duration" + goal.getStartDate().toString() + " - " + goal.getEndDate().toString()).append("\n");
        body.append(goal.getDescription()).append("\n");
        mailService.sendNewMail(user.getEmail(), "New Goal Adventure!!!", body.toString());
    }
    public Goal addGoalByUser(User user, AddGoalDTO addGoalDTO) {

        Goal goal = new Goal();
        goal.setObjective(addGoalDTO.getObjective());
        goal.setDescription(addGoalDTO.getDescription());
        goal.setStartDate(addGoalDTO.getStartDay());
        goal.setEndDate(addGoalDTO.getEndDay());
        goal.setUser(user);

        newGoalNotification(user, goal);

        user.getGoals().add(goal);

        return goalRepository.save(goal);
    }

    public Goal updateGoalByUser(User user, UpdateGoalDTO dto) {

        Goal goal = getGoalById(dto.getId());
        
        if (dto.getObjective() != null && !dto.getObjective().isBlank()) {
            goal.setObjective(dto.getObjective());
        }
        if (dto.getDescription() != null && !dto.getDescription().isBlank()) {
            goal.setDescription(dto.getDescription());
        }
        if (dto.getType() != null && !dto.getType().isBlank()) {
            goal.setType(dto.getType());
        }
        if (dto.getStatus() != null) {
            goal.setStatus(dto.getStatus());
        }
        if (dto.getStartDay() != null) {
            goal.setStartDate(dto.getStartDay());
        }
        if (dto.getEndDay() != null) {
            goal.setEndDate(dto.getEndDay());
        }

        return goalRepository.save(goal);
    }

    public List<Goal> getGoalsByUser(User user) {
        return goalRepository.findByUser(user);
    }

    public void deleteGoalById(Long goalId) {
        goalRepository.deleteById(goalId);
    }

    public void update(Goal goal) {
        goalRepository.save(goal);
    }

    public Goal persist(Goal goal) {
        return goalRepository.save(goal);
    }

}
