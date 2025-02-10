package com.gm.goal_m.dto.GoalDTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GoalIdDTO {
    @NotNull(message = "Missing goal id")
    @Min(1)
    private Long goalId;
    
}
