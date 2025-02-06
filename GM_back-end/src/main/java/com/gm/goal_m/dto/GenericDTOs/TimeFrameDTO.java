package com.gm.goal_m.dto.GenericDTOs;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.stream.Collectors;

import com.gm.goal_m.model.TimeFrame;

import lombok.Data;

@Data
public class TimeFrameDTO {
    private Long id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean status;
    
    public TimeFrameDTO(TimeFrame timeFrame) {
        this.id = timeFrame.getId();
        this.date = timeFrame.getDate();
        this.startTime = timeFrame.getStartTime();
        this.endTime = timeFrame.getEndTime();
        this.status = timeFrame.getStatus();
    }

    
}
