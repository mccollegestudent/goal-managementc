package com.gm.goal_m.dto.GoalDTOs;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddGoalDTO {

    @NotBlank(message = "Missing objective")
    private String objective;

    @NotBlank(message = "Missing description")
    private String description;

    @NotNull(message = "Missing start date")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate startDay;

    @NotNull(message = "Missing end date")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate endDay;   
}
