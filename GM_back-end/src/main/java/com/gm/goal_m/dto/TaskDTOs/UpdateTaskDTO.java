package com.gm.goal_m.dto.TaskDTOs;

import java.util.ArrayList;

import com.gm.goal_m.Util.Enums.Task.TaskType;
import com.gm.goal_m.dto.TimeFrameDTOs.UpdateTimeFrameDTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateTaskDTO {

    @Min(1)
    private Long id;

    @NotBlank(message = "Missing name")
    private String name;

    @NotBlank(message = "Missing description")
    private String description;

    private Boolean status;

    private TaskType type = TaskType.GOAL;
}
