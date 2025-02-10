package com.gm.goal_m.dto.GenericDTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GetIdDTO {
    @NotNull(message = "Missing id")
    @Min(1)
    private Long id;    
}
