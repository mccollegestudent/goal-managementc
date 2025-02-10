package com.gm.goal_m.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.gm.goal_m.dto.GenericDTOs.GetIdDTO;
import com.gm.goal_m.dto.TaskDTOs.UpdateTaskDTO;
import com.gm.goal_m.dto.TimeFrameDTOs.AddTimeFrameByTaskIdDTO;
import com.gm.goal_m.dto.TimeFrameDTOs.UpdateTimeFrameDTO;
import com.gm.goal_m.model.Task;
import com.gm.goal_m.model.TimeFrame;
import com.gm.goal_m.service.TaskService;
import com.gm.goal_m.service.TimeFrameService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user/goal/task")
public class TimeFrameController {

    private TimeFrameService timeFrameService;
    private TaskService taskService;

    public TimeFrameController(TimeFrameService timeFrameService, TaskService taskService) {
        this.timeFrameService = timeFrameService;
        this.taskService = taskService;
    }

    @PostMapping("timeframe")
    public ResponseEntity<?> addTimeFrameByTaskId(@Valid @RequestBody AddTimeFrameByTaskIdDTO addTimeFrameByTaskIdDTO) {        

        Task task = taskService.getTaskById(addTimeFrameByTaskIdDTO.getTaskId());

        timeFrameService.addTimeFrameRangeToTask(task, addTimeFrameByTaskIdDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body("Successfull");

    }

    @PatchMapping("/timeframe")
    public ResponseEntity<?> updateTimeFrameById(@Valid @RequestBody UpdateTimeFrameDTO updateTimeFrameDTO,
            HttpServletRequest request) {
        try {

            TimeFrame retBody = timeFrameService.updateTimeFrame(updateTimeFrameDTO);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(retBody);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update timeframe" + e.getMessage());
        }
    }

    @PatchMapping("/timeframe/status")
    public ResponseEntity<?> updateTimeFrameStatusById(@Valid @RequestBody GetIdDTO id,
            HttpServletRequest request) {
        try {

            TimeFrame retBody = timeFrameService.updateTimeFrameStatus(id.getId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(retBody);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update timeframe" + e.getMessage());
        }
    }

    @DeleteMapping("/timeframe")
    public ResponseEntity<?> deleteTaskById(@Valid @RequestBody GetIdDTO id) {

        try {
            timeFrameService.deleteTimeFrameById(id.getId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted timeframe Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to Delete Timeframe" + e.getMessage());
        }

    }

    @GetMapping("/timeframe/{timeFrameId}")
    public ResponseEntity<?> getTimeFrameById(@PathVariable Long timeFrameId, HttpServletRequest request) {
        try {

            TimeFrame retValue = timeFrameService.getTimeFrameById(timeFrameId);
            return ResponseEntity.status(HttpStatus.FOUND).body(retValue);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to timeframe " + e.getMessage());
        }

    }

}
