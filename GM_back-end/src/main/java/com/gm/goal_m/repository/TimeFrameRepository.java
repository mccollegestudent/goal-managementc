package com.gm.goal_m.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gm.goal_m.model.Task;
import com.gm.goal_m.model.TimeFrame;

@Repository
public interface TimeFrameRepository extends JpaRepository <TimeFrame, Long>{

    List <TimeFrame> findByTask(Task task);

    List<TimeFrame> findByDateAndStartTimeAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);

    @Query("SELECT e FROM TimeFrame e WHERE (e.task.goal.user.userId = :userId AND e.startTime < :endTime AND e.endTime > :startTime AND e.date = :day)")
    List<TimeFrame> findOverlappingTimeFrames(@Param("userId") Long userId,@Param("day") LocalDate day, @Param("startTime") LocalTime startTime, @Param("endTime") LocalTime endTime);
    
}
