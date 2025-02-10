package com.gm.goal_m.dto.TaskDTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GetTaskIdDTO {

    @NotNull(message = "Missing task id")
    @Min(1)
    private Long TaskId;
    
}


