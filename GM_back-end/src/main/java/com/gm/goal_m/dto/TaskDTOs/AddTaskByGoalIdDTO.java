package com.gm.goal_m.dto.TaskDTOs;

import com.gm.goal_m.Util.Enums.Task.TaskType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddTaskByGoalIdDTO {

    @NotNull(message = "Missing goal id")
    @Min(1)
    private Long goalId;

    @NotBlank(message = "Missing name")
    private String name;

    @NotBlank(message = "Missing description")
    private String description;

    private TaskType type = TaskType.GOAL;

}
