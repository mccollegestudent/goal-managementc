package com.gm.goal_m.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gm.goal_m.dto.TaskDTOs.AddTaskByGoalIdDTO;
import com.gm.goal_m.dto.TaskDTOs.UpdateTaskDTO;
import com.gm.goal_m.model.Goal;
import com.gm.goal_m.model.Task;
import com.gm.goal_m.repository.TaskRepository;

@Service
public class TaskService {
  
    private TaskRepository taskRepository;
    private GoalService goalService;

    @Autowired
    public TaskService(TaskRepository taskRepository, GoalService goalService){
        this.taskRepository = taskRepository;
        this.goalService = goalService;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task persist (Task task) {
        return taskRepository.save(task);
    }

    public Task AddTaskByGoalId (AddTaskByGoalIdDTO addTaskDTO) {
            
            Goal goal = goalService.getGoalById(addTaskDTO.getGoalId());  

            Task task = new Task();
            task.setName(addTaskDTO.getName());
            task.setDescription(addTaskDTO.getDescription());
            //task.setType(addTaskDTO.getType());
            task.setGoal(goal);

            goal.getTasks().add(task);
  
        return taskRepository.save(task);
    }

    public List<Goal> getTasksByGoal(Goal goal) {
        return taskRepository.findByGoal(goal);
    }

    public void update(Task task) {
        taskRepository.save(task);
    }

    public void deleteAllTasks() {
        taskRepository.deleteAll();
    }

    public Task getTaskById(Long id) {

        Optional <Task> taskOpt = taskRepository.findById(id);
        
        if(!taskOpt.isPresent()){
            throw new UnsupportedOperationException("Timeframe NotFound");
        }
        return  taskOpt.get();
    }

    public Task updateTask(UpdateTaskDTO updateTask) {

        Task task = getTaskById(updateTask.getId());
        
        if (updateTask.getName() != null && !updateTask.getName().isEmpty()) {
            task.setName(updateTask.getName());
        }        
        if (updateTask.getDescription() != null && !updateTask.getDescription().isEmpty()) {
            task.setDescription(updateTask.getDescription());
        }        
        if (updateTask.getType() != null) {
            task.setType(updateTask.getType());
        }        
        if (updateTask.getStatus() != null ) {
            task.setStatus(updateTask.getStatus());
        }

        return taskRepository.save(task);
    }

    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }

}
