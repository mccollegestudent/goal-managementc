package com.gm.goal_m.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "timeFrame")
public class TimeFrame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean status = false;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    
    @JsonProperty("taskId")
    public Long getTaskId() {
        return task != null ? task.getId() : null;
    }

    public boolean getStatus(){
        return this.status;
    }

}
