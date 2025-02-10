package com.gm.goal_m.service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gm.goal_m.dto.GenericDTOs.GoalDTO;
import com.gm.goal_m.dto.GenericDTOs.TaskDTO;
import com.gm.goal_m.dto.GenericDTOs.TimeFrameDTO;
import com.gm.goal_m.dto.GenericDTOs.UserDTO;


@Service
public class MailSchedulerService {

    UserService userService;
    TaskService taskService;
    TimeFrameService timeFrameService;
    MailSenderService mailSenderService;
    GoalService goalService;

    public MailSchedulerService(UserService userService, TaskService taskService,TimeFrameService timeFrameService, MailSenderService mailSenderService,  GoalService goalService){

        this.userService = userService;
        this.taskService = taskService;
        this.timeFrameService = timeFrameService;
        this.mailSenderService = mailSenderService;
        this.goalService = goalService;

    }


    public void sendEmails() {
        System.out.println("schedular is working/n/n");


        List<UserDTO> users = userService.getAllUsersDTO();

        // for (UserDTO user: users){

        //     System.out.println("user:" + user.getEmail());
        //     for(GoalDTO goal: user.getGoals()){
        //         System.out.println(">"+goal.getObjective());
        //     }

        // }
        

        for (UserDTO user: users){
            LocalTime now = LocalTime.now();

            // List<Goal> goals = user.getGoals();

            // for(Goal goal:goals){
            //     System.out.println(goal.getObjective());
            // }
            
            
            if(user.getGoals().isEmpty())  continue;

            for(GoalDTO goal : user.getGoals()){

                if(goal.getTasks().isEmpty())  continue;

                for(TaskDTO task : goal.getTasks()){     

                    if(task.getTimeFrames().isEmpty()) continue;
         

                    for(TimeFrameDTO timeFrame : task.getTimeFrames()){
    
                        Duration duration = Duration.between(now,timeFrame.getStartTime());
                        if (!duration.isNegative() && duration.toMinutes() <= 1) {

    
                            StringBuilder sb = new StringBuilder();
                            sb.append("Hi " + user.getFirstName()).append(",").append("\n");
                            sb.append("Goal: " + goal.getObjective()).append("\n");
                            sb.append("Task name: " + task.getName()).append("\n");
                            sb.append("Start time: " + timeFrame.getStartTime()).append("\n");
                            sb.append("End time: " + timeFrame.getEndTime()).append("\n");    
                            
                            mailSenderService.sendNewMail(user.getEmail(), task.getName(), sb.toString());
    
                            System.out.println("timeframe present");
                        }
                    }
    
                }


            }   
   

         }

    
   
    }

    
    
}
