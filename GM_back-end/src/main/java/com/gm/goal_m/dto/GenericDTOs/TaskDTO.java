package com.gm.goal_m.dto.GenericDTOs;

import java.util.List;
import java.util.stream.Collectors;

import com.gm.goal_m.Util.Enums.Task.TaskType;
import com.gm.goal_m.model.Task;

import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private TaskType type;
    private boolean status = false;
    private List<TimeFrameDTO> timeFrames;

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.description = task.getDescription();
        this.type = task.getType();
        this.status = task.isStatus();
        this.timeFrames = task.getTimeFrames().stream()
                         .map(TimeFrameDTO::new)
                         .collect(Collectors.toList());

    }

}
