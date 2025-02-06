package com.gm.goal_m.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gm.goal_m.Util.Enums.Task.TaskStatus;
import com.gm.goal_m.Util.Enums.Task.TaskType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private TaskType type;
    
    // private TaskStatus status = TaskStatus.PENDING;
    private boolean status = false;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List <TimeFrame> timeFrames = new ArrayList<> ();

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;

    @JsonProperty("goalId")
    public Long getTaskId() {
        return goal != null ? goal.getId() : null;
    }

      
    
}


